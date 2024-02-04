<template>
  <div class="container mx-auto flex flex-col space-y-4">
    <div class="flex justify-center w-full">
      <text-input label="" icon="search" inputClass="w-[640px]" placeholder="Search..." />
    </div>
    <div>
        
    </div>
    <div class="flex justify-start text-xl w-72">
      <div
        class="flex justify-center border p-2 rounded-l-full w-full hover:bg-[#C3ACD0]"
        :class="`${dataList === 'grid' ? 'bg-[#7743DB] text-white' : ''}`"
        @click="`${(dataList = 'grid')}`"
      >
        <icon icon="heroicons-outline:squares-2x2" />
      </div>
      <div
        class="flex justify-center border p-2 rounded-r-full w-full hover:bg-[#C3ACD0] hover:text-white"
        :class="`${dataList === 'list' ? 'bg-[#7743DB] text-white' : ''}`"
        @click="`${(dataList = 'list')}`"
      >
        <icon icon="heroicons-outline:queue-list" />
      </div>
    </div>
    <div v-show="dataList === 'grid'">
        <grid />
    </div>
    <div v-show="dataList === 'list'">
        <list />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import textInput from '@/components/textInput/index.vue'
import Icon from '@/components/icon/index.vue'
import list from '@/components/viewList/book.vue'
import grid from '@/components/viewTable/book.vue'

const dataList = ref('grid')
</script>
