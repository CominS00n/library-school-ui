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
        <ul class="flex space-x-5">
          <il
            v-for="(bookType, i) in bookTypes"
            class="cursor-pointer hover:scale-110"
            :class="numType === i ? 'text-[#7743DB] font-semibold' : ''"
            @click="isSelectType(bookType, i)"
          >
            {{ bookType }}
          </il>
        </ul>
      </div>
      <div v-show="dataList === 'grid'">
        <grid :bookData="bookDetails" :search-filter="searchInput" :type-filter="typeFilter" />
        <!-- {{ bookDetails }} -->
      </div>
      <div v-show="dataList === 'list' && Array.isArray(bookDetails)">
        <list :bookData="listBook" :search-filter="searchInput" :type-filter="typeFilter" />
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { bookList, bookTypes } from '@/constant/mockData'
import { getImageURL } from '@/stores/getImageURL'
import { TransitionRoot } from '@headlessui/vue'

import useBooks from '@/componsable/book_api'

import textInput from '@/components/textInput/index.vue'
import Icon from '@/components/icon/index.vue'
import list from '@/components/viewList/book.vue'
import grid from '@/components/viewTable/book.vue'

const dataList = ref('grid')
const numType = ref(0)
const typeFilter = ref('')
const searchInput = ref('')
const listBook = ref([])

const { bookDetails, getBookDetails } = useBooks()


onMounted(async () => {
  await getBookDetails()
  for (const book of bookDetails.value) {
    book.imageURL = await someOtherFunction(book.image)
    listBook.value.push(book)
  }
})

async function someOtherFunction(url) {
  const downloadedURL = await getImageURL(url)
  console.log(downloadedURL)
  return downloadedURL
}

function isSelectType(bookType, i) {
  numType.value = i
  console.log(i)
  if (i === 0) {
    typeFilter.value = ''
  } else {
    typeFilter.value = bookType
  }
}
</script>
