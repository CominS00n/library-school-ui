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
    <div class="flex justify-center items-center h-svh">
      <div class="grid grid-cols-2 bg-white shadow-lg p-6 rounded-md border">
        <button
          @click="goBack"
          class="w-fit p-2 rounded-xl hover:bg-[#C3ACD0] hover:border-white hover:text-white"
        >
          <icon icon="heroicons-outline:arrow-long-left" class="text-3xl" />
        </button>
        <span class="col-span-2 uppercase text-3xl font-semibold mb-6">Borrow book</span>
        <div class="flex flex-col items-center justify-center gap-y-3">
          <img :src="bookDetail.image" alt="" class="object-contain h-96" />
          <p>{{ bookDetail.school }} / {{ bookDetail.typeBook }} / {{ bookDetail.amountBook }}</p>
        </div>
        <div class="grid content-center gap-3">
          <p class="col-span-2 font-semibold mb-3">ข้อมูลการยืม</p>
          <p-input v-model="bookDetail.nameBook" class="col-span-2" label="" disabled />
          <p-input label="รหัสนักเรียน" class="col-span-2" />
          <p-input label="ชื่อ" />
          <p-input label="นามสกุล" />
          <p-input label="เบอร์โทร" class="col-span-2" />
          <p-input v-model="borrowData.borrowingDate" label="วันที่ยืม" type="date" />
          <p-input label="วันที่คืน" type="date" />
        </div>
        <div class="col-span-2 flex justify-end gap-x-3 mt-3">
          <p-button :click="goBack" type="outline" text="ยกเลิก" main-class="w-32" />
          <p-button
            type="solid"
            text="ยืม"
            :main-class="`w-72 ${bookDetail.amountBook === 0 ? 'cursor-no-drop bg-gray-300 border-gray-300 hover:bg-gray-300 hover:border-gray-300' : ''}`"
            :disabled="bookDetail.amountBook === 0"
            :click="submit"
          />
        </div>
      </div>
    </div>
    {{ borrowData }}
  </TransitionRoot>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { TransitionRoot } from '@headlessui/vue'
// import { bookList } from '@/constant/mockData'

import useBooks from '@/componsable/book_api'
import useBorrowBook from '@/componsable/borrow'

import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'
import icon from '@/components/icon/index.vue'

const router = useRouter()
const route = useRoute()

const { bookDetail, getBookDetail } = useBooks()
const { saveBorrowBook } = useBorrowBook()

onMounted(() => {
  getBookDetail(id.value)
})

const id = ref(route.params.id)
// const book = ref(bookList.find((book) => book.id === id.value))

// const name = book.value.name

const borrowData = reactive({
  bookId: route.params.id,
  studentNo: '1',
  firstName: 'qdqdqdq',
  lastName: 'fsqdqd',
  tel: '23424',
  borrowingDate: '',
  returnBook: '',
  amountBook: 1,
  status: 'unreturned' //returned
})

function submit() {
  saveBorrowBook(borrowData)

}

function goBack() {
  router.go(-1)
}
</script>
