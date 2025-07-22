<template>
  <article class="col-6 col-12-xsmall work-item">
  <a :href="item.url" class="image fit thumb">
    <img 
      :src="item.src" alt=""
    />
    <!-- <img src="~/assets/img/previews/water-tap.jpg" alt=""/> -->
  </a>
  <h3>{{ item.title }}</h3>
  <p>{{ item.desc }}</p>
  </article>
</template>

<script setup>

const props = defineProps({
item: {
    type: Object,
    required: true,
},
});


const defaultImage = "@/assets/img/img-01.jpg";
const filePath = '/img/img-01.jpg';
// item.image ? item.image.src : 
</script>
