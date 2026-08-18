import katex from 'katex'
import { defineComarkPlugin } from 'comark/parse'
import type { MarkdownExit, RuleBlock, RuleInline, StateInline } from 'markdown-exit'

export interface MathConfig {
  /**
   * Throw on parse errors or return error message
   * @default false
   */
  throwOnError?: boolean
  /**
   * Additional katex options
   */
  options?: Record<string, unknown>
}

/**
 * Fork of comark's `math` plugin (`comark/plugins/math`) with
 * Obsidian-compatible inline math parsing.
 *
 * Differences from upstream (`mathInlineRule` only):
 * - No content-start digit guard: `$270 + 60 = 2187$` is math.
 * - A closer `$` followed by a digit is treated as currency, NOT math
 *   (e.g. `$x/$5` stays text). The rejected pair is consumed as plain
 *   text and scanning resumes AFTER the rejected closer — it is never
 *   reused as an opener (`$x/$5 and $y$` renders `y` as math).
 * - A closer `$` preceded by whitespace is NOT math (`$x $`).
 * - An opening `$` followed by whitespace is NOT math (`$ x$`).
 *
 * Display math (`$$...$$`) and block math rules are unchanged.
 *
 * Re-check against upstream on comark upgrades (see AGENTS.md).
 */

/**
 * Render LaTeX math expression to HTML using KaTeX
 *
 * @param code LaTeX math expression
 * @param displayMode Whether to render in display mode
 * @param config KaTeX configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * const html = renderMath('E = mc^2', false)
 * const display = renderMath('x^2', true)
 * ```
 */
export function renderMath(code: string, displayMode: boolean, config: MathConfig = {}): string {
  try {
    const options = {
      displayMode,
      throwOnError: config.throwOnError ?? false,
      ...config.options,
    }
    return katex.renderToString(code, options)
  } catch (error) {
    console.error('Math rendering error:', error)
    if (config.throwOnError) {
      throw error
    }
    return `<span class="math-error">${error instanceof Error ? error.message : 'Failed to render math'}</span>`
  }
}

/**
 * Check if code is valid LaTeX math syntax
 *
 * @param code LaTeX math expression
 * @returns true if valid, false otherwise
 *
 * @example
 * ```ts
 * validateMath('E = mc^2') // true
 * validateMath('\\invalid') // false
 * ```
 */
export function validateMath(code: string): boolean {
  try {
    katex.renderToString(code, { throwOnError: true })
    return true
  } catch {
    return false
  }
}

/**
 * markdown-it plugin for inline display math ($$...$$)
 * This handles $$...$$ within a paragraph (same line)
 */
const mathInlineDisplayRule: RuleInline = (state, silent) => {
  const start = state.pos
  const max = state.posMax
  // Check if we start with $$
  if (start + 1 >= max) return false
  if (state.src.charCodeAt(start) !== 0x24 /* $ */) return false
  if (state.src.charCodeAt(start + 1) !== 0x24 /* $ */) return false
  // Find closing $$
  let pos = start + 2
  while (pos + 1 < max) {
    // Stop at newline
    if (state.src.charCodeAt(pos) === 0x0a /* \n */) {
      return false
    }
    // Check for $$
    if (state.src.charCodeAt(pos) === 0x24 && state.src.charCodeAt(pos + 1) === 0x24) {
      // Found closing $$
      const content = state.src.slice(start + 2, pos)
      if (!silent) {
        const token = state.push('math_inline', 'math', 0)
        token.content = content
        token.markup = '$$'
        token.meta = { display: true } // Mark as display mode
      }
      state.pos = pos + 2
      return true
    }
    pos++
  }
  return false
}

/**
 * markdown-it plugin for inline math ($...$)
 *
 * Obsidian-compatible rules (see file header):
 * - closer followed by a digit (currency) => reject pair, burn as text,
 *   resume scanning after the rejected closer
 * - closer preceded by whitespace => reject pair, burn as text
 * - opener followed by whitespace => not math
 */
