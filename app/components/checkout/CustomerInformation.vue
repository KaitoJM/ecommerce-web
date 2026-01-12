<template>
  <div>
    <h4 class="text-xs font-bold uppercase">Personal Information</h4>
    <div class="border border-dashed border-accented rounded-lg p-4 mt-2">
      <template v-if="!isLoggedIn">
        <UTabs
          color="neutral"
          variant="link"
          :ui="{ trigger: 'grow' }"
          :items="tabItems"
          class="w-full"
        >
          <template #guest="{ item }">
            <form class="my-8">
              <UFormField label="Email">
                <UInput
                  v-model="email"
                  placeholder="Enter your email"
                  class="w-full"
                />
              </UFormField>
            </form>
          </template>
          <template #register="{ item }">
            <CheckoutRegisterForm />
          </template>
          <template #login="{ item }">
            <CheckoutLoginForm />
          </template>
        </UTabs>
      </template>
      <template v-else>
        <UUser
          :name="`${authUser?.first_name} ${authUser?.last_name}`"
          :description="authUser?.user.email"
          :avatar="{
            alt: `${authUser?.first_name} ${authUser?.last_name}`,
          }"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { useAuthStore } from "~/store/Auth.store";
import CheckoutRegisterForm from "./forms/CheckoutRegisterForm.vue";
import CheckoutLoginForm from "./forms/CheckoutLoginForm.vue";
import { useOrderStore } from "~/store/Order.store";

const authStore = useAuthStore();
const orderStore = useOrderStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const authUser = computed(() => authStore.user);

const email = computed({
  get: () => orderStore.email,
  set: (value) => (orderStore!.email = value),
});

const tabItems = ref<TabsItem[]>([
  {
    label: "Checkout as Guest",
    slot: "guest" as const,
  },
  {
    label: "Create an Account",
    slot: "register" as const,
  },
  {
    label: "Existing User",
    slot: "login" as const,
  },
]);
</script>
