import type { FetchError } from "ofetch";
import { useAuthStore } from "~/store/Auth.store";
import { useCartStore } from "~/store/Cart.store";
import type { ApiError } from "~/types/ApiResponses.type";
import type { Order } from "~/types/Order.type";

export interface OrderParams {
  email: string;
}

export const useOrder = () => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const cart = useCartStore();

  const addOrder = async (params: OrderParams): Promise<Order> => {
    try {
      const res: Order = await $fetch(`${config.public.apiBase}/site/orders`, {
        method: "POST",
        body: {
          ...params,
          items: cart.carts.map((cart) => ({
            product_id: cart.productId,
            product_specification_id: cart.specificationId,
            quantity: cart.quantity,
          })),
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
        },
      });

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

      console.error(`Failed to process order:`, error);
      throw apiError;
    }
  };

  const addOrderAsGuest = async (params: OrderParams): Promise<Order> => {
    try {
      const res: Order = await $fetch(
        `${config.public.apiBase}/site/order-guest`,
        {
          method: "POST",
          body: {
            ...params,
            items: cart.carts.map((cart) => ({
              product_id: cart.productId,
              product_specification_id: cart.specificationId,
              quantity: cart.quantity,
            })),
          },
        }
      );

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

      console.error(`Failed to process order:`, error);
      throw apiError;
    }
  };

  return {
    addOrder,
    addOrderAsGuest,
  };
};
