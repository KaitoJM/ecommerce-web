<template>
  <h3 class="font-bold text-xl mb-4">Order Summary</h3>

  <div class="flex flex-col gap-2 mb-4">
    <div
      v-for="(cartItem, cartItemIndex) in cart"
      :key="`order-summary-item-${cartItemIndex}-${cartItem.product.name}`"
      class="flex gap-4 justify-between py-2 px-4 border border-accented rounded-lg"
    >
      <div class="flex gap-2">
        <img
          :src="cartItem.product.thumbnail"
          alt="Product Image"
          class="w-8 h-8 object-cover rounded border border-accented"
        />
        <div>
          <p class="font-bold text-sm">
            {{ cartItem.product.name }}
            <span class="text-primary">x{{ cartItem.quantity }}</span>
          </p>
          <p class="text-xs text-gray-600">
            {{
              specificationComposable.formatSpecification(
                cartItem.specification.combination
              )
            }}
          </p>
        </div>
      </div>
      <p class="font-bold text-sm flex-1 text-right">
        {{ (cartItem.quantity * cartItem.specification.price).toFixed(2) }}
        PHP
      </p>
    </div>
  </div>

  <div class="px-4 py-8 rounded-lg border border-accented">
    <ul v-if="cart.length" class="flex flex-col gap-1">
      <li class="flex gap-4 justify-between items-center">
        <p>Sub Total</p>
        <p class="font-bold">{{ subtotal.toFixed(2) }} PHP</p>
      </li>
      <li class="flex gap-4 justify-between items-center">
        <p>Discount (0%)</p>
        <p class="font-bold">{{ discount.toFixed(2) }} PHP</p>
      </li>
      <li class="flex gap-4 justify-between items-center">
        <p>Delivery fee</p>
        <p class="font-bold">{{ shippingFee.toFixed(2) }} PHP</p>
      </li>
    </ul>
    <USeparator class="my-4" />
    <ul v-if="cart.length" class="flex flex-col gap-1">
      <li class="flex gap-4 justify-between items-center">
        <p>Total</p>
        <p class="font-bold text-lg text-primary">{{ total.toFixed(2) }} PHP</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/Cart.store";
const cartStore = useCartStore();
const specificationComposable = useSpecification();

const cart = computed(() => cartStore.carts);
const subtotal = computed(() => {
  let total = 0;

  cart.value.forEach((item) => {
    total += item.quantity * item.specification.price;
  });

  return total;
});

const discount = ref(0);
const shippingFee = ref(0);
const total = computed(() => {
  return subtotal.value - discount.value + shippingFee.value;
});

onMounted(() => {
  cartStore.loadCart();
});
</script>
