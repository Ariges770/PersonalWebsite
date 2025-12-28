<template>
  <div>
    <!-- One -->
    <section id="one">
      <header class="major">
        <h2>Hey, my name is Ari!</h2>
      </header>
      <div>
        <p>
          I Completed a bachelor's of Science majoring in Mathematics and Computational Science 
          at Monash University
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
          Furthermore, I worked as a teaching associate teaching FIT1008,
          Monash's introduction to algorithms and have in the past taught FIT1045 -
          introduction to programming.
        </p>
        <p>
          My interests lie in automated planning, computational theory, web development, signal processing
          and machine learning, specifically forecasting and statistical learning theory.
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
        <li><a href="\contact" class="button">Reach out</a></li>
      </ul>
    </section>



    <!-- Cards -->
    <section id="two">
      <h2>Recent Work</h2>
      <div class="row">
        <TemplateCard v-for="(item, index) in myrepo" :item="item" />
      </div>
      <ul class="actions">
        <li><a href="#" class="button">Full Portfolio</a></li>
      </ul>
    </section>
  </div>
</template>

<script setup>

const { data: myrepo } = await useAsyncData("cards", () => {
  return queryCollection("myrepo")
    .order("lastModified", "ASC")
    .where("draft", "=", false)
    .all();
});

</script>
