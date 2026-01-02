<template>
  <button
    v-for="item in specifications"
    @click="handleSpecificationClick(item.id)"
    :key="`product-specification-${item.id}`"
    :class="[
      'flex items-center gap-2 border border-accented rounded-lg py-1 px-2',
      selected === item.id ? 'bg-primary/10' : 'bg-white',
    ]"
  >
    <UIcon
      v-if="selected === item.id"
      name="i-lucide-check-circle"
      class="text-primary"
    />
    <UIcon v-else name="i-lucide-circle" class="text-gray-400" />
    <span class="text-gray-600">{{
      formatSpecificationLabel(item.combination)
    }}</span>
  </button>
</template>

<script setup lang="ts">
import type { ProductSpecification } from "~/types/Product.type";

const props = defineProps<{
  specifications: Array<ProductSpecification>;
  selected: string | null;
}>();

const formatSpecificationLabel = (combination: string) => {
  const combinationObject: Array<{ attribute_id: string; value: string }> =
    JSON.parse(combination);

  let label = "";
  combinationObject.forEach((item, key) => {
    if (key == 0) {
      label += `${item.value} `;
    } else {
      label += `| ${item.value}`;
    }
  });

  return label.trim();
};

const emit = defineEmits<{
  (e: "update:selected", value: string): void;
}>();

const handleSpecificationClick = (id: string) => {
  emit("update:selected", id);
};
</script>
