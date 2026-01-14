<template>
  <UPopover
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <UButton
      :label="authUser?.user?.name"
      color="primary"
      variant="subtle"
      icon="i-lucide-user"
    />

    <template #content>
      <div class="w-80 p-4">
        <UUser
          :name="authUser?.user.name"
          :description="authUser?.user.email"
          :avatar="{ alt: authUser?.user.name }"
        />
        <USeparator class="my-3" />
        <ul>
          <li>
            <nuxt-link
              to="/user/account/profile"
              class="block w-full py-1 text-sm"
              >My Profile</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/purchases" class="block w-full py-1 text-sm"
              >My Purchases</nuxt-link
            >
          </li>
        </ul>
        <USeparator class="my-3" />
        <UButton
          @click="handleLogoutClick()"
          label="Logout"
          class="w-full flex justify-center"
          variant="outline"
        />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/Auth.store";
import ConfirmationDialog from "./tools/ConfirmationDialog.vue";

const authStore = useAuthStore();

const authUser = computed(() => authStore.user);

const overlay = useOverlay();
const logoutModal = overlay.create(ConfirmationDialog);

const handleLogoutClick = () => {
  logoutModal.open({
    title: "Logout",
    message: "Are you sure you want to logout?",
    onOk: () => {
      authStore.logout();
    },
  });
};
</script>
