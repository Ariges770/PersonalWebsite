<template>
  <div class="reading-layout">
    <article class="reading-article">
      <header v-if="showHeader" class="article-header">
        <img v-if="imgSrc" :src="imgSrc" class="article-header-img" :alt="title || ''" />
        <p class="article-header-meta">
          <span v-if="author" class="article-header-author">{{ author }}</span>
          <span v-if="lastUpdated" class="article-header-date">Last updated {{ lastUpdated }}</span>
        </p>
      </header>
      <ContentRenderer :value="content" />
      <ReadingRelated v-if="suggestions.length" class="reading-related-after" :items="suggestions" />
    </article>
    <aside v-if="tocLinks.length || suggestions.length" class="reading-rail">
      <ReadingToc v-if="tocLinks.length" :links="tocLinks" />
      <ReadingRelated v-if="suggestions.length" class="reading-related-rail" :items="suggestions" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface ReadingContent {
  title?: string
  author?: string
  lastModified?: string | Date
  img?: string
  body?: {
    toc?: { links?: TocLink[] }
  }
}

const props = defineProps<{
  content: ReadingContent
}>()

const route = useRoute()

const tocLinks = computed(() => props.content?.body?.toc?.links ?? [])

const title = computed(() => props.content?.title ?? '')
const author = computed(() => props.content?.author ?? '')
const imgSrc = computed(() => (props.content?.img ? `/content/${props.content.img}` : ''))

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const lastUpdated = computed(() => {
  const raw = props.content?.lastModified
  if (!raw) return ''
  if (raw instanceof Date) {
    return `${raw.getUTCDate()} ${MONTHS[raw.getUTCMonth()]} ${raw.getUTCFullYear()}`
  }
  const m = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (m) {
    return `${Number(m[1])} ${MONTHS[Number(m[2]) - 1] ?? m[2]} ${m[3]}`
  }
  return String(raw)
})

const showHeader = computed(() => !!(title.value || author.value || lastUpdated.value || imgSrc.value))

// Suggested articles: prefer posts in the same folder, then fill with others.
const { data: relatedPosts } = await useAsyncData('reading-related', () => {
  const query = queryCollection('myrepo')
    .where('path', 'LIKE', '/blog%')
    .select('path', 'title', 'desc')
  if (import.meta.prod) {
    query.where('draft', '=', false)
  }
  return query.all()
})

const suggestions = computed(() => {
  const current = route.path
  const posts = relatedPosts.value ?? []
  const others = posts.filter((post) => post.path !== current)
  const parentDir = current.slice(0, current.lastIndexOf('/'))
  const sameFolder = others.filter((post) => post.path.startsWith(`${parentDir}/`))
  const rest = others.filter((post) => !sameFolder.includes(post))
  return [...sameFolder, ...rest].slice(0, 4)
})
</script>
