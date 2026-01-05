<template>
  <div>
    <h4 class="text-xs font-bold uppercase">Delivery Address</h4>
    <div class="border border-dashed border-accented rounded-lg p-4 mt-2">
      <form v-if="!isLoggedIn" class="my-4">
        <UFormField label="Country">
          <UInput placeholder="Philippines" class="w-full" />
        </UFormField>
        <UFormField label="State" class="mt-2">
          <UInput placeholder="Samar" class="w-full" />
        </UFormField>
        <UFormField label="City / Municipality" class="mt-2">
          <UInput placeholder="Calbayog" class="w-full" />
        </UFormField>
        <UFormField label="Brgy" class="mt-2">
          <UInput placeholder="Amampacang" class="w-full" />
        </UFormField>
        <UFormField label="Street" class="mt-2">
          <UInput placeholder="Maharlika Highway" class="w-full" />
        </UFormField>
        <UFormField label="Postal Code" class="mt-2">
          <UInput placeholder="7610" class="w-full" />
        </UFormField>
      </form>
      <div v-else>
        <div class="flex gap-8">
          <div class="flex gap-2">
            <UIcon name="i-lucide-map-pin" class="mt-1" />
            <div>
              <p class="font-bold flex gap-2 items-center">
                Home Address
                <UBadge label="default" variant="outline" size="sm" />
              </p>
              <p class="text-sm">
                Purok 1 <br />
                Brgy. Amampacang, <br />
                Tinambacan District <br />
                Calbayog City, <br />
                Samar, 6710
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <UIcon name="i-lucide-map-pin" class="mt-1" />
            <div>
              <p class="font-bold flex gap-2 items-center">Office Address</p>
              <p class="text-sm">
                Purok 1 <br />
                Brgy. Amampacang, <br />
                Tinambacan District <br />
                Calbayog City, <br />
                Samar, 6710
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <UButton label="Add Address" icon="i-lucide-plus" variant="outline" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/Auth.store";

const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
</script>
