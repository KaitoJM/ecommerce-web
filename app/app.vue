<template>
  <UApp :toaster="toasterConfig">
    <NuxtLoadingIndicator />
    <Header></Header>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <UFooter />
  </UApp>
</template>

<script setup lang="ts">
import type { ToasterProps } from "@nuxt/ui";
import Header from "./components/Header.vue";

const toasterConfig: ToasterProps = {
  duration: 5000,
  position: "bottom-right",
};
</script>
