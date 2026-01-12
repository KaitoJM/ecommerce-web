import { defineStore } from "pinia";
import { useCartStore } from "./Cart.store";
import type { CartPayload } from "~/types/Cart.type";

export const useOrderStore = defineStore("orderStore", () => {
  const cartStore = useCartStore();
  const email = ref<string>("");

  const items = computed<Array<CartPayload>>(() => {
    let orderItems: Array<CartPayload> = [];

    cartStore.carts.forEach((cartItem, indx) => {
      if (cartItemIndexes.value.includes(indx)) {
        orderItems.push(cartItem);
      }
    });

    return orderItems;
  });

  const cartItemIndexes = ref<Array<number>>([]);

  const setEmail = (emailValue: string) => {
    email.value = emailValue;
  };

  const addCartItemIndex = (indx: number) => {
    cartItemIndexes.value.push(indx);
  };

  const deleteCaertItemIndex = (indx: number) => {
    cartItemIndexes.value.splice(cartItemIndexes.value.indexOf(indx), 1);
  };

  const clearItemIndexes = () => {
    cartItemIndexes.value = [];
  };

  return {
    email,
    setEmail,
    items,
    cartItemIndexes,
    addCartItemIndex,
    deleteCaertItemIndex,
    clearItemIndexes,
  };
});
