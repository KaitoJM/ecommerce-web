<template>
  <UContainer>
    <div v-if="searchedKey" class="mb-4 flex items-center gap-2">
      <UIcon name="i-lucide-lightbulb" class="size-6 inline-block mr-2" />
      <p>Showing results for "{{ searchedKey }}"</p>
    </div>
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
      <UPageGrid class="gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="(product, productKey) in products"
          :key="`product-${product.id}-${productKey}`"
        >
          <ProductThumbnail :data="product" />
        </div>
      </UPageGrid>
    </template>
    <div class="flex justify-center my-8">
      <Pagination
        :page-meta="pageMeta"
        :links="links"
        @update:page="handleUpdatePage"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import Pagination from "~/components/Pagination.vue";
import ProductThumbnailSkeleton from "~/components/preloaders/ProductThumbnailSkeleton.vue";
import ProductThumbnail from "~/components/product/ProductThumbnail.vue";
import { useProductStore } from "~/store/Product.store";
import { useSearchProductParamsStore } from "~/store/SearchProductParams.store";

definePageMeta({
  layout: "catalog",
});

const productStore = useProductStore();
const searchStore = useSearchProductParamsStore();

const products = computed(() => productStore.products);
const pageMeta = computed(() => productStore.pageMeta);
const links = computed(() => productStore.links);
const searchedKey = computed(() => searchStore.searchedKey);
const loading = computed(() => productStore.fetching);

onMounted(() => {
  productStore.getProducts();
});

const handleUpdatePage = (page: number) => {
  productStore.getProducts({ page: page });
};
</script>
