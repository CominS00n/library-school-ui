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
    <div class="bg-white h-svh">
      <div class="grid grid-cols-2 container mx-auto justify-center items-center h-full">
        <div class="text-7xl">
          <p class="text-[#7743db]">What book you</p>
          <n-space>
            <p class="text-[#7743db]">looking for?</p>
            <icon icon="heroicons-outline:book-open" class="text-7xl text-[#7743db]" />
          </n-space>
          <p class="text-base mt-5 font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti sint quod enim quasi
            culpa. Ducimus quia repellendus pariatur tenetur optio perspiciatis reprehenderit fugit
            ab nemo iste quaerat et eos officiis corrupti, alias illo magni culpa quo explicabo enim
            perferendis dolorum delectus? Asperiores ullam dolorem corporis temporibus tempora
            similique repellat laborum!
          </p>

          <div class="text-base mt-5 w-fit">
            <router-link to="book-list">
              <p-button icon="heroicons-outline:arrow-long-right" type="outline" text="See more" />
            </router-link>
          </div>
        </div>
        <div class="flex justify-center">
          <img
            src="/image/pexels-photo-3494806.jpeg"
            alt="##"
            class="cover-image h-[540px] rounded-se-3xl rounded-bl-3xl"
          />
        </div>
      </div>
    </div>
    <div class="space-y-24 my-2 text-center container mx-auto">
      <div>
        <n-divider title-placement="center"> หวมดหมู่ </n-divider>
        <div class="my-6 flex justify-around">
          <span v-for="bookType in bookTypes">
            <p-button type="outline" :text="bookType" />
          </span>
        </div>
      </div>
      <div class="my-2 space-y-6">
        <n-divider title-placement="center"> รายการแนะนำ </n-divider>
        <n-card class="rounded-xl">
          <div class="grid grid-cols-5 gap-y-5 gap-x-2">
            <n-card v-for="(book, i) in topBooks" :key="i" class="h-[460px]">
              <div class="">
                <img
                  :src="`/image/${book.image}`"
                  alt=""
                  class="object-contain h-64 w-64"
                />
              </div>
              <h1 class="text-center font-semibold h-12">{{ book.name }}</h1>
              <div class="detail text-start">
                <p>{{ book.school }}</p>
                <p>ประเภท: {{ book.type }}</p>
                <p>จำนวน: {{ book.amount }}</p>
              </div>
              <div class="acton flex mt-3 justify-between">
                <p-button text="รายละเอียด"></p-button>
                <p-button text="ยืม" type="solid"></p-button>
              </div>
            </n-card>
          </div>
        </n-card>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { computed, ref } from 'vue'
import { bookTypes, bookList } from '@/constant/mockData'
import { TransitionRoot } from '@headlessui/vue'

import PButton from '@/components/button/index.vue'
import icon from '@/components/icon/index.vue'

const books = ref(bookList)

const topBooks = computed(() => {
  return books.value.sort((a, b) => b.borrowData - a.borrowData).slice(0, 5)
})
</script>

<style scoped>
.cover-image {
  box-shadow: -24px -24px #7743db;
}
</style>
