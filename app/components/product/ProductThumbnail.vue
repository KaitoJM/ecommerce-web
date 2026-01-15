<template>
  <div>
    <nuxt-link :to="`/product/${data.id}`">
      <NuxtImg
        :src="data.thumbnail"
        :alt="data.name"
        format="webp"
        class="aspect-4/3 w-full object-contain rounded-lg mb-2 bg-neutral-50 p-2"
        :custom="true"
        v-slot="{ src, isLoaded, imgAttrs }"
      >
        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
        <img
          v-else
          :src="`https://placehold.co/400x300?text=Loading...`"
          class="aspect-4/3 w-full object-contain rounded-lg mb-2 bg-neutral-50 p-2"
          alt="placeholder"
        />
      </NuxtImg>
    </nuxt-link>
    <UTooltip :text="data.name">
      <nuxt-link
        :to="`/product/${data.id}`"
        class="font-bold text-sm max-w-full truncate block hover:text-primary"
      >
        {{ data.name }}
      </nuxt-link>
    </UTooltip>
    <p class="text-gray-600 mb-2 text-xs h-8 max-h-8 multi-line-ellipsis mb-4">
      {{ data.summary }}
    </p>
    <span class="text-primary font-bold block my-2">
      {{ formatter.formatNumber(data.specification.price) }}
      <span class="text-xs text-neutral">PHP</span>
    </span>
    <div class="flex flex-col items-center justify-between gap-1">
      <UButton
        :loading="loading"
        @click="handleAddToCart"
        label="Add to Cart"
        color="primary"
        variant="outline"
        class="w-full flex justify-center"
      />
      <UButton
        @click="handleBuyNow(data)"
        label="Buy Now"
        color="primary"
        class="w-full flex justify-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/Cart.store";
import { useOrderStore } from "~/store/Order.store";
import type { ApiError } from "~/types/ApiResponses.type";
import type { CartPayload } from "~/types/Cart.type";
import type { Product } from "~/types/Product.type";

const props = defineProps<{
  data: Product;
}>();

const formatter = useFormatter();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const toast = useToast();
const router = useRouter();

const loading = ref(false);

const handleAddToCart = async () => {
  loading.value = true;
  try {
    await cartStore.addToCart({
      productId: props.data.id as string,
      product: props.data as Product,
      specificationId: props.data.specification.id as string,
      specification: props.data.specification,
      quantity: 1,
    });

    toast.add({
      title: "Added to Cart",
      description: `This prodfuct has been added to your cart.`,
      icon: "i-lucide-check-circle",
    });
  } catch (error) {
    const apiError = error as ApiError;
    toast.add({
      title: "Error",
      description: apiError.message,
      icon: "i-lucide-octagon-x",
      color: "error",
    });
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleBuyNow = (product: Product) => {
  orderStore.clearItems();

  orderStore.addItem({
    productId: product.id,
    product: product,
    specificationId: product.specification.id,
    specification: product.specification,
    quantity: 1,
  });

  router.push("/checkout");
};
</script>
