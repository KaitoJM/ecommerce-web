import { defineStore } from "pinia";

export interface SelectedCategory {
  value: string;
  label: string;
}

export const useSearchProductParamsStore = defineStore(
  "searchProductParams",
  () => {
    // search
    const searchQuery = ref("");
    const setSearchQuery = (query: string) => {
      searchQuery.value = query;
    };
    const searchedKey = ref("");
    const updateSearchedKey = () => {
      searchedKey.value = searchQuery.value;
    };

    // categories
    const categories = ref<SelectedCategory[]>([]);
    const setCategories = (category: SelectedCategory) => {
      if (categories.value.includes(category)) return;
      categories.value.push(category);
    };

    const updateCategories = (newCategories: SelectedCategory[]) => {
      categories.value = newCategories;
    };

    const selectedCategoryIds = computed<string[]>(() => {
      return categories.value.map((cat) => cat.value);
    });

    // price range
    const priceMin = ref(0);
    const priceMax = ref(0);
    const setPriceRange = (min: number, max: number) => {
      priceMin.value = min;
      priceMax.value = max;
    };

    return {
      searchQuery,
      setSearchQuery,
      searchedKey,
      updateSearchedKey,
      categories,
      selectedCategoryIds,
      setCategories,
      updateCategories,
      priceMin,
      priceMax,
      setPriceRange,
    };
  }
);
