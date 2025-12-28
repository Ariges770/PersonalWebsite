<template>
  <article class="col-6 col-12-xsmall work-item ds-card">
    <a :href="item.path" class="ds-card-inner image fit">
      <div class="ds-card-front">
        <h3 class="ds-card-front-header">{{ item.title }}</h3>
        <img :src="getImg(item.img)" alt="" />
      </div>
      <div class="ds-card-back">
        <div
          class="ds-card-back-bg"
          :style="{ backgroundImage: `url(${getImg(item.img)})` }"
        ></div>
        <div class="ds-card-back-content">
          <h3 class="ds-card-front-header">{{ item.title }}</h3>
          <h2>{{ item.author }}</h2>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object as () => {
      author: string;
      dateCreated: string;
      lastModified: string;
      title: string;
      desc: string;
      img: string;
      path: string;
      draft: boolean;
      // aliases:
      // tags:
    },
    required: true,
  },
});

// Default card pic
// function getImg(path: string) {
//   return path 
//   ? path 
//   : `/img/fulls/05.jpg`;
// }
const fallback = `/img/fulls/05.jpg`;
function getImg(path: string) {
  const remoteRepoBase = 'https://raw.githubusercontent.com/Ariges770/PersonalWebsiteObsidian/main/';

  // If path is provided, default to the remote repository
  return path ? `${remoteRepoBase}${path}?raw=true` : fallback;
  
}
</script>

<style>
.ds-card {
  width: 200px;
  height: 250px;
  margin: 1rem auto;
  perspective: 1000px;
  cursor: pointer;
}

@media screen and (max-width: 624px) {
  .ds-card {
      width: 100%; /* Ensure cards take full width */
      flex: 0 0 100%; /* Force one card per row */
  }
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

.ds-card-front,
.ds-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.5rem;
  overflow: hidden;
}

.ds-card-front {
  background: var(--surface);
  border: 1px solid var(--surface);
}

.ds-card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.ds-card-front-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  background: var(--card-overlay-dark);
  color: var(--text-on-dark);
  text-align: center;
  z-index: 1;
  margin: 0;
}

.ds-card-back {
  background: var(--card-back-bg);
  color: var(--text-on-dark);
  transform: rotateY(180deg);
  position: relative;
}

.ds-card-back-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  opacity: 0.6;
  transform: scaleX(-1);
  z-index: 0;
}

.ds-card-back-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  height: 100%;
  padding: 3.5rem 1rem 1rem;
  text-align: center;
}

.ds-card-back p {
  text-shadow: 0 2px 4px var(--text-shadow);
  margin: 0;
}

.ds-card h2 {
  color: var(--text-on-dark);
  margin: 0 0 1rem 0;
}
</style>
