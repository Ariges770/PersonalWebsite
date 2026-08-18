<template>
  <aside class="reading-toc">
    <p class="reading-toc-title">On this page</p>
    <ul class="reading-toc-list">
      <ReadingTocItem
        v-for="link in links"
        :key="link.id"
        :link="link"
        :active-id="activeId"
        :active="activeSectionId === link.id"
        :expanded="activeSectionId === link.id"
      />
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { TocLink } from './ReadingTocItem.vue'

const props = defineProps<{
  links: TocLink[]
}>()

const activeId = ref(props.links[0]?.id ?? '')
let ticking = false
let timer: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
let scrollParent: HTMLElement | Window | null = null

// The active section is the last heading whose top has passed this line
// (a quarter of the way down the viewport), like the Nuxt UI scrollspy.
const MARKER = 0.25

const contains = (link: TocLink, id: string): boolean =>
  link.id === id || !!link.children?.some((child) => contains(child, id))

const activeSectionId = computed(
  () => props.links.find((link) => contains(link, activeId.value))?.id ?? '',
)

function computeActive(headings: HTMLElement[]): string {
  if (!headings.length) return ''
  const marker = window.innerHeight * MARKER
  let current = headings[0].id
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= marker) current = heading.id
    else break
  }
  return current
}

function updateActive() {
  ticking = false
  const article = document.querySelector('.reading-article')
  if (!article) return
  const headings = Array.from(article.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id], h5[id]'))
  const current = computeActive(headings)
  if (current !== activeId.value) activeId.value = current
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateActive)
}

// Find the element that actually scrolls (may be a nested container on tablets).
function findScrollParent(node: HTMLElement | null): HTMLElement | Window {
  let el = node?.parentElement ?? null
  while (el) {
    const overflowY = getComputedStyle(el).overflowY
    if (/(auto|scroll|overlay)/.test(overflowY)) return el
    el = el.parentElement
  }
  return window
}

onMounted(() => {
  updateActive()

  const article = document.querySelector('.reading-article')

  // Primary: IntersectionObserver. Fires on layout/intersection changes, so it
  // keeps the highlight correct even when scroll events are missed (common with
  // touch/momentum scrolling on tablets).
  if (article) {
    const headings = Array.from(article.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id], h5[id]'))
    observer = new IntersectionObserver(
      () => updateActive(),
      { rootMargin: '-25% 0px -70% 0px' },
    )
    headings.forEach((heading) => observer!.observe(heading))
  }

  // Fallbacks: window, document (capture) and the real scroll container, plus
  // touch/wheel/scrollend/touchend so every input path triggers a recompute.
  scrollParent = findScrollParent(article as HTMLElement | null)
  scrollParent.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('scroll', onScroll, { passive: true, capture: true })
  window.addEventListener('touchmove', onScroll, { passive: true })
  window.addEventListener('wheel', onScroll, { passive: true })
  window.addEventListener('touchend', onScroll, { passive: true })
  window.addEventListener('scrollend', onScroll, { passive: true } as EventListenerOptions)
  window.addEventListener('resize', onScroll, { passive: true })
  document.addEventListener('visibilitychange', updateActive)

  // Final safety net: periodically recompute from live positions, so the
  // highlight can never get stuck even if every event above is missed.
  timer = setInterval(updateActive, 400)
})

onBeforeUnmount(() => {
  scrollParent?.removeEventListener('scroll', onScroll)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('touchmove', onScroll)
  window.removeEventListener('wheel', onScroll)
  window.removeEventListener('touchend', onScroll)
  window.removeEventListener('scrollend', onScroll)
  window.removeEventListener('resize', onScroll)
  document.removeEventListener('visibilitychange', updateActive)
  if (timer) clearInterval(timer)
  observer?.disconnect()
})
</script>
