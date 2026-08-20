<template>
  <header id="header">
    <div class="inner">
      <a href="#" class="image avatar">
        <img src="/AGLogo.svg" alt="" class="logo" />
      </a>
    </div>

    <nav class="tm-nav" id="tm-nav">
      <ul class="tm-ul">
        <li
          v-for="headerpath of headerpaths"
          class="tm-nav-item"
          :class="{
            active:
              headerpath.path === '/'
                ? $route.path === '/'
                : $route.path.startsWith(headerpath.path),
          }"
        >
          <a :href="headerpath.path" class="tm-nav-link">
            {{ headerpath.title }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
defineProps({
  headerpaths: {
    type: Array as () => Array<{
      title: string;
      path: string;
    }>,
    required: true,
  },
});
</script>
