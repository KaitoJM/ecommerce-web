<template>
  <div>
    <h4 class="text-xs font-bold uppercase">Shipping</h4>
    <div class="border border-dashed border-accented rounded-lg p-4 mt-2">
      <p class="text-xs mb-2">Select your desired courier</p>
      <div class="flex flex-wrap gap-2">
        <button
          @click="shipping = courier.code"
          v-for="courier in couriers"
          :key="`courier-select-${courier.code}`"
          :class="[
            'border rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer',
            shipping == courier.code
              ? 'border-primary border-2'
              : 'border-accented',
          ]"
        >
          <img class="h-10" :src="courier.logo" />
        </button>
      </div>
      <p class="text-xs mt-4">Or pick it up on store instead.</p>
      <UButton
        @click="shipping = 'pickup'"
        label="Store Pickup"
        class="mt-2"
        :variant="shipping == 'pickup' ? 'solid' : 'outline'"
        icon="i-lucide-store"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const shipping = ref("lbc");
const couriers = ref<Array<{ name: string; logo: string; code: string }>>([
  {
    name: "LBC",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/LBC_Express_2013_Logo.svg/1200px-LBC_Express_2013_Logo.svg.png",
    code: "lbc",
  },
  {
    name: "Flash Express",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flash_Express_Logo.svg/1280px-Flash_Express_Logo.svg.png",
    code: "flash",
  },
  {
    name: "Ninja Van",
    logo: "https://1000logos.net/wp-content/uploads/2022/08/Ninja-Van-Logo.png",
    code: "ninja",
  },
]);
</script>
