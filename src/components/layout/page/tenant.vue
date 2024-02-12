<script setup>
import { RouterView } from 'vue-router'
import { menuItem_Tenant } from '@/constant/menu'

import PNav from '@/components/layout/navbar.vue'
</script>

<template>
  <div class="sticky top-0 shadow-md bg-white z-[9999]">
    <p-nav :item="menuItem_Tenant" />
  </div>
  <div class="mt-6 container mx-auto">
    <RouterView />
  </div>
</template>
