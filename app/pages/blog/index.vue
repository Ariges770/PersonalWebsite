<template>
  <div>
    <h1>
        This is my blog
    </h1>
    <!-- <ul>
        <li v-for="post in data" href="www.google.com">{{ post }}</li>
    </ul> -->
    <div class="row">
      <!-- <TemplateCard :item="item" /> -->
      <TemplateCard v-for="(item, index) in data" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData("navigation", () => {
  return (
    queryCollection("content")
      .order("date", "DESC")
      .where("path", "LIKE", "/blog%")
    //   .select(
    //     "author", "date", "description", "extension", "id", "meta", "navigation", "path", "seo", "stem", "title")
      .select( "author", "date", "title", "desc", "img", "path")
      // .limit(5)
      .all()
  );
});

</script>
