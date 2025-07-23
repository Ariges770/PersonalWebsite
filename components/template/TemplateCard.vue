<template>
  <article class="col-6 col-12-xsmall work-item ds-card">
    <div class="ds-card-inner image fit">
        <div class="ds-card-front">
      <a :href="item.url" class="">
      </a>
          <img :src="item.src" alt="" />
        </div>
        <!-- <img src="~/assets/img/previews/water-tap.jpg" alt=""/> -->

        <div class="ds-card-back">
          <h3 class="">{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
    </div>
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
const filePath = "/img/img-01.jpg";
// item.image ? item.image.src :
</script>

<style>
/* Double sided card inspo from https://prismic.io/blog/css-hover-effects#6-doublesided-card */
.ds-card {
  width: 200px;
  height: 250px;
  margin: 1rem auto;
  perspective: 1000px;
  cursor: pointer;
}

.ds-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.ds-card:hover .ds-card-inner {
  transform: rotateY(180deg);
}

.ds-card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the entire container */
}

.ds-card-front,
.ds-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.ds-card-front {
  background: white;
  border: 1px solid #ffffffff;
}

.ds-card-back {
  background: grey;
  color: black;
  transform: rotateY(180deg);
}
</style>
