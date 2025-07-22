<template>
  <div>
    <TemplateHeader :headerpaths="headerpaths"/>
    <!-- Main -->
    <div id="main">
      <slot />

      <!-- Footer -->
      <footer id="footer" style="background-color: black">
        <h1>Test</h1>
        <div class="inner">
          <ul class="icons">
            <li>
              <a href="#" class="icon brands fa-twitter"
                ><span class="label">Twitter</span></a
              >
            </li>
            <li>
              <a href="#" class="icon brands fa-github"
                ><span class="label">Github</span></a
              >
            </li>
            <li>
              <a href="#" class="icon brands fa-dribbble"
                ><span class="label">Dribbble</span></a
              >
            </li>
            <li>
              <a href="#" class="icon solid fa-envelope"
                ><span class="label">Email</span></a
              >
            </li>
          </ul>
          <ul class="copyright">
            <li>&copy; Untitled</li>
            <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
      </footer>
    </div>
  </div>


</template>

<script setup>
const headerpaths = [
  { path: "/", title: "Home" },
  { path: "/blog", title: "Blog" },
  { path: "/research", title: "Research" },
  { path: "/resume", title: "Resume" },
  { path: "/contact", title: "Contact" },
  { path: "/template", title: "Template" },
];
</script>


