import { useAuthStore } from "~/store/Auth.store";

export default defineNuxtPlugin(() => {
  const auth = useAuthStore();
  auth.hydrate();
});
