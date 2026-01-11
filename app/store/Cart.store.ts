import { defineStore } from "pinia";
import type { CartPayload } from "~/types/Cart.type";
import { useAuthStore } from "./Auth.store";
import type { ProductSpecification } from "~/types/Product.type";

export const useCartStore = defineStore("cartStore", () => {
  const cartComposable = useCart();
  const cartLocal = useCartLocal();
  const auth = useAuthStore();

  const carts = ref<Array<CartPayload>>([]);

  const loadCart = async () => {
    if (!auth.isLoggedIn) {
      carts.value = cartLocal.getCart();
    } else {
      const cartId = await cartComposable.getActiveCart();
      carts.value = await cartComposable.getCartItems(cartId.id);
    }
  };

  const checkStock = (
    specification: ProductSpecification,
    quantity: number
  ) => {
    return specification.stock >= quantity;
  };

  const addToCart = async (params: CartPayload) => {
    if (!auth.isLoggedIn) {
      if (!checkStock(params.specification, params.quantity)) {
        throw new Error("Insufficient stock for the selected specification.");
      }

      console.log("Adding to cart:", params);
      cartLocal.add(params);
    } else {
      await cartComposable.addCartItem(params);
    }
    loadCart();
  };

  const removeItemFromCart = async (
    productId: string,
    specificationId: string
  ) => {
    const item = carts.value.find(
      (i) =>
        i.product.id === productId && i.specification.id === specificationId
    );

    if (!item) return;

    if (!auth.isLoggedIn) {
      cartLocal.remove(productId, specificationId);
    } else if (item.id) {
      await cartComposable.deleteCartItem(item.id);
      loadCart();
    }
  };

  const updateQuantity = async (
    productId: string,
    specificationId: string,
    quantity: number
  ) => {
    const item = carts.value.find(
      (i) =>
        i.product.id === productId && i.specification.id === specificationId
    );

    if (!item) return;

    if (!auth.isLoggedIn) {
      item.quantity = quantity;
      cartLocal.setCart(carts.value);
    } else if (item.id) {
      await cartComposable.updateCartItem(item.id, {
        quantity: quantity,
      });
      loadCart();
    }
  };

  return {
    carts,
    loadCart,
    addToCart,
    removeItemFromCart,
    updateQuantity,
  };
});
