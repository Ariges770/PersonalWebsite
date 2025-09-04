<template>
  <div>
    <Analytics />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<<script setup lang="ts">
  import { Analytics } from '@vercel/analytics/nuxt';
</script>

<style>
@import url("~/assets/css/main.css");
@import url("~/assets/css/gfm-styles.css");
@import url("~/assets/css/fontawesome-all.min.css");
@import url("~/assets/css/tm-template.css");
</style>
