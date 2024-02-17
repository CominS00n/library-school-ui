<template>
  <div class="flex justify-center items-center h-svh">
    <div class="grid grid-cols-2 bg-white shadow-lg p-6 rounded-md">
      <h1 class="col-span-2 uppercase text-3xl font-semibold mb-6">Borrow book</h1>
      <div class="flex flex-col items-center justify-center gap-y-3">
        <img :src="`/image/${book.image}`" alt="" class="object-contain h-96" />
        <p>{{ book.school }} / {{ book.type }} / {{ book.amount }}</p>
      </div>
      <div class="grid content-center gap-3">
        <p class="col-span-2 font-semibold mb-3">ข้อมูลการยืม</p>
        <p-input v-model="name" class="col-span-2" label="" disabled />
        <p-input v-model="BorrowBookData" class="col-span-2" label="รหัส"  />
        <p-input label="ชื่อ" />
        <p-input label="นามสกุล" />
        <p-input class="col-span-2" label="เบอร์โทร" />
        <p-input label="วันที่ยืม" type="date" />
        <p-input label="วันที่คืน" type="date" />
      </div>
      <div class="col-span-2 flex justify-end gap-x-3 mt-3">
        <p-button :click="goBack" type="outline" text="ยกเลิก" main-class="w-32" />
        <p-button
          type="solid"
          text="ยืม"
          :main-class="`w-72 ${book.amount === 0 ? 'cursor-no-drop bg-gray-300 border-gray-300 hover:bg-gray-300 hover:border-gray-300' : ''}`"
          :disabled="book.amount === 0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { bookList } from '@/constant/mockData'
import { useRouter, useRoute } from 'vue-router'

import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'

const router = useRouter()
const route = useRoute()

const id = ref(route.params.id)
const book = ref(bookList.find((book) => book.id === id.value))

const name = book.value.name

const borrowBookData = reactive({
  book_id: route.params.id,
  fname: '',
  lname: '',
  borrow_date: new Date(),
  return_date: new Date()
})

function goBack() {
  router.go(-1)
}
</script>
