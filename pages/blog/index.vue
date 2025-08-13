<template>
    <h1>Temp</h1>
    <div>
    This is my blog
    </div>
    <!-- <ul>
        <li v-for="post in data" href="www.google.com">{{ post }}</li>
    </ul> -->
    <div class="row">
        <!-- <TemplateCard :item="item" /> -->
        <TemplateCard v-for="(item, index) in data" :item="item" />
      </div>
</template>


<script setup lang="ts">
// const myPosts = await queryCollectionNavigation('blog')
const route = useRoute()

const { data } = await useAsyncData('navigation', () => {
    return queryCollection('content')
    .order('date', 'DESC')
    .select('author', 'date', 'description', 'extension', 'id', 'meta', 'navigation', 'path', 'seo', 'stem', 'title')
    // .limit(5)
    .all()
})


// console.log(data)

</script>
