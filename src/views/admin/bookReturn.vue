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
    <div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th v-for="head in headers">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="borrow in borrows">
              <td>{{ borrow.id }}</td>
              <td>
                <img
                  :src="`/image/${getBookInfo(borrow.book_id).image}`"
                  alt=""
                  class="h-24 w-24"
                />
              </td>
              <td>{{ getBookInfo(borrow.book_id).name }}</td>
              <td>{{ borrow.fname }} {{ borrow.lname }}</td>
              <td>{{ borrow.borrow_date }}</td>
              <td>{{ borrow.return_date }}</td>
              <td>{{ borrow.status }}</td>
              <td><p-button :click="isOpenBorrowBook" type="outline" text="คืน" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </TransitionRoot>

  <n-modal
    v-model:show="openBorrowBook"
    class="custom-card w-[560px]"
    preset="card"
    title="ชื่อหนังสือ"
    :bordered="false"
    size="huge"
  >
    <div class="space-y-4">
      <p-input label="รหัสนักเรียน" />
      <p-input label="ชื่อ" />
      <p-input label="นามสกุล" />
      <p-input label="เบอร์โทร" />
      <p-input label="วันที่ยืม" disabled />
      <p-input label="วันที่คืน" type="date" />
    </div>
    <template #footer>
      <div class="flex gap-x-4">
        <p-button :click="isCloseBorrowBook" text="Cancel" />
        <p-button :click="returnBook" text="Submit" type="solid" main-class="w-full" />
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import { borrows, bookList } from '@/constant/mockData'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import PButton from '@/components/button/index.vue'
import PInput from '@/components/textInput/index.vue'

const toast = useToast()

const headers = ref([
  'ID',
  'Image',
  'Book Name',
  'Borrow Name',
  'Date Borrow',
  'Date Return',
  'Status',
  'Action'
])

const openBorrowBook = ref(false)

function isOpenBorrowBook() {
  openBorrowBook.value = true
}

function isCloseBorrowBook() {
  openBorrowBook.value = !openBorrowBook.value
}

function returnBook() {
  toast.success('ทำรายสำเร็จ', {timeout: 2000})
  isCloseBorrowBook()

}

const getBookInfo = (bookId) => {
  return bookList.find((book) => book.id === bookId) || {}
}
</script>
