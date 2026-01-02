<template>
  <UContainer>
    <div class="flex gap-18">
      <ProductImageSlider :items="images" class="flex-1" />
      <div class="flex-1 flex flex-col gap-4">
        <h1 class="font-bold text-3xl">{{ product?.name }}</h1>
        <div class="flex items-center gap-2">
          <p>4.5</p>
          <div class="flex gap-1">
            <UIcon name="i-lucide-star" class="text-yellow-400 size-3" />
            <UIcon name="i-lucide-star" class="text-yellow-400 size-3" />
            <UIcon name="i-lucide-star" class="text-yellow-400 size-3" />
            <UIcon name="i-lucide-star" class="text-yellow-400 size-3" />
            <UIcon name="i-lucide-star-half" class="text-yellow-400 size-3" />
          </div>
          <USeparator orientation="vertical" class="h-4" />
          <p class="text-sm text-gray-600">10K Ratings</p>
          <USeparator orientation="vertical" class="h-4" />
          <p class="text-sm text-gray-600">23 Reviews</p>
          <USeparator orientation="vertical" class="h-4" />
          <p class="text-sm text-gray-600">10K+ Sold</p>
        </div>
        <span class="text-primary font-bold text-2xl"
          >{{ product?.specification?.price.toFixed(2) }} PHP</span
        >
        <p>{{ product.summary }}</p>
        <div>
          <h4 class="mb-2 text-xs uppercase font-bold mt-4">Variants</h4>
          <div class="flex gap-2 flex-wrap">
            <ProductSpecificationSelect
              :specifications="specifications"
              :selected="selectedSpecification"
              @update:selected="(value:string) => (selectedSpecification = value)"
            />
          </div>
        </div>
        <div>
          <form>
            <h4 class="mb-2 text-xs uppercase font-bold mt-4">Quantity</h4>
            <UInputNumber v-model="quantity" />
            <div class="mt-2 flex gap-2 items-center w-80">
              <UButton
                label="Add to Cart"
                color="primary"
                size="xl"
                variant="outline"
                class="flex-1 flex justify-center"
              />
              <UButton
                label="Buy Now"
                color="primary"
                size="xl"
                class="flex-1 flex justify-center"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import ProductImageSlider from "~/components/product/ProductImageSlider.vue";
import { useProductImageStore } from "~/store/ProductImage.store";
import { useProductSingleStore } from "~/store/ProductSingle.store";
import { useProductSpecificationStore } from "~/store/ProductSpecification.store";

const productDataStore = useProductSingleStore();
const productImageStore = useProductImageStore();
const productSpecificationStore = useProductSpecificationStore();
const route = useRoute();

const product = computed(() => productDataStore.product);
const images = computed(() =>
  productImageStore.productImages.map((image) => image.source)
);
const specifications = computed(
  () => productSpecificationStore.productSpecifications
);

const quantity = ref(1);
const selectedSpecification = ref<string | null>(null);

onMounted(async () => {
  productImageStore.getProductImages(route.params.product_slug as string);
  await productDataStore.getProduct(route.params.product_slug as string);

  await productSpecificationStore.getProductSpecifications(
    route.params.product_slug as string
  );

  selectedSpecification.value =
    specifications.value.find((spec) => spec.default)?.id ??
    specifications.value[0]?.id ??
    null;
});
</script>
