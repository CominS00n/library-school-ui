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
    <div class="lg:flex lg:gap-x-6 lg:space-y-0 space-y-3 cursor-default p-6">
      <div class="border rounded-2xl shadow-md p-5 space-y-2">
        <p class="text-md lg:text-xl font-semibold">จำนวนหนังสือแยกประเภท</p>
        <apexchart width="520" type="pie" :options="options" :series="dataTest"></apexchart>
      </div>
      <div class="grid w-full gap-y-3">
        <div class="flex gap-x-6">
          <div
            class="relative border w-full rounded-2xl shadow-md p-5 flex justify-center items-center text-4xl"
          >
            <p class="text-sm lg:text-xl font-semibold absolute top-2 left-7">ทั้งหมด</p>
            <div class="text-sm lg:text-3xl">
              <n-number-animation
                ref="numberAnimationInstRef"
                show-separator
                :from="0"
                :to="totalAmountBook"
                :active="true"
              />
            </div>
            <p class="text-xs lg:text-[20px] absolute bottom-2 right-7">เล่ม</p>
          </div>
          <div
            class="relative border w-full rounded-2xl shadow-md p-5 flex justify-center items-center text-4xl"
          >
            <p class="text-sm lg:text-xl font-semibold absolute top-2 left-7">ประเภท</p>
            <div>
              <p class="text-sm lg:text-[20px]">
                {{ bastBookType }}
              </p>
            </div>
            <p class="text-[0] lg:text-[20px] absolute bottom-2 right-7">ถูกยืมมากที่สุด</p>
          </div>
        </div>
        <div class="flex gap-x-6">
          <div
            class="relative border w-full rounded-2xl shadow-md p-5 flex justify-center items-center text-4xl"
          >
            <p class="text-sm lg:text-xl font-semibold absolute top-2 left-7">ถูกยืม</p>
            <div>
              <div class="text-sm lg:text-3xl">
                <n-number-animation
                  ref="numberAnimationInstRef"
                  show-separator
                  :from="0"
                  :to="totalBorrow"
                  :active="true"
                />
              </div>
            </div>
            <p class="text-xs lg:text-[20px] absolute bottom-2 right-7">ครั้ง</p>
          </div>
          <div
            class="relative border w-full rounded-2xl shadow-md p-5 flex justify-center items-center text-4xl"
          >
            <p class="text-sm lg:text-xl font-semibold absolute top-2 left-7">คืนแล้ว</p>
            <div class="text-sm lg:text-3xl">
              <n-number-animation
                ref="numberAnimationInstRef"
                show-separator
                :from="0"
                :to="100"
                :active="true"
              />
            </div>
            <p class="text-xs lg:text-[20px] absolute bottom-2 right-7">ครั้ง</p>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-24 my-2 text-center container mx-auto">
      <!-- <div>
        <n-divider title-placement="center"> หวมดหมู่ </n-divider>
        <div class="my-6 flex justify-around">
          <span v-for="bookType in bookTypes">
            <p-button type="outline" :text="bookType" />
          </span>
        </div>
      </div> -->
      <div class="my-2 space-y-6">
        <n-divider title-placement="center"> รายการแนะนำ </n-divider>
        <n-card class="rounded-xl">
          <div class="grid grid-cols-5 gap-y-5 gap-x-2">
            <n-badge v-for="(book, i) in topBooks" value="hot" :offset="offset" :key="book.id">
              <n-card :key="i" class="h-[460px]">
                <div class="">
                  <img :src="book.image" alt="" class="object-contain h-64 w-64" />
                </div>
                <h1 class="text-center font-semibold h-12">{{ book.nameBook }}</h1>
                <div class="detail text-start">
                  <p>{{ book.school }}</p>
                  <p>ประเภท: {{ book.typeBook }}</p>
                  <p>จำนวน: {{ book.amountBook }}</p>
                </div>
                <div class="acton flex mt-3 justify-between">
                  <p-button :click="() => detailClick(book.id)" text="รายละเอียด"></p-button>
                  <router-link :to="`/borrow-book/${book.id}`">
                    <p-button text="ยืม" type="solid"></p-button>
                  </router-link>
                </div>
              </n-card>
            </n-badge>
          </div>
        </n-card>
      </div>
    </div>

    <n-modal
      v-model:show="isOpenModal"
      class="custom-card w-[560px]"
      preset="card"
      title="รายละเอียด"
      :bordered="false"
      size="huge"
    >
      <sct-modal :book-i-d="modalBookId" />
    </n-modal>
  </TransitionRoot>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
