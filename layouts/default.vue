<template>
  <div class="default-layout">
    <TemplateHeader :headerpaths="headerpaths"/>
    <!-- Main -->
    <div id="main">
      <slot />
      <!-- <TemplateFooter /> -->
    </div>
  </div>


</template>

<script setup>
const headerpaths = [
  { path: "/", title: "Home" },
  { path: "/blog", title: "Blog" },
  // { path: "/research", title: "Research" },
  { path: "/resume", title: "Resume" },
  { path: "/contact", title: "Contact" },
  { path: "/template", title: "Template" },
];
</script>


<style>
::selection {
  background-color: #9effc6ff;
  color: #09130dff;
}
</style>