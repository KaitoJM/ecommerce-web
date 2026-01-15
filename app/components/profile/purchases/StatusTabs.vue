<template>
  <ul class="flex gap-2 justify-between items-center text-sm">
    <li>
      <nuxt-link to="/user/my-purchases/">All</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/my-purchases/to-pay">To Pay</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/my-purchases/to-ship">To Ship</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/my-purchases/to-receive">To Receive</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/my-purchases/completed">Completed</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/my-purchases/cancelled">Cancelled</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/my-purchases/return-refund">Return Refund</nuxt-link>
    </li>
  </ul>
</template>
