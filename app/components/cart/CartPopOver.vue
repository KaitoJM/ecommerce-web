<template>
  <UPopover
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <UButton icon="i-lucide-shopping-cart" variant="ghost" size="xl" />

    <template #content>
      <div class="p-4 w-80">
        <ul class="flex flex-col gap-1">
          <li class="flex gap-2 items-center" v-for="item in 4">
            <img
              src="https://via.placeholder.com/50"
              alt="Product Image"
              class="w-12 h-12 object-cover rounded border border-accented"
            />
            <div class="flex-1">
              <div class="flex gap-4 items-center justify-between">
                <p class="font-bold text-xs">Product Name (x1)</p>
                <span class="text-primary text-sm font-bold">99.99 PHP</span>
              </div>
              <p class="text-xs">125GB | Red</p>
            </div>
          </li>
        </ul>
        <UButton
          label="View Cart"
          color="primary"
          class="w-full mt-4 flex justify-center"
        />
      </div>
    </template>
  </UPopover>
</template>
