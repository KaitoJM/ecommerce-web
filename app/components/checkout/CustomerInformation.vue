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
                <UInput placeholder="Enter your email" class="w-full" />
              </UFormField>
            </form>
          </template>
          <template #register="{ item }">
            <form class="my-8">
              <UFormField label="First Name">
                <UInput placeholder="Enter your first name" class="w-full" />
              </UFormField>
              <UFormField label="Last Name" class="mt-2">
                <UInput placeholder="Enter your last name" class="w-full" />
              </UFormField>
              <UFormField label="Email" class="mt-2">
                <UInput placeholder="Enter your email" class="w-full" />
              </UFormField>
              <UFormField label="Password" class="mt-2">
                <UInput type="password" class="w-full" />
              </UFormField>
              <UFormField label="Confirm Password" class="mt-2">
                <UInput type="password" class="w-full" />
              </UFormField>
              <UButton
                label="Register"
                class="w-full flex justify-center mt-4"
              />
            </form>
          </template>
          <template #login="{ item }">
            <form class="my-8">
              <UFormField label="Email" class="mt-2">
                <UInput placeholder="Enter your email" class="w-full" />
              </UFormField>
              <UFormField label="Password" class="mt-2">
                <UInput type="password" class="w-full" />
              </UFormField>
              <UButton label="Login" class="w-full flex justify-center mt-4" />
            </form>
          </template>
        </UTabs>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const isLoggedIn = ref(false);

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
