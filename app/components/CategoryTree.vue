<template>
  <UTree
    v-model="selected"
    :as="{ link: 'div' }"
    :items="categories"
    multiple
    propagate-select
    bubble-select
    @update:modelValue="handleSelect()"
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
import type { TreeItemSelectEvent } from "reka-ui";
import type { TreeItem } from "@nuxt/ui";
import { useCategoryStore } from "~/store/Category.store";
import {
  useSearchProductParamsStore,
  type SelectedCategory,
} from "~/store/SearchProductParams.store";
import { useProductStore } from "~/store/Product.store";

const categoryStore = useCategoryStore();
const searchStore = useSearchProductParamsStore();
const productStore = useProductStore();

const selected = ref<TreeItem[]>([]);
const categories = computed<TreeItem[]>(() =>
  categoryStore.categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }))
);

onMounted(() => {
  categoryStore.getCategories();
});

const handleSelect = (event?: TreeItemSelectEvent) => {
  searchStore.updateCategories(selected.value as SelectedCategory[]);

  productStore.getProducts();
};
</script>
