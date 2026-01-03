<template>
  <div>
    <img
      :src="data.thumbnail"
      alt="Product Image"
      class="w-full h-48 object-cover rounded-lg mb-2"
    />
    <nuxt-link
      :to="`/${data.id}`"
      class="font-bold text-sm max-w-full overflow-hidden whitespace-nowrap ellipsis block"
    >
      {{ data.name }}
    </nuxt-link>
    <p class="text-gray-600 mb-2 text-xs">
      {{ data.summary }}
    </p>
    <span class="text-primary font-bold block my-2">
      {{ formatter.formatNumber(data.specification.price) }}
      <span class="text-xs text-neutral">PHP</span>
    </span>
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

const formatter = useFormatter();
</script>
