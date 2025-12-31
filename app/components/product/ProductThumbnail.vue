<template>
  <div>
    <img
      :src="data.thumbnail"
      alt="Product Image"
      class="w-full h-48 object-cover rounded-lg mb-2"
    />
    <h3
      class="font-bold text-sm max-w-full overflow-hidden whitespace-nowrap ellipsis"
    >
      {{ data.name }}
    </h3>
    <p class="text-gray-600 mb-2 text-xs">
      {{ data.summary }}
    </p>
    <span class="text-primary font-bold block my-2"
      >{{ data.specification?.price.toFixed(2) }} PHP</span
    >
    <div class="flex flex-col items-center justify-between gap-1">
      <UButton
        label="Add to Cart"
        color="primary"
        variant="outline"
        class="w-full flex justify-center"
      />
      <UButton
        label="Buy Now"
        color="primary"
        class="w-full flex justify-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product.type";

const props = defineProps<{
  data: Product;
}>();
</script>
