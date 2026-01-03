<template>
  <UPopover
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <UChip :text="cart.length" size="3xl" color="error">
      <UButton icon="i-lucide-shopping-cart" variant="ghost" size="xl" />
    </UChip>

    <template #content="{ close }">
      <div class="p-4 w-80">
        <template v-if="cart.length === 0">
          <UEmpty
            variant="naked"
            icon="i-lucide-shopping-cart"
            title="Your cart is empty"
            description="It looks like you haven't added any items in your cart yet."
          />
        </template>
        <template v-else>
          <ul class="flex flex-col gap-1">
            <li
              class="flex gap-2 items-center"
              v-for="(cartItem, cartIndex) in cart"
              :key="`cart-item-pop-${cartIndex}-${cartItem.product.name}`"
            >
              <img
                :src="cartItem.product.thumbnail"
                alt="Product Image"
                class="w-12 h-12 object-cover rounded border border-accented"
              />
              <div class="flex-1">
                <div class="flex gap-4 items-center justify-between">
                  <p class="font-bold text-xs flex-1">
                    {{ cartItem.product.name }}
                    <span class="font-normal opacity-50">{{
                      specificationComposable.formatSpecification(
                        cartItem.specification.combination
                      )
                    }}</span>
                  </p>
                  <UButton
                    @click="
                      handleRemoveItemClick(
                        cartItem.productId,
                        cartItem.specificationId
                      )
                    "
                    icon="i-lucide-x"
                    variant="ghost"
                    size="sm"
                    color="error"
                  />
                </div>
                <div class="flex gap-4 items-center justify-between">
                  <span class="text-xs">QTY: {{ cartItem.quantity }}</span>
                  <span class="text-primary text-sm font-bold"
                    >{{
                      (
                        cartItem.quantity * cartItem.specification.price
                      ).toFixed(2)
                    }}
                    PHP</span
                  >
                </div>
              </div>
            </li>
          </ul>
          <UButton
            @click="close"
            to="/cart"
            label="View Cart"
            color="primary"
            class="w-full mt-4 flex justify-center"
          />
        </template>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/Cart.store";

const cartStore = useCartStore();
const specificationComposable = useSpecification();

const cart = computed(() => cartStore.carts);

onMounted(() => {
  cartStore.loadCart();
});

const handleRemoveItemClick = (productId: string, specificationId: string) => {
  cartStore.removeItemFromCart(productId, specificationId);
};
</script>
