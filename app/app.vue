<template>
  <UApp :toaster="toasterConfig">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer></Footer>
  </UApp>
</template>

<script setup lang="ts">
import type { ToasterProps } from "@nuxt/ui";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./store/Auth.store";

const toasterConfig: ToasterProps = {
  duration: 5000,
  position: "bottom-right",
};

const auth = useAuthStore();

onMounted(() => {
  auth.hydrate();
});
</script>
