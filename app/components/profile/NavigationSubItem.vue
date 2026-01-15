<template>
  <li class="flex gap-1.5 items-center">
    <div :class="['block w-0.5 h-4 rounded', active ? 'bg-primary' : '']"></div>
    <nuxt-link :to="url" :class="[active ? 'font-bold' : '']">{{
      label
    }}</nuxt-link>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  url: string;
  label: string;
}>();

const route = useRoute();

const active = computed(() => {
  if (!props.url) return false;

  // Exact match
  return route.path === props.url;
});
</script>
