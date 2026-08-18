import { createMarkdownParser, type ComarkParseFn } from 'comark'
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
          toc({ depth: 3, searchDepth: 3 }),
          headings(),
        ],
      })
    }
    const parsed = await parseMarkdown(file.body)

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
