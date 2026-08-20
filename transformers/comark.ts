import { createMarkdownParser, type ComarkParseFn, type Node } from 'comark'
import shiki from 'comark/plugins/shiki'
import math from './math'
import emoji from 'comark/plugins/emoji'
import toc from 'comark/plugins/toc'
import headings from 'comark/plugins/headings'
import materialThemeLighter from '@shikijs/themes/material-theme-lighter'
import materialThemePalenight from '@shikijs/themes/material-theme-palenight'
import python from '@shikijs/langs/python'
import r from '@shikijs/langs/r'
import javascript from '@shikijs/langs/javascript'
import bash from '@shikijs/langs/bash'
import { defineTransformer } from '@nuxt/content'

let parseMarkdown: ComarkParseFn | undefined

export default defineTransformer({
  name: 'markdown',
  extensions: ['.md'],
  parse: async (file) => {
    if (!parseMarkdown) {
      parseMarkdown = createMarkdownParser({
        plugins: [
          shiki({
            themes: {
              light: materialThemeLighter,
              dark: materialThemePalenight,
            },
            languages: [python, r, javascript, bash],
          }),
          math(),
          emoji(),
          toc({ depth: 4, searchDepth: 4 }),
          headings(),
        ],
      })
    }
    const parsed = await parseMarkdown(file.body)

    const headingMap = new Map<string, Node>()
    collectHeadings(parsed.nodes, headingMap)
    patchTocText(parsed.meta.toc?.links ?? [], headingMap)

    return {
      id: file.id,
      title: parsed.meta.title || parsed.frontmatter.title,
      description: parsed.meta.description || parsed.frontmatter.description,
      body: {
        type: 'minimark',
        value: parsed.nodes,
        toc: parsed.meta.toc,
      },
      meta: parsed.meta,
      ...parsed.frontmatter,
    }
  },
})

interface TocLinkLoose {
  id: string
  text: string
  depth: number
  children?: TocLinkLoose[]
}

function getTag(node: Node): string | null {
  return Array.isArray(node) && typeof node[0] === 'string' ? node[0] : null
}

function getProps(node: Node): Record<string, unknown> {
  return Array.isArray(node) && typeof node[0] === 'string' && typeof node[1] === 'object' && node[1] !== null && !Array.isArray(node[1])
    ? (node[1] as Record<string, unknown>)
    : {}
}

function getChildren(node: Node): Node[] {
  return Array.isArray(node) && typeof node[0] === 'string' ? (node.slice(2) as Node[]) : []
}

// Flatten a heading node to plain text, wrapping math nodes in $...$ so the
// TOC can re-render them with KaTeX later.
function flattenTextWithMath(node: Node): string {
  if (typeof node === 'string') return node
  if (getTag(node) === 'math') {
    return `$${getChildren(node).map(flattenTextWithMath).join('')}$`
  }
  return getChildren(node).map(flattenTextWithMath).join('')
}

function collectHeadings(nodes: Node[], map: Map<string, Node>) {
  for (const node of nodes) {
    if (typeof node === 'string') continue
    const tag = getTag(node)
    if (tag && /^h[2-5]$/.test(tag)) {
      const id = getProps(node).id as string | undefined
      if (id) map.set(id, node)
    }
    collectHeadings(getChildren(node), map)
  }
}

function patchTocText(links: TocLinkLoose[], map: Map<string, Node>) {
  for (const link of links) {
    const heading = map.get(link.id)
    if (heading) {
      link.text = flattenTextWithMath(heading)
    }
    if (link.children?.length) patchTocText(link.children, map)
  }
}
