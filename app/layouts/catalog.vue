<script setup lang="ts">
import CategoryTree from "~/components/tools/CategoryTree.vue";
import PriceRange from "~/components/tools/PriceRange.vue";
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <div class="p-4">
          <div class="mt-4 mb-2 flex gap-2 items-center">
            <UIcon name="i-lucide-funnel" class="size-3" />
            <p class="text-sm font-bold uppercase">Search Filter</p>
          </div>
          <USeparator class="my-2" />
          <h4 class="text-xs mt-4 mb-2">Categories</h4>
          <CategoryTree />
          <h4 class="text-xs mt-4 mb-2">Price Range</h4>
          <PriceRange />
          <h4 class="text-xs mt-4 mb-2">Brands</h4>
          <CategoryTree />
        </div>
      </UPageAside>
    </template>
    <UPageBody>
      <slot></slot>
    </UPageBody>
  </UPage>
</template>
