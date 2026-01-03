<template>
  <UContainer>
    <template v-if="loading">
      <UPageGrid class="gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <ProductThumbnailSkeleton v-for="n in 10" :key="n" />
      </UPageGrid>
    </template>
    <template v-else-if="products.length === 0">
      <div class="flex items-center justify-center min-h-100 w-full">
        <UEmpty
          variant="naked"
          icon="i-lucide-file"
          title="No products found"
          description="It looks like the search query returned no results."
        />
      </div>
    </template>
    <template v-else>
      <h2 class="text-center text-xl mb-2">New Arrivals</h2>
      <p class="text-xs mb-8 max-w-150 mx-auto text-center text-accented">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos architecto
        quae, at doloribus quo ut ea reprehenderit nulla expedita aliquid
        adipisci delectus quam quibusdam, itaque natus fugit modi maiores neque.
      </p>
      <UPageGrid class="gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="(product, productKey) in products"
          :key="`product-${product.id}-${productKey}`"
        >
          <ProductThumbnail :data="product" />
        </div>
      </UPageGrid>
      <div class="flex justify-end mt-8">
        <UButton
          to="/products"
          label="View more products"
          trailing-icon="i-lucide-arrow-right"
          variant="ghost"
        />
      </div>
    </template>
  </UContainer>
</template>

<script setup lang="ts">
import ProductThumbnailSkeleton from "~/components/preloaders/ProductThumbnailSkeleton.vue";
import ProductThumbnail from "~/components/product/ProductThumbnail.vue";
import { useProductStore } from "~/store/Product.store";

const productStore = useProductStore();

const products = computed(() => productStore.products);
const loading = computed(() => productStore.fetching);

onMounted(() => {
  productStore.getProducts();
});
</script>
