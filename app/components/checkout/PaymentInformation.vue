<template>
  <div>
    <h4 class="text-xs font-bold uppercase">Payment</h4>
    <div class="border border-dashed border-accented rounded-lg p-4 mt-2">
      <URadioGroup v-model="value" :items="items" />
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  "Cash on delivery",
  "Pay on store pickup",
  "Pay with Paymongo",
]);
const value = ref("Cash on delivery");
</script>
