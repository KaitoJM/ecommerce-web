import { defineStore } from "pinia";
import type { CartPayload } from "~/types/Cart.type";

export const useOrderStore = defineStore("orderStore", () => {
  const email = ref<string>("");
  const items = ref<Array<CartPayload>>([]);

  const setEmail = (emailValue: string) => {
    email.value = emailValue;
  };

  const addItem = (item: CartPayload) => {
    items.value.push(item);
  };

  const updateItem = (item: CartPayload) => {
    const toBeUpdatedItem = checkExist(item);

    if (!toBeUpdatedItem) {
      return;
    }

    toBeUpdatedItem.quantity = item.quantity;
  };

  const deleteItem = (item: CartPayload) => {
    const toBeDeletedItem = checkExist(item);

    if (!toBeDeletedItem) {
      return;
    }

    items.value.splice(items.value.indexOf(toBeDeletedItem), 1);
  };

  const checkExist = (item: CartPayload): CartPayload | null => {
    const check: CartPayload | null =
      items.value.find(
        (i) =>
          i.productId == item.productId &&
          i.specificationId == item.specificationId
      ) || null;

    return check;
  };

  const clearItems = () => {
    items.value = [];
  };

  return {
    email,
    setEmail,
    items,
    addItem,
    updateItem,
    deleteItem,
    checkExist,
    clearItems,
  };
});
