<template>
  <form @submit.prevent="handleSubmit" class="flex items-center gap-2">
    <UInput
      icon="i-lucide-search"
      variant="outline"
      placeholder="Search..."
      class="flex-1"
      v-model="searchQuery"
    />
    <UButton
      :loading="fetching"
      type="submit"
      icon="i-lucide-search"
      variant="solid"
      label="Search"
      color="warning"
    />
  </form>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/Product.store";
import { useSearchProductParamsStore } from "~/store/SearchProductParams.store";

const searchStore = useSearchProductParamsStore();
const productStore = useProductStore();

const searchQuery = computed({
  get: () => searchStore.searchQuery,
  set: (value: string) => {
    searchStore.setSearchQuery(value);
  },
});
const fetching = computed(() => productStore.fetching);

const handleSubmit = (event: Event) => {
  searchStore.updateSearchedKey();
  productStore.getProducts();
};
</script>
