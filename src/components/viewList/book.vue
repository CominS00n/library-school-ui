<template>
  <div v-if="props.bookData.length === 0" class="flex justify-center items-center h-80">
    <n-empty description="You can't find anything">
      <template #extra>
        <n-button size="small"> Find Something New </n-button>
      </template>
    </n-empty>
  </div>
  <div class="grid gap-y-2">
    <div class="border p-4 grid grid-cols-12 items-center gap-x-5" v-for="book in props.bookData">
      <div class="">
        <img :src="book.image" alt="image" class="object-contain h-32 w-24" />
      </div> 
      <div class="col-span-11 grid grid-cols-6">
        <div class="flex flex-col justify-center">
          <h3 class="font-bold">{{ book.nameBook }}</h3>
          <p>{{ book.school }}</p>
        </div>
        <div class="p-3">
          <p class="font-semibold">ประเภท</p>
          <p>{{ book.typeBook }}</p>
        </div>
        <div class="col-span-3 p-3">
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
import PButton from '@/components/button/index.vue'

const props = defineProps({
  searchFilter: {
    type: String,
    default: ''
  },
  typeFilter: {
    type: String,
    default: ''
  },
  bookData: {
    type: Array,
    default: []
  }
})
</script>
