<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <div class="mb-8">
      <Logo class="w-50" />
    </div>
    <form @submit.prevent="handleLogin" class="w-80 flex flex-col gap-2">
      <UFormField label="Email">
        <UInput v-model="email" placeholder="Enter your email" class="w-full" />
      </UFormField>
      <UFormField label="Password">
        <UInput
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="w-full"
        />
      </UFormField>
      <UButton
        :loading="loading"
        type="submit"
        label="Login"
        class="flex justify-center mt-4"
      />
    </form>
    <USeparator class="my-2 w-80" />
    <p class="text-sm text-left w-80">
      Doesn't have an account yet? Click
      <nuxt-link to="/register" class="text-primary">here</nuxt-link>
      to register.
    </p>
  </div>
</template>

<script setup lang="ts">
import Logo from "~/components/Logo.vue";
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
    router.push("/");
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
