<template>
  <div>
    <main>
      <ContentDoc v-slot="{ doc }">
        <ContentRenderer :value="doc">
          <template #empty>
            <p>No contents found. This is a default page.</p>
          </template>
        </ContentRenderer>
      </ContentDoc>
    </main>
  </div>
</template>

<script setup>

</script>
