<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <div class="mb-8">
      <Logo class="w-50" />
    </div>
    <form class="w-100 flex flex-col gap-2">
      <UFormField label="First name">
        <UInput placeholder="John" class="w-full" />
      </UFormField>
      <UFormField label="Last name">
        <UInput placeholder="Doe" class="w-full" />
      </UFormField>
      <UFormField label="Email">
        <UInput placeholder="Enter your email" class="w-full" />
      </UFormField>
      <UFormField label="Password">
        <UInput type="password" class="w-full" />
      </UFormField>
      <UFormField label="Confirm Password">
        <UInput type="password" class="w-full" />
      </UFormField>
      <UButton label="Create Account" class="flex justify-center mt-4" />
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

definePageMeta({
  layout: "gate",
});
</script>
