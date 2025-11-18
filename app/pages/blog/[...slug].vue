<template>
  <div>
    <ContentRenderer v-if="content" :value="content" />
    <div v-else>Document not found</div>
  </div>

</template>


<script setup lang="ts">


const route = useRoute();
const { data: content } = await useAsyncData(() => queryCollection('content').path(route.path).first())

// Move styles from rendered markdown to head tag
loadStyles(content)


// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description
// })
</script>
