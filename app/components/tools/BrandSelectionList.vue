<template>
  <UTree
    v-model="selected"
    :as="{ link: 'div' }"
    :items="brands"
    multiple
    propagate-select
    bubble-select
  >
    <template #item-leading="{ selected, indeterminate, handleSelect }">
      <UCheckbox
        :model-value="indeterminate ? 'indeterminate' : selected"
        tabindex="-1"
        @change="handleSelect"
        @click.stop
      />
    </template>
  </UTree>
</template>

<script setup lang="ts">
import type { TreeItem } from "@nuxt/ui";
import {
  useSearchProductParamsStore,
  type SelectedCategory,
} from "~/store/SearchProductParams.store";
import { useProductStore } from "~/store/Product.store";
import { useBrandStore } from "~/store/Brand.store";

const brandStore = useBrandStore();
const searchStore = useSearchProductParamsStore();
const productStore = useProductStore();

const selected = ref<TreeItem[]>([]);
const brands = computed<TreeItem[]>(() =>
  brandStore.brands.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }))
);

onMounted(() => {
  brandStore.getBrands();
});

const handleSelect = () => {
  //   searchStore.updateCategories(selected.value as SelectedCategory[]);
  //   productStore.getProducts();
};
</script>
