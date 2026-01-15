<template>
  <div class="bg-neutral-50 px-6 py-4 rounded-lg">
    <h1 class="font-bold">My Profile</h1>
    <p class="text-xs">Manage and protect your account</p>
    <USeparator class="my-4" />
    <div class="flex gap-8">
      <form class="flex-1 flex flex-col gap-2">
        <UFormField label="First name">
          <UInput v-model="first_name" placeholder="Juan" class="w-full" />
        </UFormField>
        <UFormField label="Last name">
          <UInput v-model="last_name" placeholder="Dela Cruz" class="w-full" />
        </UFormField>
        <UFormField label="Email">
          <p class="text-sm text-neutral-500">{{ auth.user?.user.email }}</p>
        </UFormField>
        <UFormField label="Phone number">
          <UInput
            v-model="phone"
            placeholder="Enter your phone number."
            class="w-full"
          />
        </UFormField>
        <UFormField label="Gender">
          <UInput v-model="gender" class="w-full" />
        </UFormField>
        <UFormField label="Date of birth">
          <UInput v-model="birthday" class="w-full" />
        </UFormField>
        <div class="flex justify-end mt-4">
          <UButton label="Update" variant="outline" />
        </div>
      </form>
      <div class="w-1/3">
        <p class="text-sm text-accented">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut dolorem
          maxime quibusdam doloribus repudiandae? Non tempore ab amet, cum neque
          blanditiis veritatis velit nisi ea expedita maxime, quia suscipit
          quos?
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/Auth.store";

definePageMeta({
  layout: "user",
  middleware: "auth",
});

const auth = useAuthStore();

const first_name = ref(auth.user?.first_name);
const last_name = ref(auth.user?.last_name);
const phone = ref("");
const gender = ref(auth.user?.gender);
const birthday = ref(auth.user?.birthday);
</script>
