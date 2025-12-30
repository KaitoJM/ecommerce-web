<template>
  <div class="flex flex-col gap-4 mt-4">
    <USlider v-model="value" :min="0" :max="500000" />
    <div class="flex gap-2 items-center">
      <UInput v-model="value[0]" placeholder="MIN" />
      <span>-</span>
      <UInput v-model="value[1]" placeholder="MAX" />
    </div>
    <UButton
      :loading="productStore.fetching"
      @click="handleApplyClick()"
      label="Apply"
      color="primary"
      class="w-full flex justify-center"
      variant="outline"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/Product.store";
import { useSearchProductParamsStore } from "~/store/SearchProductParams.store";

const searchStore = useSearchProductParamsStore();
const productStore = useProductStore();

const minPrice = computed(() => searchStore.priceMin);
const maxPrice = computed(() => searchStore.priceMax);
const value = ref([minPrice.value ?? 0, maxPrice.value ?? 0]);

const handleApplyClick = () => {
  searchStore.setPriceRange(value.value[0] ?? 0, value.value[1] ?? 0);
  productStore.getProducts();
};
</script>
