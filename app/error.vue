<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

const handleClearError = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout name="default">
    <div class="py-20 flex flex-col items-center justify-center text-cente">
      <h1 class="text-[100px] font-bold">
        {{ error.statusCode }}
      </h1>

      <p class="mt-4 text-lg text-gray-500">
        {{ error.message || "Page not found" }}
      </p>

      <UButton variant="link" @click="handleClearError"> Go Home </UButton>
    </div>
  </NuxtLayout>
</template>
