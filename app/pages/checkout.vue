<template>
  <UContainer>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1">
        <h1 class="text-3xl font-bold">Checkout</h1>
        <CustomerInformation class="mt-4" />
        <AddressInformation class="mt-4" />
        <ShippingInformation class="mt-4" />
        <PaymentInformation class="mt-4" />
      </div>
      <div class="flex-1 md:w-1/3">
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
</script>
