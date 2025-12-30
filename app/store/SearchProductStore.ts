export const useSearchProductStore = defineStore("searchProduct", () => {
  // search
  const searchQuery = ref("");
  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  // categories
  const categories = ref<string[]>([]);
  const setCategories = (category: string) => {
    if (categories.value.includes(category)) return;
    categories.value.push(category);
  };

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
    setCategories,
    priceMin,
    priceMax,
    setPriceRange,
  };
});
