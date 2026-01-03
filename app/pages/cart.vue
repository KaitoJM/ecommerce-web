<template>
  <UContainer>
    <div class="flex gap-8">
      <div class="flex-1">
        <h1 class="text-3xl font-bold">Shopping Cart</h1>
        <table class="w-full mt-8">
          <thead>
            <tr>
              <th class="text-left text-xs uppercase p-2">Product</th>
              <th class="text-left text-xs uppercase p-2">Qty</th>
              <th class="text-left text-xs uppercase p-2">Total</th>
              <th class="text-right text-xs uppercase p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(cartItem, cartItemIndex) in cart"
              :key="`cart-item-table-${cartItemIndex}-${cartItem.product.name}`"
            >
              <td class="w-[50%] border-t border-accented border-dashed p-2">
                <div class="flex gap-4 w-full items-center">
                  <img
                    :src="cartItem.product.thumbnail"
                    alt="Product Image"
                    class="w-12 h-12 object-cover rounded border border-accented"
                  />
                  <div>
                    <p class="font-bold">{{ cartItem.product.name }}</p>
                    <p class="text-sm text-gray-600">
                      {{
                        specificationComposable.formatSpecification(
                          cartItem.specification.combination
                        )
                      }}
                    </p>
                    <p class="text-sm text-primary font-bold">
                      {{ cartItem.specification.price }} PHP
                    </p>
                  </div>
                </div>
              </td>
              <td class="w-2/12 border-t border-accented border-dashed p-2">
                <UInputNumber
                  :min="1"
                  v-model="cartItem.quantity"
                  @update:model-value="
                    (value) =>
                      cartStore.updateQuantity(
                        cartItem.product.id,
                        cartItem.specification.id,
                        value as number
                      )
                  "
                />
              </td>
              <td class="w-2/12 border-t border-accented border-dashed p-2">
                <p>
                  {{
                    (cartItem.quantity * cartItem.specification.price).toFixed(
                      2
                    )
                  }}
                  PHP
                </p>
              </td>
              <td class="w-1/12 border-t border-accented border-dashed p-2">
                <div class="flex justify-end gap-2">
                  <UButton
                    icon="i-lucide-trash"
                    variant="ghost"
                    size="sm"
                    color="error"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
        suscipit iure harum necessitatibus, non soluta tenetur. Excepturi
        voluptatibus animi in tempora ullam temporibus inventore atque sequi?
        Tempora exercitationem velit provident!
      </div>
    </div>
  </UContainer>
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
