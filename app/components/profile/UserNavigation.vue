<script setup lang="ts">
import NavigationItem from "./NavigationItem.vue";
import NavigationSubItem from "./NavigationSubItem.vue";
</script>

<template>
  <ul class="text-sm flex flex-col gap-4">
    <NavigationItem label="Account" icon="i-lucide-user">
      <NavigationSubItem url="/user/account/profile" label="Profile" />
      <NavigationSubItem
        url="/user/account/banks-cards"
        label="Banks & Cards"
      />
      <NavigationSubItem url="/user/account/addresses" label="Addresses" />
      <NavigationSubItem
        url="/user/account/change-password"
        label="Change Password"
      />
    </NavigationItem>
    <NavigationItem
      label="My Purchases"
      icon="i-lucide-clipboard-list"
      url="/user/my-purchases"
    />
  </ul>
</template>
