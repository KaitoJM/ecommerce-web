import type { CartPayload } from "~/types/Cart.type";

export const useCartLocal = () => {
  const getCart = (): Array<CartPayload> => {
    const cartsJson = localStorage.getItem("carts");
    if (cartsJson) {
      return JSON.parse(cartsJson) as CartPayload[];
    }
    return [];
  };

  const setCart = (carts: Array<CartPayload>) => {
    localStorage.setItem("carts", JSON.stringify(carts));
  };

  const checkCartExists = (productId: string, specificationId: string) => {
    const carts = getCart();

    return carts.some(
      (cart) =>
        cart.productId === productId && cart.specificationId === specificationId
    );
  };

  // add cart to local storage
  const add = (params: CartPayload) => {
    let carts: Array<CartPayload> = getCart();
    if (checkCartExists(params.productId, params.specificationId)) {
      carts = carts.map((cart) => {
        if (
          cart.productId === params.productId &&
          cart.specificationId === params.specificationId
        ) {
          return {
            ...cart,
            quantity: cart.quantity + params.quantity,
          };
        }
        return cart;
      });
      setCart(carts);
      return;
    }

    carts.push(params);
    setCart(carts);
  };

  const remove = (productId: string, specificationId: string) => {
    let carts: Array<CartPayload> = getCart();

    carts = carts.filter(
      (cart) =>
        !(
          cart.productId === productId &&
          cart.specificationId === specificationId
        )
    );

    setCart(carts);
  };

  return {
    getCart,
    setCart,
    add,
    remove,
  };
};
