import { defineStore } from "pinia";
import type { CartPayload } from "~/types/Cart.type";

export const useCartStore = defineStore("cartStore", () => {
  const cartComposable = useCart();

  const carts = ref<Array<CartPayload>>([]);

  const loadCart = async () => {
    carts.value = await cartComposable.loadCart();
  };

  const addToCart = async (params: CartPayload) => {
    await cartComposable.addToCart(params);
    loadCart();
  };

  const removeItemFromCart = (productId: string, specificationId: string) => {
    cartComposable.removeItemFromCart(productId, specificationId);
    loadCart();
  };

  const updateQuantity = (
    productId: string,
    specificationId: string,
    quantity: number
  ) => {
    cartComposable.updateQuantity(productId, specificationId, quantity);
  };

  return {
    carts,
    loadCart,
    addToCart,
    removeItemFromCart,
    updateQuantity,
  };
});
