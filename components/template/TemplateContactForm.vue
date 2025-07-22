<template>
  <section id="three">
    <h2>Get In Touch</h2>
    <p>This message box currently does not work, however, it will be working soon.</p>
    <div class="row">
      <div class="col-8 col-12-small">
        <!-- <form method="post" action="#"> -->
          <div class="row gtr-uniform gtr-50">
            <div class="col-6 col-12-xsmall"><input type="text" name="name" id="name" placeholder="Name" /></div>
            <div class="col-6 col-12-xsmall"><input type="email" name="email" id="email" placeholder="Email" /></div>
            <div class="col-12"><textarea name="message" id="message" placeholder="Message" rows="4"></textarea></div>
          </div>
        <!-- </form> -->
        <ul class="actions">
          <li style="padding-top: 1.25em"><input type="submit" value="Send Message" /></li>
        </ul>
      </div>
      <div class="col-4 col-12-small">
        <ul class="labeled-icons">
          <li>
            <h3 class="icon solid fa-home"><span class="label">Address</span></h3>
            {{  mydata.address }}
          </li>
          <!-- <li>
            <h3 class="icon solid fa-mobile-alt"><span class="label">Phone</span></h3>
            000-000-0000
          </li> -->
          <li>
            <h3 class="icon solid fa-envelope"><span class="label">Email</span></h3>
            <a href="#">{{ mydata.email }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>

</template>

<script setup>
// import { Button, Hr, Html, Text } from ''

// https://github.com/dword-design/nuxt-mail?utm_source=nuxt.com&utm_medium=aside-module&utm_campaign=nuxt.com
const mail = useMail()

const props = defineProps({
  title: String,
  mydata: {
    type: Object,
    required: true,
},
});
</script>

