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
    <!-- <div class="bg-white h-svh">
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
            <router-link to="admin-book-list">
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
    </div> -->
    <div class="flex gap-x-6 cursor-default p-6">
      <div class="border rounded-2xl shadow-md p-5">
        <!-- <P class="text-xl font-semibold">หนังสือทั้งหมด</P> -->
        <apexchart width="520" type="pie" :options="options" :series="getDataBook"></apexchart>
      </div>
      <div class="grid w-full gap-y-3">
        <div
          class="relative border w-full rounded-2xl shadow-md p-5 flex justify-center items-center text-4xl"
        >
          <p class="text-xl font-semibold absolute top-2 left-7">ทั้งหมด</p>
          <n-number-animation
            ref="numberAnimationInstRef"
            show-separator
            :from="0"
            :to="100"
            :active="true"
          />
          <p class="text-[20px] absolute bottom-2 right-7">เล่ม</p>
        </div>
        <div class="flex gap-x-6">
          <div
            class="relative border w-full rounded-2xl shadow-md p-5 flex justify-center items-center text-4xl"
          >
            <p class="text-xl font-semibold absolute top-2 left-7">ถูกยืม</p>
            <div>
              <n-number-animation
                ref="numberAnimationInstRef"
                show-separator
                :from="0"
                :to="100"
                :active="true"
              />
              <span class="text-sm"
                >/<n-number-animation
                  ref="numberAnimationInstRef"
                  show-separator
                  :from="0"
                  :to="1000"
                  :active="true"
              /></span>
            </div>
            <p class="text-[20px] absolute bottom-2 right-7">เล่ม</p>
          </div>
          <div
            class="relative border w-full rounded-2xl shadow-md p-5 flex justify-center items-center text-4xl"
          >
            <p class="text-xl font-semibold absolute top-2 left-7">คืนแล้ว</p>
            <n-number-animation
              ref="numberAnimationInstRef"
              show-separator
              :from="0"
              :to="100"
              :active="true"
            />
            <p class="text-[20px] absolute bottom-2 right-7">เล่ม</p>
          </div>
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
            <n-badge v-for="(book, i) in topBooks" value="hot" :offset="offset">
              <n-card :key="i" class="h-[460px]">
                <div class="">
                  <img :src="`/image/${book.image}`" alt="" class="object-contain h-64 w-64" />
                </div>
                <h1 class="text-center font-semibold h-12">{{ book.name }}</h1>
                <div class="detail text-start">
                  <p>{{ book.school }}</p>
                  <p>ประเภท: {{ book.type }}</p>
                  <p>จำนวน: {{ book.amount }}</p>
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
import { ref, watchEffect } from 'vue'
import { bookTypes, bookList } from '@/constant/mockData'
import { TransitionRoot } from '@headlessui/vue'

import PButton from '@/components/button/index.vue'
// import icon from '@/components/icon/index.vue'
import sctModal from '@/components/modal/descriptionModal.vue'

const books = ref(bookList)
const topBooks = ref([])
const isOpenModal = ref(false)
const modalBookId = ref(null)

const totalBorrowDataByType = bookList.reduce((summary, book) => {
  const { type, borrowData } = book

  if (!summary[type]) {
    summary[type] = 0
  }

  summary[type] += borrowData

  return summary
}, {})

const totalBorrowDataArray = Object.entries(totalBorrowDataByType).map(
  ([type, totalBorrowData]) => ({
    type,
    totalBorrowData
  })
)

const getTypeBook = [...new Set(totalBorrowDataArray.map((book) => book.type))]
const getDataBook = [...new Set(totalBorrowDataArray.map((book) => book.totalBorrowData))]

const options = ref({
  labels: getTypeBook,
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
})
// const series = ref([44, 55, 41, 17, 15])

const offset = ref([-20, 12])

watchEffect(() => {
  topBooks.value = [...books.value].sort((a, b) => b.borrowData - a.borrowData).slice(0, 5)
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
