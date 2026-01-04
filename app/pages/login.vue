<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <div class="mb-8">
      <Logo class="w-50" />
    </div>
    <form class="w-80 flex flex-col gap-2">
      <UFormField label="Email">
        <UInput placeholder="Enter your email" class="w-full" />
      </UFormField>
      <UFormField label="Password">
        <UInput
          type="password"
          placeholder="Enter your password"
          class="w-full"
        />
      </UFormField>
      <UButton label="Login" class="flex justify-center mt-4" />
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

definePageMeta({
  layout: "gate",
});
</script>
