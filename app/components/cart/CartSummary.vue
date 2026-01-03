<template>
  <h3 class="font-bold text-xl mb-4">Cart Summary</h3>
  <div class="px-4 py-8 rounded-lg border border-accented">
    <ul v-if="cart.length" class="flex flex-col gap-1">
      <li class="flex gap-4 justify-between items-center">
        <p>Sub Total</p>
        <p class="font-bold">
          {{ formatter.formatNumber(subtotal) }}
          <span class="text-xs text-neutral">PHP</span>
        </p>
      </li>
      <li class="flex gap-4 justify-between items-center">
        <p>Discount (0%)</p>
        <p class="font-bold">
          {{ formatter.formatNumber(discount) }}
          <span class="text-xs text-neutral">PHP</span>
        </p>
      </li>
      <li class="flex gap-4 justify-between items-center">
        <p>Delivery fee</p>
        <p class="font-bold">
          {{ formatter.formatNumber(shippingFee) }}
          <span class="text-xs text-neutral">PHP</span>
        </p>
      </li>
    </ul>
    <USeparator class="my-4" />
    <ul v-if="cart.length" class="flex flex-col gap-1">
      <li class="flex gap-4 justify-between items-center">
        <p>Total</p>
        <p class="font-bold text-lg text-primary">
          {{ formatter.formatNumber(total) }}
          <span class="text-xs text-neutral">PHP</span>
        </p>
      </li>
    </ul>
    <UButton
      to="/checkout"
      label="Proceed to Checkout"
      class="flex justify-center w-full mt-8"
      size="xl"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/Cart.store";
const cartStore = useCartStore();
const formatter = useFormatter();

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
