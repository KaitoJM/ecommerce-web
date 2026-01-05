<template>
  <form @submit.prevent="handleLogin()" class="my-8">
    <UFormField label="Email" class="mt-2">
      <UInput v-model="email" placeholder="Enter your email" class="w-full" />
    </UFormField>
    <UFormField label="Password" class="mt-2">
      <UInput v-model="password" type="password" class="w-full" />
    </UFormField>
    <UButton
      :loading="loading"
      type="submit"
      label="Login"
      class="w-full flex justify-center mt-4"
    />
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/Auth.store";
import type { ApiError } from "~/types/ApiResponses.type";

definePageMeta({
  layout: "gate",
});

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;

  try {
    await authStore.login(email.value, password.value);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    toast.add({
      title: "Error",
      description: apiError.message,
      icon: "i-lucide-octagon-x",
      color: "error",
    });
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
