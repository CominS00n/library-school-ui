<script setup>
import { RouterView } from 'vue-router'

import PNav from '@/components/layout/navbar.vue'
</script>

<template>
  <div class="sticky top-0 shadow-md bg-white z-[9999]">
    <p-nav />
  </div>
  <div class="mt-6">
    <RouterView />
  </div>
</template>

<style>

</style>
