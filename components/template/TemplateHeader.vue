<template>
      <header id="header">
      <div class="inner">
        <a href="#" class="image avatar">
          <img src="/AGLogo.svg" alt="" class="logo" />
        </a>
        <h1>
            I'm <strong>Ari Gestetner</strong> — a passionate flautist, <br/>music producer, web developer,<br />
            CS and Econometrics student <br /> and <strong>always</strong> looking to learn more.
        </h1>
        
      </div>

      <nav class="tm-nav" id="tm-nav">
        <ul class="tm-ul">
          <li
            v-for="headerpath in headerpaths"
            class="tm-nav-item"
            :class="{
              active: (headerpath.path === '/' ? $route.path === '/' : $route.path.startsWith(headerpath.path)),
            }"
          >
            <a :href="headerpath.path" class="tm-nav-link">
              <!-- <i class="fas fa-home"></i> -->
              {{ headerpath.title }}
            </a>
          </li>
        </ul>
      </nav>
    </header>

</template>

<script setup>
const props = defineProps({
  headerpaths: {
    type: Array,
    required: true,
  },
});
</script>
