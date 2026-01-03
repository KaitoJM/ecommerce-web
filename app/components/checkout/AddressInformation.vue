<template>
  <div>
    <h4 class="text-xs font-bold uppercase">Delivery Address</h4>
    <div class="border border-dashed border-accented rounded-lg p-4 mt-2">
      <form class="my-4">
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
    </div>
  </div>
</template>
