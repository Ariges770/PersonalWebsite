<template>
  <div>
    <ReadingArticle v-if="myrepo" :content="myrepo" />
    <div v-else>Document not found</div>
  </div>

</template>


<script setup lang="ts">


definePageMeta({
  key: (route) => route.path,
})

const route = useRoute();
const { data: myrepo } = await useAsyncData(
  `myrepo-${route.path}`,
  () => queryCollection('myrepo').path(route.path).first(),
)

// // Move styles from rendered markdown to head tag
// loadStyles(myrepo)


// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description
// })
</script>
