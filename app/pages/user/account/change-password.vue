<template>
  <div class="bg-neutral-50 px-6 py-4 rounded-lg">
    <h1 class="font-bold">Change Password</h1>
    <USeparator class="my-4" />
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam tempora ut
    error sequi, hic debitis quas facere non itaque dicta, soluta natus illo
    voluptatem harum, quo molestiae! Qui, quod amet!
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
  middleware: "auth",
});
</script>
