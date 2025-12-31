<template>
  <UCarousel v-slot="{ item }" arrows :items="items" class="w-full mx-auto">
    <img :src="item" class="rounded-lg w-full" />
  </UCarousel>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: string[];
}>();
</script>
