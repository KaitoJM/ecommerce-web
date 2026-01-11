import type { FetchError } from "ofetch";
import { useAuthStore } from "~/store/Auth.store";
import type { ApiError } from "~/types/ApiResponses.type";
import type { CartPayload } from "~/types/Cart.type";
import type { Product, ProductSpecification } from "~/types/Product.type";
import type { Customer } from "~/types/User.type";

export interface CartObject {
  id: string;
  customer_id: string;
  status: string;
}

export const useCart = () => {
  const auth = useAuthStore();
  const config = useRuntimeConfig();
  const cartLocal = useCartLocal();

  const activeCart = ref<CartObject>({
    id: "",
    customer_id: "",
    status: "",
  });

  const getActiveCart = async (): Promise<CartObject> => {
    try {
      const res: CartObject = await $fetch(
        `${config.public.apiBase}/site/carts-active`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            Accept: "application/json",
          },
        }
      );

      activeCart.value = res;
      return res;
    } catch (error) {
      const fetchError = error as FetchError<any>;

      const apiError: ApiError = {
        message:
          fetchError.data?.message ??
          fetchError.message ??
          "Something went wrong",
        errors: fetchError.data?.errors,
        statusCode: fetchError.status,
      };

      console.error(`Failed to fetch active cart:`, error);
      throw apiError;
    }
  };

  const getCartItems = async (cartId: string): Promise<Array<CartPayload>> => {
    try {
      const res: Array<{
        id: string;
        product_id: string;
        product: Product;
        specification_id: string;
        specification: ProductSpecification;
        quantity: number;
      }> = await $fetch(
        `${config.public.apiBase}/site/cart-items?cart_id=${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            Accept: "application/json",
          },
        }
      );

      return res.map((item) => ({
        ...item,
        productId: item.product_id,
        specificationId: item.specification_id,
      }));
    } catch (error) {
      const fetchError = error as FetchError<any>;

      const apiError: ApiError = {
        message:
          fetchError.data?.message ??
          fetchError.message ??
          "Something went wrong",
        errors: fetchError.data?.errors,
        statusCode: fetchError.status,
      };

      console.error(`Failed to fetch cart items:`, error);
      throw apiError;
    }
  };

  const addCartItem = async (params: CartPayload) => {
    try {
      const res: Array<{
        id: string;
        product_id: string;
        product: Product;
        specification_id: string;
        specification: ProductSpecification;
        quantity: number;
      }> = await $fetch(`${config.public.apiBase}/site/cart-items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
        },
        body: {
          cart_id: activeCart.value.id,
          product_id: params.productId,
          product_specification_id: params.specificationId,
          qty: params.quantity,
        },
      });
    } catch (error) {
      const fetchError = error as FetchError<any>;

      const apiError: ApiError = {
        message:
          fetchError.data?.message ??
          fetchError.message ??
          "Something went wrong",
        errors: fetchError.data?.errors,
        statusCode: fetchError.status,
      };

      console.error(`Failed to add cart item:`, error);
      throw apiError;
    }
  };

  const loadCart = async (): Promise<Array<CartPayload>> => {
    if (!auth.isLoggedIn) {
      return cartLocal.getCart();
    } else {
      const cartId = await getActiveCart();
      return await getCartItems(cartId.id);
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
      await addCartItem(params);
    }
  };

  const removeItemFromCart = (productId: string, specificationId: string) => {
    cartLocal.remove(productId, specificationId);
  };

  const updateQuantity = (
    productId: string,
    specificationId: string,
    quantity: number
  ) => {
    const carts = cartLocal.getCart();
    const item = carts.find(
      (i) =>
        i.product.id === productId && i.specification.id === specificationId
    );

    if (!item) return;

    item.quantity = quantity;
    cartLocal.setCart(carts);
  };

  return { loadCart, addToCart, removeItemFromCart, updateQuantity };
};
