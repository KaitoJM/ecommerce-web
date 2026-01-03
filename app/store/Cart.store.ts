import { defineStore } from "pinia";
import type { CartPayload } from "~/types/Cart.type";
import type { ProductSpecification } from "~/types/Product.type";

export const useCartStore = defineStore("cartStore", () => {
  const cartLocal = useCartLocal();

  const carts = ref<Array<CartPayload>>([]);

  const loadCart = () => {
    carts.value = cartLocal.getCart();
  };

  const checkStock = (
    specification: ProductSpecification,
    quantity: number
  ) => {
    return specification.stock >= quantity;
  };

  const addToCart = (params: CartPayload) => {
    if (!checkStock(params.specification, params.quantity)) {
      throw new Error("Insufficient stock for the selected specification.");
    }

    console.log("Adding to cart:", params);
    cartLocal.add(params);
    loadCart();
  };

  const removeItemFromCart = (productId: string, specificationId: string) => {
    cartLocal.remove(productId, specificationId);
    loadCart();
  };

  const updateQuantity = (
    productId: string,
    specificationId: string,
    quantity: number
  ) => {
    const item = carts.value.find(
      (i) =>
        i.product.id === productId && i.specification.id === specificationId
    );

    if (!item) return;

    item.quantity = quantity;
    cartLocal.setCart(carts.value);
  };

  return {
    carts,
    loadCart,
    addToCart,
    removeItemFromCart,
    updateQuantity,
  };
});
