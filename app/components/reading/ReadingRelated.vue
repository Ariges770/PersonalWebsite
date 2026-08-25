<template>
  <section class="reading-related">
    <p class="reading-related-title">More articles</p>
    <ul class="reading-related-list">
      <li v-for="item in items" :key="item.path" class="reading-related-item">
        <NuxtLink :to="item.path" class="reading-related-link">
          <span class="reading-related-name">{{ item.title }}</span>
          <span v-if="item.desc" class="reading-related-desc">{{ item.desc }}</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface RelatedItem {
  path: string
  title?: string
  desc?: string
}

defineProps<{
  items: RelatedItem[]
}>()
</script>
