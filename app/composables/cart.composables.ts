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

  const getActiveCartGuest = async (): Promise<CartObject> => {
    try {
      const res: CartObject = await $fetch(
        `${config.public.apiBase}/site/carts-active-guest`
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
        product_specification_id: string;
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
        specificationId: item.product_specification_id,
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

  const deleteCartItem = async (cartItemId: string) => {
    try {
      const res = await $fetch(
        `${config.public.apiBase}/site/cart-items/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            Accept: "application/json",
          },
        }
      );
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

      console.error(`Failed to delete cart item:`, error);
      throw apiError;
    }
  };

  const updateCartItem = async (
    cartItemId: string,
    params: {
      quantity?: number;
      product_id?: string;
      product_specification_id?: string;
    }
  ) => {
    try {
      const res: Array<{
        id: string;
        product_id: string;
        product: Product;
        specification_id: string;
        specification: ProductSpecification;
        quantity: number;
      }> = await $fetch(
        `${config.public.apiBase}/site/cart-items/${cartItemId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            Accept: "application/json",
          },
          body: params,
        }
      );
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

      console.error(`Failed to modify cart item:`, error);
      throw apiError;
    }
  };

  return {
    getActiveCart,
    getActiveCartGuest,
    getCartItems,
    addCartItem,
    deleteCartItem,
    updateCartItem,
  };
};
