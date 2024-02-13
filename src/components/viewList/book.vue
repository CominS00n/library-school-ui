<template>
  <div class="grid gap-y-2">
    <div class="border p-4 grid grid-cols-12 items-center gap-x-5" v-for="book in bookList">
      <div class="">
        <img :src="`/image/${book.image}`" alt="image" class="object-contain h-32 w-24" />
      </div>
      <div class="col-span-11 grid grid-cols-6">
        <div class="flex flex-col justify-center">
          <h3 class="font-bold">{{ book.name }}</h3>
          <p>{{ book.school }}</p>
        </div>
        <div>
          <p class="font-semibold">ประเภท</p>
          <p>{{ book.type }}</p>
        </div>
        <div class="col-span-3">
          <p class="font-semibold">Description</p>
          <p>
            {{ book.description }}
          </p>
        </div>
        <div class="flex items-center justify-center">
          <router-link :to="`/borrow-book/${book.id}`">
            <p-button text="ยืม" type="outline"></p-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { bookList } from '@/constant/mockData'

import PButton from '@/components/button/index.vue'

const counts = ref(20)

const props = defineProps({
  searchFilter: {
    type: String,
    default: ''
  },
  typeFilter: {
    type: String,
    default: ''
  }
})
</script>
