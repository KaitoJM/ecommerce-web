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
      <div class="w-80">
        <template v-if="cart.length === 0">
          <UEmpty
            class="p-4"
            variant="naked"
            icon="i-lucide-shopping-cart"
            title="Your cart is empty"
            description="It looks like you haven't added any items in your cart yet."
          />
        </template>
        <template v-else>
          <ul class="p-4 flex flex-col gap-1 max-h-100 overflow-auto">
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
                  <span class="text-primary text-sm font-bold">
                    {{
                      formatter.formatNumber(
                        cartItem.quantity * cartItem.specification.price
                      )
                    }}
                    <span class="text-xs text-neutral">PHP</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div class="p-4 flex flex-col gap-1">
            <UButton
              @click="close"
              to="/cart"
              label="View Cart"
              color="primary"
              class="w-full flex justify-center"
              variant="outline"
            />
            <UButton
              @click="
                handleCheckout();
                close();
              "
              label="Proceed to Checkout"
              color="primary"
              class="w-full flex justify-center"
            />
          </div>
        </template>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/Cart.store";
import { useOrderStore } from "~/store/Order.store";

const cartStore = useCartStore();
const orderStore = useOrderStore();
const specificationComposable = useSpecification();
const formatter = useFormatter();
const router = useRouter();

const cart = computed(() => cartStore.carts);

onMounted(() => {
  cartStore.loadCart();
});

const handleRemoveItemClick = (productId: string, specificationId: string) => {
  cartStore.removeItemFromCart(productId, specificationId);
};

const handleCheckout = () => {
  orderStore.clearItems();
  cart.value.forEach((item) => {
    orderStore.addItem(item);
  });

  router.push("/checkout");
};
</script>
