<script setup lang="ts">
import { computed } from 'vue'
import { Math } from '@comark/nuxt/plugins/math'

const props = defineProps({
  /**
   * Content to render
   */
  value: {
    type: Object,
    required: true,
  },
  /**
   * Render only the excerpt
   */
  excerpt: {
    type: Boolean,
    default: false,
  },
  /**
   * The map of custom components to use for rendering.
   */
  components: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Root tag to use for rendering
   */
  class: {
    type: [String, Object],
    default: undefined,
  },
  /**
   * Tags to unwrap separated by spaces
   * Example: 'ul li'
   */
  unwrap: {
    type: [Boolean, String],
    default: false,
  },
})

const body = computed(() => {
  let body = props.value.body || props.value
  if (props.excerpt && props.value.excerpt) {
    body = props.value.excerpt
  }
  return body
})

const document = computed(() => ({
  nodes: body.value?.value ?? [],
  frontmatter: {
    ...(props.value?.meta?.frontmatter || {}),
    ...props.data,
  },
  meta: body.value?.toc ? { toc: body.value.toc } : {},
}))

const isEmpty = computed(() => !document.value.nodes.length)
</script>

<template>
  <MarkdownDocument
    v-if="!isEmpty"
    :value="document"
    :components="{ math: Math, ...props.components }"
    :class="props.class"
    :unwrap="props.unwrap"
  />
  <slot
    v-else
    name="empty"
    :tree="document"
    :data="data"
  >
    <!-- nobody -->
  </slot>
</template>
