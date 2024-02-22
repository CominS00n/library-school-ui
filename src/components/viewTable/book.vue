<template>
  <div class="grid grid-cols-5 gap-y-5 gap-x-2">
    <n-card data-aos="fade-left" v-for="book in props.bookData" class="h-[460px]" :key="book.id">
      <div class="">
        <img :src="book.imageURL" alt="" class="object-contain h-64 w-64" />
      </div>
      <h1 class="text-center font-semibold h-12">{{ book.name }}</h1>
      <div class="detail">
        <p>{{ book.school }}</p>
        <p>ประเภท: {{ book.type }}</p>
        <p>จำนวน: {{ book.amount }}</p>
        <!-- {{ book.borrowData }} -->
      </div>
      <div class="acton flex mt-3 justify-between">
        <p-button :click="() => detailClick(book.id)" text="รายละเอียด"></p-button>
        <router-link :to="`/borrow-book/${book.id}`">
          <p-button text="ยืม" type="solid"></p-button>
        </router-link>
      </div>
    </n-card>
  </div>
  <!-- {{ bookList }} -->
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
import { ref } from 'vue'

import PButton from '@/components/button/index.vue'
import sctModal from '@/components/modal/descriptionModal.vue'

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

const isOpenModal = ref(false)
const modalBookId = ref(null)

function detailClick(bookId) {
  isOpenModal.value = true
  modalBookId.value = bookId
}
</script>
