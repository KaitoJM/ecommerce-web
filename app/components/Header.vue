<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import Logo from "./Logo.vue";
import SearchProduct from "./tools/SearchProduct.vue";
import CartPopOver from "./cart/CartPopOver.vue";

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
  <UHeader class="bg-primary-700 h-auto" title="">
    <template #left>
      <div class="flex items-end gap-2 p-2">
        <Logo class="h-8 w-auto" />
        <ul class="flex gap-3 items-center text-sm ml-8">
          <li v-for="link in items" :key="link.label">
            <nuxt-link
              :to="link.to"
              :target="link.target"
              class="text-white hover:underline"
            >
              {{ link.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </template>

    <template #right>
      <div class="flex items-center gap-1 p-2">
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
      </div>
    </template>

    <template #bottom>
      <UContainer>
        <div class="flex gap-8 items-center justify-between py-2">
          <SearchProduct class="w-full max-w-xl" />
          <div class="flex gap-2 items-center">
            <CartPopOver />
            <UButton
              label="Login"
              variant="ghost"
              color="neutral"
              class="text-white"
            />
          </div>
        </div>
      </UContainer>
    </template>
  </UHeader>
</template>
