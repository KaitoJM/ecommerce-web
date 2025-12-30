<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import Logo from "./Logo.vue";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "About Us",
    to: "/about-us",
    active: route.path.startsWith("/about-us"),
  },
  {
    label: "Promo",
    to: "/promo",
    active: route.path.startsWith("/promo"),
  },
  {
    label: "Blogs and Articles",
    to: "https://go.nuxt.com/figma-ui",
    target: "_blank",
  },
]);
</script>

<template>
  <UHeader>
    <template #title>
      <Logo class="h-10 w-auto" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>
