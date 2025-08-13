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
const myStyles = useState<Array<any>>('myStyles', () => []);

watch(content, (newContent) => {
  if (newContent?.body?.value) {
    newContent.body.value.filter(item => {
      return (item[0] === 'style' && item[2])
    }).forEach(item => {
      myStyles.value.push({textContent: item[2]});
    })

    newContent.body.value = newContent.body.value.filter(item => !(item[0] === 'style' && item[2]))
  }
}, { immediate: true });

onMounted(async () => {
  useHead({
    style: myStyles,
    // script: [
    //   {
    //     defer: true,
    //     src: "https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js",
    //   }
    // ]
  })
})


// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description
// })
</script>
