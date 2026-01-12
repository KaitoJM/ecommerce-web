<template>
  <form @submit.prevent="handleSubmit" class="my-8">
    <UFormField label="First Name">
      <UInput
        v-model="first_name"
        placeholder="Enter your first name"
        class="w-full"
      />
    </UFormField>
    <UFormField label="Last Name" class="mt-2">
      <UInput
        v-model="last_name"
        placeholder="Enter your last name"
        class="w-full"
      />
    </UFormField>
    <UFormField label="Email" class="mt-2">
      <UInput v-model="email" placeholder="Enter your email" class="w-full" />
    </UFormField>
    <UFormField label="Password" class="mt-2">
      <UInput v-model="password" type="password" class="w-full" />
    </UFormField>
    <UFormField label="Confirm Password" class="mt-2">
      <UInput v-model="cpassword" type="password" class="w-full" />
    </UFormField>
    <UButton
      :loading="loading"
      type="submit"
      label="Register"
      class="w-full flex justify-center mt-4"
    />
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/Auth.store";
import { useOrderStore } from "~/store/Order.store";
import type { ApiError } from "~/types/ApiResponses.type";

definePageMeta({
  layout: "gate",
});

const registrationComposable = useRegistration();
const authStore = useAuthStore();
const orderStore = useOrderStore();
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
    orderStore.setEmail(email.value);
    toast.add({
      title: "Success",
      description: "Registration successful",
      icon: "i-lucide-check",
      color: "primary",
    });
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
