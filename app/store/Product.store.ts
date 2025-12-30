import type { FetchError } from "ofetch";
import { defineStore } from "pinia";
import type { ArrowLink, PageMeta } from "~/components/Pagination.vue";
import type { ApiError, ApiPaginated } from "~/types/ApiResponses.type";
import type { Product } from "~/types/Product.type";
import { useSearchProductParamsStore } from "./SearchProductParams.store";

export const useProductStore = defineStore("productStore", () => {
  const config = useRuntimeConfig();
  const searchStore = useSearchProductParamsStore();
  const pageMeta = ref<PageMeta>({
    current_page: 1,
    from: 0,
    last_page: 1,
    per_page: 10,
    to: 0,
    total: 0,
    links: [
      {
        url: null,
        label: "",
        active: false,
        page: 1,
      },
    ],
  });

  const links = ref<ArrowLink>({
    first: null,
    last: null,
    prev: null,
    next: null,
  });

  const fetching = ref<boolean>(false);
  const products = ref<Product[]>([]);

  const getProducts = async (paginationParams?: {
    page: number;
    per_page?: number;
  }): Promise<ApiPaginated<Product>> => {
    fetching.value = true;

    let pageQuery;
    if (paginationParams) {
      pageQuery = `?page=${paginationParams.page}`;
      if (paginationParams.per_page) {
        pageQuery += `&per_page=${paginationParams.per_page}`;
      }
    } else {
      pageQuery = `?page=1`;
    }

    if (searchStore.searchQuery) {
      pageQuery += pageQuery
        ? `&search=${searchStore.searchQuery}`
        : `?search=${searchStore.searchQuery}`;
    }

    if (searchStore.categories?.length) {
      pageQuery += pageQuery
        ? `&categories=${searchStore.categories.join(",")}`
        : `?categories=${searchStore.categories.join(",")}`;
    }

    if (searchStore.priceMin) {
      pageQuery += pageQuery
        ? `&price_min=${searchStore.priceMin}`
        : `?price_min=${searchStore.priceMin}`;
    }

    if (searchStore.priceMax) {
      pageQuery += pageQuery
        ? `&price_max=${searchStore.priceMax}`
        : `?price_max=${searchStore.priceMax}`;
    }

    try {
      const res: ApiPaginated<Product> = await $fetch(
        `${config.public.apiBase}/site/products${pageQuery}`
      );

      products.value = res.data;
      pageMeta.value = res.meta;
      links.value = res.links;

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

      console.error(`Failed to fetch products:`, error);
      throw apiError;
    } finally {
      fetching.value = false;
    }
  };

  return {
    products,
    fetching,
    pageMeta,
    links,
    getProducts,
  };
});
