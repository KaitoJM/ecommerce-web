import { useOrderStore } from "~/store/Order.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const orderStore = useOrderStore();

  if (!orderStore.items.length) {
    return navigateTo("/cart");
  }
});
