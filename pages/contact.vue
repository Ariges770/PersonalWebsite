<template>
    <!-- Contact Form -->
    <div>
        <TemplateContactForm :mydata="myinfo" />
    </div>
</template>

<script setup>
const { data: myinfo } = await useAsyncData("mydata", () => {
  return queryCollection("mydata")
    .where("stem", "=", "mydata/PersonalContactInfo")
    .first();
});
</script>