<template>
  <UContainer>
    <div
      class="flex items-center gap-4 justify-between bg-neutral-50 p-4 rounded-lg mb-6"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm">Sort By: </span>
        <UButton label="Relevance" />
        <UButton label="Latest" variant="outline" />
        <UButton label="Top Sales" variant="outline" />
        <USelect
          placeholder="Price"
          :items="['Price: Low to High', 'Price: High to Low']"
        />
      </div>
      <div class="flex items-center gap-2">
        <UButton
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="outline"
        />
        <UButton
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="outline"
        />
      </div>
    </div>
    <UPageGrid class="gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
      <div v-for="n in 30" :key="n">
        <div>
          <img
            :src="`https://picsum.photos/200/200?random=${n}`"
            alt="Product Image"
            class="w-full h-48 object-cover rounded-lg mb-2"
          />
          <h3 class="font-bold">Product {{ n }}</h3>
          <p class="text-gray-600 mb-2 text-xs">
            This is a brief description of product {{ n }}.
          </p>
          <span class="text-primary font-bold block my-2"
            >{{ (n * 10).toFixed(2) }} PHP</span
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
      </div>
    </UPageGrid>
    <div class="flex justify-center my-8">
      <UPagination :total="100" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "catalog",
});
</script>
