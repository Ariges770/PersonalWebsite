<template>
  <section id="three">
    <h2>Get In Touch</h2>
    <p>This message box currently does not currently send email, it is currently being worked on.</p>
    <div class="row">
      <div class="col-8 col-12-small">
        <!-- <form method="post" action="#"> -->
        <div class="row gtr-uniform gtr-50">
          <div class="col-6 col-12-xsmall">
            <input type="text" name="name" id="name" placeholder="Name" v-model="name" />
          </div>
          <div class="col-6 col-12-xsmall">
            <input type="email" name="email" id="email" placeholder="Email" v-model="email" />
          </div>
          <div class="col-12">
            <textarea
              class="response-box"
              name="message"
              id="message"
              placeholder="Message"
              rows="4"
              v-model="message"
            ></textarea>
          </div>
        </div>
        <!-- </form> -->
        <ul class="actions">
          <li style="padding-top: 1.25em">
            <input type="submit" value="Send Message" @click="sendEmail()" />
          </li>
        </ul>
      </div>
      <div class="col-4 col-12-small">
        <ul class="labeled-icons">
          <li>
            <h3 class="icon solid fa-home"><span class="label">Address</span></h3>
            {{ mydata.address }}
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

<style>
.response-box {
  max-width: 100%;
  min-width: 100%;
}
</style>

<script setup>
// import { Button, Hr, Html, Text } from ''


const name = useState('name', () => "")
const email = useState('email', () => "")
const message = useState('message', () => "")



// https://github.com/dword-design/nuxt-mail?utm_source=nuxt.com&utm_medium=aside-module&utm_campaign=nuxt.com
const mail = useMail();


// https://www.reddit.com/r/vuejs/comments/1fv3t15/how_to_send_emails_from_a_form_in_nuxt3 use api rather than frontend
// https://vuemail.net for templates
function sendEmail() {
  // mail.send({
  //   from: `"${name.value}" <${email.value}>`,
  //   subject: `PersonalWebsite email from ${email.value}`,
  //   text: message.value

  // })
  console.log("Name: ", name)
  console.log("Email: ", email)
  console.log("Message: ", message)
  name.value = ""
  email.value = ""
  message.value = ""
};

const props = defineProps({
  title: String,
  mydata: {
    type: {
      name: String,
      email: String,
      address: String,
      phone: String,
      socialMedia: {
        twitter: String,
        github: String,
        linkedin: String
      }
    },
    required: true,
  },
});
</script>
