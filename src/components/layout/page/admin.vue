<template>
  <div class="sticky top-0 shadow-md bg-white z-[999]">
    <p-nav :item="menuItem_Admin" />
  </div>
  <div class="relative mt-6 container mx-auto">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { menuItem_Admin } from '@/constant/menu'

import PNav from '@/components/layout/navbar.vue'
</script>
