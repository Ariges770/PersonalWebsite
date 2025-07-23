<template>
  <article class="col-6 col-12-xsmall work-item ds-card">
    <a :href="item.url" class="ds-card-inner image fit">
      <div class="ds-card-front">
        <h3 class="ds-card-front-header">{{ item.title }}</h3>
        <img :src="item.src" alt="" />
      </div>
      <div class="ds-card-back">
        <div class="ds-card-back-bg" :style="{ backgroundImage: `url(${item.src})` }"></div>
        <div class="ds-card-back-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style>
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
  background: white;
  border: 1px solid #ffffffff;
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
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  z-index: 1;
  margin: 0;
}

.ds-card-back {
  background: rgba(8, 21, 22, 0.85);
  color: white;
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
  justify-content: center;
  height: 100%;
  padding: 1rem;
  text-align: center;
}

.ds-card-back h3,
.ds-card-back p {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0.5rem 0;
}
</style>