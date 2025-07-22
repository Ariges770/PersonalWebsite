<template>
  <div>
    <!-- One -->
    <section id="one">
      <header class="major">
        <h2>Hey, my name is Ari!</h2>
      </header>
      <div>
        <p>
          I'm currently enrolled in monash university studying a bachelor of commerce and
          science majoring in mathematical foundations of econometrics and computational
          science.
        </p>
        <p>
          I've worked as a research assistant under Dr. Buser Say on HD-MILP-PLAN, a
          sequential planner which optimises a problem where the transition functions are
          pre trained deep neural-networks. My work included benchmarking various solvers
          and constraint formulations. Additionally, I worked over the summer on extending
          SCIPPlan, a planner for problems with continuos non-linear transition functions
          such as pandemic planning using the SIR model. My extension allows for
          non-linear constraint generation with experiments conducted over various
          domains. <br />
          Furthermore, I am currently working as a teaching associate teaching FIT1008,
          Monash's introduction to algorithms and have in the past taught FIT1045 -
          introduction to programming.
        </p>
        <p>
          My interests lie in automated planning, computational theory, signal processing
          and machine learning, specifically forecasting and reinforcement learning.
          Additionally, I also enjoy musical analysis and composition, having played flute
          in various ensembles and bands.
        </p>
        <p>
          If you would like to ask any questions about my past experiences you can reach
          out through my
          <a href="https://www.linkedin.com/in/ari-gestetner/">Linkedin</a> or by
          <a href="/contact">email</a> in the contact tab.
        </p>
      </div>
      <ul class="actions">
        <li><a href="#three" class="button">Reach out</a></li>
      </ul>
    </section>



    <!-- Cards -->
    <section id="two">
      <h2>Recent Work</h2>
      <div class="row">
        <!-- <TemplateCard :item="item" /> -->
        <TemplateCard v-for="(item, index) in mycards" :item="item" />
      </div>
      <ul class="actions">
        <li><a href="#" class="button">Full Portfolio</a></li>
      </ul>
    </section>

    <!-- Contact Form -->
    <TemplateContactForm :mydata="myinfo" />
  </div>
</template>

<script setup>
// console.log(urls.value)
// const { data: urls } = await useAsyncData("urls", () => queryContent("/").sort({ date: -1}).find())

// var contentArr = Array.from(urls.value).filter((item) => !item.draft)

// // const { data } = await useAsyncData('content-files', () => queryContent().find())
// const { data: contentFiles } = await useAsyncData("content-files", () => queryContent().find())
// const { data: navUrls } = await useAsyncData("content-urls", () => fetchContentNavigation())

const { data: myinfo } = await useAsyncData("mydata", () => {
  return queryCollection("mydata")
    .where("stem", "=", "mydata/PersonalContactInfo")
    .first();
});
const { data: mycards } = await useAsyncData("mycards", () => {
  return queryCollection("mycards").order("title", "DESC").all();
});

// console.log(txtfile.split("\n"))

// console.log(contentFiles)
// navUrls.value.forEach((item) => {console.log(item)})
// for (const item of navUrls.value) {
//   console.log(item)
// }
// if (window.matchMedia) {
//   const query = window.matchMedia('prefers-color-scheme: dark');
//   console.log(query)
// }

// // Find a single author
// const { data: author } = await useAsyncData('larbish', () => {
//   return queryCollection('authors')
//     .where('stem', '=', 'larbish')
//     .first()
// })

// // Get all authors
// const { data: authors } = await useAsyncData('authors', () => {
//   return queryCollection('authors')
//     .order('name', 'DESC')
//     .all()
// })
</script>
