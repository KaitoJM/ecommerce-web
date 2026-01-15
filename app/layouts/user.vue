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
            <UserNavigation />
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
import UserNavigation from "~/components/profile/UserNavigation.vue";
import { useAuthStore } from "~/store/Auth.store";

const authStore = useAuthStore();

const user = computed(() => authStore.user);
</script>
