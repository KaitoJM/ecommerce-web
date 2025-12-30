<template>
  <UApp :toaster="toasterConfig">
    <NuxtLoadingIndicator />
    <Header></Header>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <Footer></Footer>
  </UApp>
</template>

<script setup lang="ts">
import type { ToasterProps } from "@nuxt/ui";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const toasterConfig: ToasterProps = {
  duration: 5000,
  position: "bottom-right",
};
</script>
