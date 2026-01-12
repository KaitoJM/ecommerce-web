import { useOrderStore } from "~/store/Order.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const orderStore = useOrderStore();

  if (!orderStore.cartItemIndexes.length) {
    return navigateTo("/cart");
  }
});
