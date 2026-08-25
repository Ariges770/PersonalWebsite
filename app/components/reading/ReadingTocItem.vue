<template>
  <li class="reading-toc-item">
    <a
      :href="`#${link.id}`"
      class="reading-toc-link"
      :class="{ active }"
      @click.prevent="scrollTo(link.id)"
    ><span v-html="label" /></a>
    <ul v-if="link.children?.length && expanded" class="reading-toc-children">
      <ReadingTocItem
        v-for="child in link.children"
        :key="child.id"
        :link="child"
        :active-id="activeId"
        :active="child.id === activeId"
        :expanded="true"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'

export interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  link: TocLink
  activeId: string
  active: boolean
  expanded: boolean
}>()

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

// The toc text keeps math wrapped in $...$ (added by the comark transformer),
// so split it apart and render the math segments with KaTeX.
const label = computed(() => {
  const parts = props.link.text.split(/(\$[^$]+\$)/g)
  return parts
    .map((part) => {
      if (part.length > 2 && part.startsWith('$') && part.endsWith('$')) {
        try {
          return katex.renderToString(part.slice(1, -1), { throwOnError: false })
        } catch {
          return escapeHtml(part)
        }
      }
      return escapeHtml(part)
    })
    .join('')
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
