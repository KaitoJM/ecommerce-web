<script setup lang="ts">
import CategoryTree from "~/components/CategoryTree.vue";
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <div class="p-4">
          <nuxt-link to="/" class="text-sm flex gap-2 items-center">
            <UIcon name="i-lucide-arrow-left" class="size-5" />
            Back to Home
          </nuxt-link>
          <USeparator class="my-2" />
          <CategoryTree />
        </div>
      </UPageAside>
    </template>
    <UPageBody>
      <slot></slot>
    </UPageBody>
  </UPage>
</template>
