<template>
  <div class="grid grid-cols-5 gap-y-5 gap-x-2">
    {{ imageURL2 }}
    <n-card class="h-[460px]">
      <div class="">
        <img :src="imageURL2" alt="" class="object-contain h-64 w-64" />
      </div>
      <h1 class="text-center font-semibold h-12"></h1>
      <div class="detail">
        <p></p>
        <p>ประเภท:</p>
        <p>จำนวน:</p>
      </div>
      <div class="acton flex mt-3 justify-between">
        <p-button :click="() => detailClick()" text="รายละเอียด"></p-button>
        <router-link :to="`/borrow-book/`">
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
import { getImageURL } from '@/stores/getImageURL'

import useBooks from '@/componsable/book_api'

import PButton from '@/components/button/index.vue'
import sctModal from '@/components/modal/descriptionModal.vue'

// const { bookDetails, getBookDetails } = useBooks()
const imageURL = ref('folder/001.jpg')
const imageURL2 = ref('')

onMounted(() => {
  // getBookDetails()
  someOtherFunction(imageURL.value)
})

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


function someOtherFunction(url) {
  getImageURL(url).then((downloadedURL) => {
    console.log(downloadedURL)
    imageURL2.value = downloadedURL
  })
}

function detailClick(bookId) {
  isOpenModal.value = true
  modalBookId.value = bookId
}
</script>
