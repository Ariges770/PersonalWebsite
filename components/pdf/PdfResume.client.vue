<template>
  <div>
    <h1>{{ props.urls }}</h1>
    <VuePDF :pdf="pdf" :page="page" fit-parent text-layer />
  </div>
</template>

<script setup>
// https://medium.com/@deniswanjohi15/dommatrix-is-not-defined-server-side-rendering-and-clinet-side-rendering-in-nuxt-js-f7bc43d44219
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import "@tato30/vue-pdf/style.css";

const props = defineProps({
  urls: [String],
  title: String,
});

const page = useState("page", () => 1);
// const { pdf, pages } = usePDF('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')
const { pdf } = usePDF(props.title);
</script>

<style>
.textLayer ::selection {
  background: #9effc6ff;
  /* background: color-mix(in srgb, AccentColor, transparent 0%) */
}
</style>
