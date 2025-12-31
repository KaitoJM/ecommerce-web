import type { FetchError } from "ofetch";
import type { ApiError, ApiSuccess } from "~/types/ApiResponses.type";
import type { ProductImage } from "~/types/Product.type";

export const useProductImageStore = defineStore("productImageStore", () => {
  const config = useRuntimeConfig();
  const productImages = ref<ProductImage[]>([]);

  const getProductImages = async (
    productId: string
  ): Promise<ProductImage[]> => {
    try {
      const response: ApiSuccess<ProductImage[]> = await $fetch(
        `${config.public.apiBase}/site/product-images`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          query: {
            product_id: productId,
          },
        }
      );

      productImages.value = response.data;
      return response.data;
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

      console.error(`Failed to fetch product images:`, error);
      throw apiError;
    }
  };

  return {
    productImages,
    getProductImages,
  };
});