const mathInlineRule: RuleInline = (state, silent) => {
  const start = state.pos
  const max = state.posMax
  // Check if we start with $
  if (state.src.charCodeAt(start) !== 0x24 /* $ */) {
    return false
  }
  // Don't match $$ (that's display math)
  if (start + 1 < max && state.src.charCodeAt(start + 1) === 0x24) {
    return false
  }
  // Obsidian: opening $ followed by whitespace is not math
  if (/\s/.test(state.src[start + 1])) {
    return false
  }
  // Find closing $
  let pos = start + 1
  let foundClose = false
  while (pos < max) {
    const char = state.src.charCodeAt(pos)
    // Stop at newline - $ must close on same line
    if (char === 0x0a /* \n */) {
      return false
    }
    if (char === 0x24 /* $ */) {
      // Found potential closing $
      // Make sure it's not escaped, we have content (at least 1 char),
      // it's not preceded by another $ (which would make it $$),
      // and it's not followed by another $ (which would make it $$)
      const hasContent = pos > start + 1
      const notEscaped = pos === start + 1 || state.src.charCodeAt(pos - 1) !== 0x5c /* \ */
      const notPrecededByDollar = pos === start + 1 || state.src.charCodeAt(pos - 1) !== 0x24
      const notFollowedByDollar = pos + 1 >= max || state.src.charCodeAt(pos + 1) !== 0x24
      if (hasContent && notEscaped && notPrecededByDollar && notFollowedByDollar) {
        // Obsidian: closer followed by a digit is currency — reject the
        // pair and consume it as plain text. Scanning resumes AFTER the
        // rejected closer; it is never reused as an opener.
        if (/\d/.test(state.src[pos + 1])) {
          if (!silent) {
            const token = state.push('text', '', 0)
            token.content = state.src.slice(start, pos + 1)
          }
          state.pos = pos + 1
          return true
        }
        // Obsidian: closer preceded by whitespace is not math — same
        // reject-and-burn behavior.
        if (/\s/.test(state.src[pos - 1])) {
          if (!silent) {
            const token = state.push('text', '', 0)
            token.content = state.src.slice(start, pos + 1)
          }
          state.pos = pos + 1
          return true
        }
        foundClose = true
        break
      }
    }
    pos++
  }
  if (!foundClose) {
    return false
  }
  // Extract math content
  const content = state.src.slice(start + 1, pos)
  if (!silent) {
    const token = state.push('math_inline', 'math', 0)
    token.content = content
    token.markup = '$'
  }
  state.pos = pos + 1
  return true
}

/**
 * markdown-it plugin for display math ($$...$$)
 */
const mathBlockRule: RuleBlock = (state, startLine, endLine, silent) => {
  const start = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]
  // Check if line starts with $$
  if (start + 2 > max) return false
  if (state.src.charCodeAt(start) !== 0x24 /* $ */) return false
  if (state.src.charCodeAt(start + 1) !== 0x24 /* $ */) return false
  const marker = state.src.slice(start, start + 2)
  const pos = start + 2
  // Check if it's inline $$ (closing on same line)
  const firstLine = state.src.slice(pos, max)
  const closePos = firstLine.indexOf('$$')
  if (closePos !== -1) {
    // Inline display math on single line
    if (silent) return true
    const content = firstLine.slice(0, closePos)
    const token = state.push('math_block', 'div', 0)
    token.content = content
    token.markup = marker
    token.block = true
    token.map = [startLine, startLine + 1]
    state.line = startLine + 1
    return true
  }
  // Multi-line display math
  let nextLine = startLine
  let autoClose = false
  // Search for closing $$
  while (nextLine < endLine) {
    nextLine++
    if (nextLine >= endLine) break
    const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
    const lineMax = state.eMarks[nextLine]
    if (lineStart < lineMax && state.sCount[nextLine] < state.blkIndent) {
      // Non-empty line with less indent - might close the block
      break
    }
    const lineText = state.src.slice(lineStart, lineMax)
    if (lineText.trim() === '$$') {
      autoClose = true
      break
    }
    // Check if line contains $$
    if (lineText.includes('$$')) {
      autoClose = true
      break
    }
  }
  if (!autoClose) {
    return false
  }
  if (silent) return true
  // Extract content between $$ markers
  const contentLines = []
  for (let i = startLine + 1; i < nextLine; i++) {
    const lineStart = state.bMarks[i] + state.tShift[i]
    const lineMax = state.eMarks[i]
    contentLines.push(state.src.slice(lineStart, lineMax))
  }
  const content = contentLines.join('\n')
  const token = state.push('math_block', 'div', 0)
  token.content = content
  token.markup = marker
  token.block = true
  token.map = [startLine, nextLine + 1]
  state.line = nextLine + 1
  return true
}

/**
 * Create markdown-it plugin for math support
 */
function markdownItMath(md: MarkdownExit, _config: MathConfig = {}) {
  // Add inline display math rule ($$...$$) - must come before inline math ($...$)
  md.inline.ruler.before('escape', 'math_inline_display', (state: StateInline, silent: boolean) => mathInlineDisplayRule(state, silent))
  // Add inline math rule ($...$)
  md.inline.ruler.before('escape', 'math_inline', (state: StateInline, silent: boolean) => mathInlineRule(state, silent))
  // Add block math rule ($$...$$)
  md.block.ruler.before('fence', 'math_block', mathBlockRule, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
}

/**
 * Create math plugin for comark
 *
 * Parses math expressions with $ and $$ delimiters into `math` nodes.
 * Rendering is done by the `<Math>` component (KaTeX).
 *
 * @param config Math rendering configuration
 *
 * @example
 * ```ts
 * import { parseMarkdown } from 'comark'
 * import math from './math'
 *
 * const result = await parseMarkdown('Inline $x^2$ and display $$E = mc^2$$', {
 *   plugins: [math({ throwOnError: false })]
 * })
 * ```
 */
export default defineComarkPlugin((config: MathConfig = {}) => ({
  name: 'math',
  markdownItPlugins: [((md: MarkdownExit) => markdownItMath(md, config))],
}))
