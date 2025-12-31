import type { FetchError } from "ofetch";
import { defineStore } from "pinia";
import type { ApiError, ApiSuccess } from "~/types/ApiResponses.type";
import type { Product } from "~/types/Product.type";

export const useProductSingleStore = defineStore("productSingleStore", () => {
  const config = useRuntimeConfig();

  const fetching = ref<boolean>(false);
  const product = ref<Product>({
    id: "0",
    name: "",
    summary: "",
    description: "",
    published: "",
    categories: [],
    brand_id: "",
    created_at: "",
  });

  const getProduct = async (slug: string): Promise<ApiSuccess<Product>> => {
    fetching.value = true;

    try {
      const res: ApiSuccess<Product> = await $fetch(
        `${config.public.apiBase}/site/products/${slug}`
      );

      product.value = res.data;
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

      console.error(`Failed to fetch product detail:`, error);
      throw apiError;
    } finally {
      fetching.value = false;
    }
  };

  return {
    product,
    fetching,
    getProduct,
  };
});
