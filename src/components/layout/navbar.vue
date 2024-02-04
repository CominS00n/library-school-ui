<template>
  <div class="">
    <div
      class="flex justify-between container w-full mx-auto h-16 items-center "
    >
      <div class="flex items-center space-x-6">
        <h1 class="text-2xl">Library</h1>
        <ul class="space-x-3 flex">
          <li
            v-for="(item, i) in menuItem_Admin"
            :key="i"
            class="hover:text-[#7743DB]"
            :class="`${$route.name === item.link ? 'border-[#7743DB] border-b-2' : ''}`"
          >
            <RouterLink :to="`${item.link}`" class="flex items-center">
              <span v-show="item.icon" class="mr-2">
                <icon :icon="item.icon" />
              </span>
              <div v-if="item.title">
                {{ item.title }}
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div><n-button ghost> Login </n-button></div>
    </div>
  </div>
</template>

<script setup>
import { menuItem_Admin } from '@/constant/menu'

import icon from '@/components/icon/index.vue'
</script>
