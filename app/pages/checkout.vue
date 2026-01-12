<template>
  <UContainer>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1">
        <h1 class="text-3xl font-bold">Checkout</h1>
        <CustomerInformation class="mt-4" />
        <AddressInformation class="mt-4" />
        <ShippingInformation class="mt-4" />
        <PaymentInformation class="mt-4" />
        <div class="mt-4 flex justify-end">
          <UButton
            :loading="loading"
            @click="checkout"
            size="xl"
            label="Procced To Payment"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <OrderSummary />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import AddressInformation from "~/components/checkout/AddressInformation.vue";
import CustomerInformation from "~/components/checkout/CustomerInformation.vue";
import OrderSummary from "~/components/checkout/OrderSummary.vue";
import PaymentInformation from "~/components/checkout/PaymentInformation.vue";
import ShippingInformation from "~/components/checkout/ShippingInformation.vue";
import { useAuthStore } from "~/store/Auth.store";
import { useCartStore } from "~/store/Cart.store";
import { useOrderStore } from "~/store/Order.store";
import type { ApiError } from "~/types/ApiResponses.type";

const auth = useAuthStore();
const cartComposable = useCart();
const cartlocal = useCartLocal();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const order = useOrder();
const toast = useToast();
const router = useRouter();

const loading = ref(false);

const checkout = async () => {
  loading.value = true;
  if (auth.isLoggedIn && auth.user?.user.email) {
    orderStore.setEmail(auth.user.user.email);
    createOrder();
  } else {
    createOrderAsGuest();
  }
};

const createOrder = async () => {
  try {
    const createdOrder = await order.addOrder({
      email: orderStore.email,
    });

    // reset cart and remove the converted ones
    cartStore.clearCart();

    router.push(`/order-summary/${createdOrder.id}`);
  } catch (error) {
    const apiError = error as ApiError;
    toast.add({
      title: "Error",
      description: apiError.message,
      icon: "i-lucide-octagon-x",
      color: "error",
    });
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const createOrderAsGuest = async () => {
  try {
    const createdOrder = await order.addOrderAsGuest({
      email: orderStore.email,
    });

    // reset cart and remove the converted ones
    cartStore.clearCart();

    router.push(`/order-summary/${createdOrder.id}`);
  } catch (error) {
    const apiError = error as ApiError;
    toast.add({
      title: "Error",
      description: apiError.message,
      icon: "i-lucide-octagon-x",
      color: "error",
    });
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
