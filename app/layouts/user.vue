<template>
  <Header></Header>
  <UMain>
    <UPage>
      <UPageBody>
        <UContainer class="flex gap-8">
          <div class="w-1/4">
            <UUser
              :name="user?.user.name"
              :description="user?.user.email"
              :avatar="{ alt: user?.user.name }"
            />
            <USeparator class="py-4" />
            <ul class="text-sm flex flex-col gap-4">
              <li>
                <p class="font-bold mt-4 flex gap-2 items-center">
                  <UIcon name="i-lucide-user" />
                  My Account
                </p>
                <ul class="ml-4 flex flex-col gap-2 pt-2">
                  <li>
                    <nuxt-link to="/user/account/profile">Profile</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/user/account/banks-cards"
                      >Banks & Cards</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link to="/user/account/addreses">Addresses</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/user/account/change-password"
                      >Change Password</nuxt-link
                    >
                  </li>
                </ul>
              </li>
              <li class="font-bold">
                <nuxt-link to="/user/purchases" class="flex gap-2 items-center">
                  <UIcon name="i-lucide-clipboard-list" />
                  My Purchases
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <slot></slot>
          </div>
        </UContainer>
      </UPageBody>
    </UPage>
  </UMain>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/Auth.store";

const authStore = useAuthStore();

const user = computed(() => authStore.user);
</script>
