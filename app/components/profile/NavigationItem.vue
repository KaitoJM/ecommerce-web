<template>
  <li>
    <div class="flex gap-1 items-center">
      <div
        :class="['block w-0.5 h-4 rounded', active ? 'bg-primary' : '']"
      ></div>
      <p v-if="!url" class="font-bold flex gap-2 items-center text-primary">
        <UIcon :name="icon" />
        {{ label }}
      </p>
      <nuxt-link
        v-else
        :to="url"
        class="flex gap-2 items-center font-bold text-primary w-fit"
      >
        <UIcon :name="icon" />
        {{ label }}
      </nuxt-link>
    </div>
    <ul
      v-if="slots.default"
      class="ml-4 flex flex-col gap-2 pt-2 text-neutral-500"
    >
      <slot></slot>
    </ul>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  url?: string;
  label: string;
  icon: string;
}>();

const slots = useSlots();
const route = useRoute();

const active = computed(() => {
  if (!props.url) return false;

  // Exact match
  return route.path === props.url;
});
</script>
