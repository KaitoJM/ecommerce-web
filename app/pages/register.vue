<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <div class="mb-8">
      <Logo class="w-50" />
    </div>
    <form @submit.prevent="handleSubmit" class="w-100 flex flex-col gap-2">
      <UFormField label="First name">
        <UInput v-model="first_name" placeholder="John" class="w-full" />
      </UFormField>
      <UFormField label="Last name">
        <UInput v-model="last_name" placeholder="Doe" class="w-full" />
      </UFormField>
      <UFormField label="Email">
        <UInput v-model="email" placeholder="Enter your email" class="w-full" />
      </UFormField>
      <UFormField label="Password">
        <UInput v-model="password" type="password" class="w-full" />
      </UFormField>
      <UFormField label="Confirm Password">
        <UInput v-model="cpassword" type="password" class="w-full" />
      </UFormField>
      <UButton
        :loading="loading"
        type="submit"
        label="Create Account"
        class="flex justify-center mt-4"
      />
    </form>
    <USeparator class="my-2 w-100" />
    <p class="text-sm text-left w-100">
      Already have an account? Click
      <nuxt-link to="/login" class="text-primary">here</nuxt-link>
      to login.
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

const registrationComposable = useRegistration();
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const cpassword = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;

  if (!validatePassword()) {
    loading.value = false;
    return;
  }

  try {
    const params: RegistrationParam = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    };

    await registrationComposable.register(params);
    await authStore.login(email.value, password.value);
    toast.add({
      title: "Success",
      description: "Registration successful",
      icon: "i-lucide-check",
      color: "primary",
    });

    router.push("/");
  } catch (error) {
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

const validatePassword = (): boolean => {
  if (cpassword.value != password.value) {
    toast.add({
      title: "Error",
      description: "Password confirmation did not matched.",
      icon: "i-lucide-octagon-x",
      color: "error",
    });

    return false;
  }

  return true;
};
</script>
