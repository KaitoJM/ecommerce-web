import type { FetchError } from "ofetch";
import type { ApiError } from "~/types/ApiResponses.type";
import type { Order } from "~/types/Order.type";

export interface OrderParams {
  cart_id: string;
  email: string;
}

export const useOrder = () => {
  const config = useRuntimeConfig();

  const addOrder = async (params: OrderParams): Promise<Order> => {
    try {
      const res: Order = await $fetch(`${config.public.apiBase}/site/orders`, {
        method: "POST",
        body: params,
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

  return {
    addOrder,
  };
};
