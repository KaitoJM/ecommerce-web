<template>
  <img
    src="/juan-commerce-logo.png"
    alt="Logo"
    :class="[white ? `invert brightness-200` : '']"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  white?: boolean;
}>();
</script>
