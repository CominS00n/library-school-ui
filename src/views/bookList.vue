<template>
  <TransitionRoot
    appear
    :show="true"
    enter="ease-out duration-300"
    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to="opacity-100 translate-y-0 sm:scale-100"
    leave="ease-in duration-200"
    leave-from="opacity-100 translate-y-0 sm:scale-100"
    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div class="container mx-auto flex flex-col space-y-4">
      <div class="flex justify-center w-full">
        <text-input label="" icon="search" inputClass="w-[640px]" placeholder="Search..." />
      </div>
      <div class="flex items-center gap-x-6">
        <div class="flex justify-start text-xl w-72 cursor-pointer">
          <div
            class="flex justify-center border p-2 rounded-l-full w-full hover:bg-[#C3ACD0] hover:text-white"
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
        <ul class="flex space-x-5">
          <il
            v-for="(bookType, i) in bookTypes"
            class="cursor-pointer hover:scale-110"
            :class="numType === i ? 'text-[#7743DB] font-semibold' : ''"
            @click="numType = i"
          >
            {{ bookType }}
          </il>
        </ul>
      </div>
      <div v-show="dataList === 'grid'">
        <grid />
      </div>
      <div v-show="dataList === 'list'">
        <list />
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { bookTypes } from '@/constant/mockData'
import { TransitionRoot } from '@headlessui/vue'

import textInput from '@/components/textInput/index.vue'
import Icon from '@/components/icon/index.vue'
import list from '@/components/viewList/book.vue'
import grid from '@/components/viewTable/book.vue'

const dataList = ref('grid')
const numType = ref(0)
</script>
