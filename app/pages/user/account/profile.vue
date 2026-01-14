<template>
  <div class="bg-neutral-50 px-6 py-4">
    <h1 class="font-bold">My Profile</h1>
    <p class="text-xs">Manage and protect your account</p>
    <USeparator class="my-4" />
    <div class="flex gap-8">
      <form class="flex-1 flex flex-col gap-2">
        <UFormField label="First name">
          <UInput placeholder="Juan" class="w-full" />
        </UFormField>
        <UFormField label="Last name">
          <UInput placeholder="Dela Cruz" class="w-full" />
        </UFormField>
        <UFormField label="Email">
          <UInput placeholder="juandelacruz@example.com" class="w-full" />
        </UFormField>
        <UFormField label="Phone number">
          <UInput placeholder="Enter your phone number." class="w-full" />
        </UFormField>
        <UFormField label="Gender">
          <UInput class="w-full" />
        </UFormField>
        <UFormField label="Date of birth">
          <UInput class="w-full" />
        </UFormField>
        <div class="flex justify-end mt-4">
          <UButton label="Update" variant="outline" />
        </div>
      </form>
      <div class="w-1/3">
        <p class="text-sm text-accented">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut dolorem
          maxime quibusdam doloribus repudiandae? Non tempore ab amet, cum neque
          blanditiis veritatis velit nisi ea expedita maxime, quia suscipit
          quos?
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
});
</script>
