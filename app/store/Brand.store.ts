import type { FetchError } from "ofetch";
import type { ArrowLink, PageMeta } from "~/components/Pagination.vue";
import type {
  ApiError,
  ApiPaginated,
  ApiSuccess,
} from "~/types/ApiResponses.type";
import { defineStore } from "pinia";
import type { Brand } from "~/types/Brand.type";

export const useBrandStore = defineStore("brandStore", () => {
  const config = useRuntimeConfig();
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
  const brands = ref<Brand[]>([]);

  const getBrands = async (): Promise<ApiPaginated<Brand>> => {
    fetching.value = true;

    let pageQuery = "?page=1&per_page=100";

    try {
      const res: ApiPaginated<Brand> = await $fetch(
        `${config.public.apiBase}/site/brands${pageQuery}`
      );

      brands.value = res.data;
      pageMeta.value = res.meta;
      fetching.value = false;
      links.value = res.links;

      return res;
    } catch (error) {
      fetching.value = false;
      const fetchError = error as FetchError<any>;

      const apiError: ApiError = {
        message:
          fetchError.data?.message ??
          fetchError.message ??
          "Something went wrong",
        errors: fetchError.data?.errors,
        statusCode: fetchError.status,
      };

      console.error(`Failed to fetch brands:`, error);
      throw apiError;
    }
  };

  return {
    brands,
    fetching,
    pageMeta,
    links,
    getBrands,
  };
});
