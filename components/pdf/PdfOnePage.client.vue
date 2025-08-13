<template>
  <div>
    <div class="change-page">
      <!-- <button @click="page = page > 1 ? page - 1 : page">
        Prev
      </button> -->
      <a class="button" @click="page = page > 1 ? page - 1 : page">Prev</a>
      <span class="border">{{ page }} / {{ pages }}</span>
      <a class="button" @click="page = page < pages ? page + 1 : page">Next</a>
      <!-- <button @click="page = page < pages ? page + 1 : page">
        Next
      </button> -->
    </div>
    <div>
      <VuePDF :pdf="pdf" :page="page" :text-layer="textLayer" />
    </div>
  </div>
</template>

<script setup>
// https://medium.com/@deniswanjohi15/dommatrix-is-not-defined-server-side-rendering-and-clinet-side-rendering-in-nuxt-js-f7bc43d44219
import { VuePDF, usePDF } from "@tato30/vue-pdf";

const page = useState("page", () => 1);
const textLayer = useState("textLayer", () => true);
// const { pdf, pages } = usePDF('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')
const { pdf, pages } = usePDF("/pdf/resume.pdf");
</script>

<style>
.change-page {
  text-align: center;
}
.border {
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
  -moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  background-color: transparent;
  border-radius: 0.35em;
  /* border: solid 3px #efefef; */
  color: #787878 !important;
  display: inline-block;
  font-weight: 400;
  height: 3.15em;
  height: calc(2.75em + 6px);
  line-height: 2.75em;
  min-width: 10em;
  padding: 0 1.5em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
}
</style>
