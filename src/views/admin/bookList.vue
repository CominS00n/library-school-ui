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
    <div class="flex flex-col space-y-4">
      <div class="flex justify-center w-full">
        <text-input
          v-model="searchInput"
          label=""
          icon="search"
          inputClass="w-[640px]"
          placeholder="Search..."
        />
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
      </div>
      <div v-show="dataList === 'grid'">
        <grid :bookData="filteredBooks" :search-filter="searchInput" :type-filter="typeFilter" />
      </div>
      {{ filteredBooks }}
      <div v-show="dataList === 'list' && Array.isArray(bookDetails)">
        <list :bookData="filteredBooks" :search-filter="searchInput" :type-filter="typeFilter" />
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { TransitionRoot } from '@headlessui/vue'

import useBooks from '@/componsable/book_api'

import textInput from '@/components/textInput/index.vue'
import Icon from '@/components/icon/index.vue'
import list from '@/components/viewList/book.vue'
import grid from '@/components/viewTable/book.vue'

const dataList = ref('grid')
const typeFilter = ref('')
const searchInput = ref('')

const { bookDetails, getBookDetails } = useBooks()

onMounted(() => {
  getBookDetails()
})

const filteredBooks = computed(() => {
  const lowerCaseSearchTerm = searchInput.value.toLowerCase()
  return bookDetails.value.filter((book) => {
    return (
      book.nameBook.toLowerCase().includes(lowerCaseSearchTerm) ||
      book.typeBook.toLowerCase().includes(lowerCaseSearchTerm) ||
      book.serialNumber.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})
</script>
