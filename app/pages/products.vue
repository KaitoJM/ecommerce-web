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
    <UPageGrid class="gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
      <div
        v-for="(product, productKey) in products"
        :key="`product-${product.id}-${productKey}`"
      >
        <div>
          <img
            :src="product.thumbnail"
            alt="Product Image"
            class="w-full h-48 object-cover rounded-lg mb-2"
          />
          <h3
            class="font-bold text-sm max-w-full overflow-hidden whitespace-nowrap ellipsis"
          >
            {{ product.name }}
          </h3>
          <p class="text-gray-600 mb-2 text-xs">
            {{ product.summary }}
          </p>
          <span class="text-primary font-bold block my-2"
            >{{ product.specification?.price.toFixed(2) }} PHP</span
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

onMounted(() => {
  productStore.getProducts();
});

const handleUpdatePage = (page: number) => {
  productStore.getProducts({ page: page });
};
</script>
