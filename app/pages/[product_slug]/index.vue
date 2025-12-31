<template>
  <UContainer>
    <div class="flex gap-18">
      <UCarousel v-slot="{ item }" arrows :items="items" class="flex-1 mx-auto">
        <img :src="item" class="rounded-lg" />
      </UCarousel>
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
            <UBadge
              :avatar="{
                src: 'https://github.com/nuxt.png',
              }"
              size="md"
              color="neutral"
              variant="outline"
            >
              Red | 12oz
            </UBadge>
            <UBadge
              :avatar="{
                src: 'https://github.com/nuxt.png',
              }"
              size="md"
              color="neutral"
              variant="outline"
            >
              Red | 12oz
            </UBadge>
            <UBadge
              :avatar="{
                src: 'https://github.com/nuxt.png',
              }"
              size="md"
              color="neutral"
              variant="outline"
            >
              Red | 12oz
            </UBadge>
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
import { useProductSingleStore } from "~/store/ProductSingleStore";

const productDataStore = useProductSingleStore();
const route = useRoute();

const product = computed(() => productDataStore.product);
const quantity = ref(1);

onMounted(async () => {
  await productDataStore.getProduct(route.params.product_slug as string);
});

const items = [
  "https://picsum.photos/640/640?random=1",
  "https://picsum.photos/640/640?random=2",
  "https://picsum.photos/640/640?random=3",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
];
</script>
