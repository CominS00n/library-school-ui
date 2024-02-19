<template>
  <div class="grid grid-cols-5 gap-y-5 gap-x-2">
    <n-card v-for="book in bookDetails" class="h-[460px]" :key="book.id">
      {{ getBlobUrl(book.image) }}
      <div class="">
        <img :src="getBlobUrl(book.image)" alt="" class="object-contain h-64 w-64" />
      </div>
      <h1 class="text-center font-semibold h-12">{{ book.nameBook }}</h1>
      <div class="detail">
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
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { bookList } from '@/constant/mockData'

import useBooks from '@/componsable/book_api'

import PButton from '@/components/button/index.vue'
import sctModal from '@/components/modal/descriptionModal.vue'

const { bookDetails, getBookDetails } = useBooks()

onMounted(() => {
  getBookDetails()
})

function getBlobUrl(blobData) {
  console.log(blobData)
  let blobUrl = null

  try {
    const blob = new Blob([blobData], { type: 'image/jpeg' }) 
    blobUrl = URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error creating Blob URL:', error)
  }
  console.log(blobUrl)

  return blobUrl ? `http://127.0.0.1:8000/images/${blobUrl}` : null
}

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

const isOpenModal = ref(false)
const modalBookId = ref(null)

function detailClick(bookId) {
  isOpenModal.value = true
  modalBookId.value = bookId
}
</script>
