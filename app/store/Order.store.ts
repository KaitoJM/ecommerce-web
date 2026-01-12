import { defineStore } from "pinia";

export const useOrderStore = defineStore("orderStore", () => {
  const email = ref<string>("");

  const setEmail = (emailValue: string) => {
    email.value = emailValue;
  };

  return {
    email,
    setEmail,
  };
});
