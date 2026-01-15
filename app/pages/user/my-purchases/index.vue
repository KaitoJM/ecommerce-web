<template>
  <div class="bg-neutral-50 px-6 py-4 rounded-lg">
    <h1 class="font-bold">My Purchases</h1>
    <USeparator class="my-4" />
    <StatusTabs />
  </div>
  <div></div>
</template>

<script setup lang="ts">
import StatusTabs from "~/components/profile/purchases/StatusTabs.vue";

definePageMeta({
  layout: "user",
  middleware: "auth",
});
</script>