// import { bookTypes, bookList } from '@/constant/mockData'
import { TransitionRoot } from '@headlessui/vue'

import useBooks from '@/componsable/book_api'

import PButton from '@/components/button/index.vue'
import sctModal from '@/components/modal/descriptionModal.vue'

const { bookDetails, getBookDetails } = useBooks()

onMounted(async () => {
  await getBookDetails()
  console.log('Book Details:', bookDetails.value)
})

const books = ref(bookDetails)
const topBooks = ref([])
const isOpenModal = ref(false)
const modalBookId = ref(null)
const dataTest = ref(null)
const totalBorrow = ref(0)
const totalAmountBook = ref(0)
const bastBookType = ref('')
const options = ref({})

const offset = ref([-20, 12])

watchEffect(() => {
  topBooks.value = [...books.value].sort((a, b) => b.borrowData - a.borrowData).slice(0, 5)

  // สร้างอาร์เรย์ของ typeBook ที่ไม่ซ้ำกัน
  const uniqueTypeBooks = [...new Set(bookDetails.value.map((book) => book.typeBook))]

  // นับจำนวนครั้งที่แต่ละ typeBook ปรากฏ
  const typeBookCounts = uniqueTypeBooks.reduce((counts, typeBook) => {
    counts[typeBook] = bookDetails.value.filter((book) => book.typeBook === typeBook).length
    return counts
  }, {})

  // หา typeBook ที่ปรากฏมากที่สุด
  const mostCommonTypeBook = Object.keys(typeBookCounts).reduce((mostCommon, typeBook) => {
    if (typeBookCounts[typeBook] > typeBookCounts[mostCommon]) {
      return typeBook
    } else {
      return mostCommon
    }
  }, uniqueTypeBooks[0]) // ให้เป็น typeBook แรกไปก่อน
  bastBookType.value = mostCommonTypeBook

  // สร้างอาร์เรย์ของยืม borrowData ของแต่ละ type
  const totalBorrowDataByType = bookDetails.value.reduce((summary, book) => {
    const { typeBook, borrowData } = book

    if (!summary[typeBook]) {
      summary[typeBook] = 0
    }

    summary[typeBook] += borrowData

    return summary
  }, {})

  // แปลงข้อมูลเป็นรูปแบบ array
  const totalBorrowDataArray = Object.entries(totalBorrowDataByType).map(
    ([typeBook, totalBorrowData]) => ({
      typeBook,
      totalBorrowData
    })
  )
  const getDataBook = [...new Set(totalBorrowDataArray.map((book) => book.totalBorrowData))]
  dataTest.value = getDataBook
  console.log('dataTest',dataTest)


  const totalBorrowDataSum = totalBorrowDataArray.reduce(
    (sum, book) => sum + book.totalBorrowData,
    0
  )
  totalBorrow.value = totalBorrowDataSum

  const amountBookSum = bookDetails.value.reduce((sum, book) => sum + book.amountBook, 0)
  totalAmountBook.value = amountBookSum

  console.log('Unique Type Books:', uniqueTypeBooks)
  console.log('Type Book Counts:', typeBookCounts)
  console.log('Most Common Type Book:', mostCommonTypeBook)

  options.value = {
    labels: uniqueTypeBooks,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }
})

function detailClick(bookId) {
  isOpenModal.value = true
  modalBookId.value = bookId
}
</script>

<style scoped>
.cover-image {
  box-shadow: -24px -24px #7743db;
}
</style>
