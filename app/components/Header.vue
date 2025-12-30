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
  <UHeader class="bg-primary text-white h-auto" title="">
    <template #left>
      <UNavigationMenu :items="items" />
    </template>

    <template #right>
      <div class="flex items-center gap-1">
        <nuxt-link to="#">
          <UButton
            icon="i-lucide-bell"
            size="md"
            label="Notifications"
            variant="ghost"
            class="text-white"
          />
        </nuxt-link>
        <nuxt-link to="#">
          <UButton
            icon="i-lucide-circle-question-mark"
            size="md"
            label="Help"
            variant="ghost"
            class="text-white"
          />
        </nuxt-link>
        <UUser
          size="sm"
          name="Juan Marcus"
          :avatar="{
            src: 'https://github.com/benjamincanac.png',
          }"
          class="text-white"
        />
      </div>
    </template>

    <template #bottom>
      <UContainer>
        <div class="flex gap-8 items-center justify-between py-4">
          <div class="w-50">
            <Logo class="h-10 w-auto" />
          </div>
          <UInput
            icon="i-lucide-search"
            size="xl"
            variant="outline"
            placeholder="Search..."
            class="flex-1"
          />
          <UButton icon="i-lucide-shopping-cart" size="xl" />
        </div>
      </UContainer>
    </template>
  </UHeader>
</template>
