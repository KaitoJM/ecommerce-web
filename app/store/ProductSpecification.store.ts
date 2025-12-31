import type { FetchError } from "ofetch";
import type { ApiError, ApiSuccess } from "~/types/ApiResponses.type";
import type { Combination, ProductSpecification } from "~/types/Product.type";

export const useProductSpecificationStore = defineStore(
  "productSpecificationStore",
  () => {
    const config = useRuntimeConfig();
    const productSpecifications = ref<ProductSpecification[]>([]);

    const getProductSpecifications = async (
      producy_id: string
    ): Promise<ProductSpecification[]> => {
      try {
        const response: ApiSuccess<ProductSpecification[]> = await $fetch(
          `${config.public.apiBase}/site/product-specifications`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            query: {
              product_id: producy_id,
            },
          }
        );

        productSpecifications.value = response.data;
        return productSpecifications.value;
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

        console.error(`Failed to fetch product specifications:`, error);
        throw apiError;
      }
    };

    return {
      productSpecifications,
      getProductSpecifications,
    };
  }
);
