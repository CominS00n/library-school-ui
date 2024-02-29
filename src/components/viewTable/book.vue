<template>
  <div v-if="props.bookData.length === 0" class="flex justify-center items-center h-80">
    <n-empty description="ไม่พบข้อมูล">
      <template #extra>
        <!-- <n-button size="small"> Find Something New </n-button> -->
      </template>
    </n-empty>
  </div>
  <div class="grid grid-cols-5 gap-y-5 gap-x-2">
    <n-card data-aos="fade-left" v-for="book in props.bookData" class="h-[460px]" :key="book.id">
      <button
        v-if="accountLogin.role === 'admin'"
        @click="editDetail(book.id)"
        class="absolute right-1 top-1 p-2 rounded-full hover:border hover:border-[#C3ACD0]"
      >
        <icon icon="heroicons-outline:pencil" />
      </button>
      <div class="">
        <img :src="book.image" alt="" class="object-contain h-64 w-64" />
      </div>
      <h1 class="text-center font-semibold h-12">{{ book.nameBook }}</h1>
      <div class="detail">
        <p>{{ book.school }}</p>
        <p>ประเภท: {{ book.typeBook }}</p>
        <p>จำนวน: {{ book.amountBook }}</p>
        <!-- {{ book.borrowData }} -->
      </div>
      <div class="acton flex mt-3 justify-between">
        <p-button :click="() => detailClick(book.id, book.imageURL)" text="รายละเอียด"></p-button>
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
    <sct-modal :book-i-d="modalBookId" :book-image="imageURL" />
  </n-modal>

  <n-modal
    v-model:show="isOpenEdit"
    class="custom-card w-[640px]"
    preset="card"
    title="รายละเอียด"
    :bordered="false"
    size="huge"
  >
    <div class="flex justify-center">
      <img :src="bookDetail.image" alt="##" class="h-48" />
    </div>
    <div class="grid grid-cols-2 gap-y-2 gap-x-2">
      <p-input class="col-span-2" v-model="bookDetail.nameBook" label="ชื่อหนังสือ" />
      <p-input class="col-span-2" v-model="bookDetail.school" label="โรงเรียน" />
      <p-input v-model="bookDetail.typeBook" label="ประเภท" />
      <p-input v-model="bookDetail.amountBook" label="จำนวน" />
      <p-input class="col-span-2" v-model="bookDetail.description" label="รายละเอียด" />
    </div>
    <div class="flex gap-x-3 mt-4">
      <p-button :click="closeEdit" text="ยกเลิก" type="outline" main-class="w-36" />
      <p-button
        :click="() => submitEdit(bookDetail.id)"
        text="แก้ไข"
        type="solid"
        main-class="w-full"
      />
    </div>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import { getUserInfo } from '@/stores/accountLogin'
import { useToast } from 'vue-toastification'

import useBooks from '@/componsable/book_api'

import PButton from '@/components/button/index.vue'
import PInput from '@/components/textInput/index.vue'
import sctModal from '@/components/modal/descriptionModal.vue'
import icon from '@/components/icon/index.vue'

const { getBookDetail, bookDetail, editBook, removeBook } = useBooks()

const accountLogin = getUserInfo()
const toast = useToast()

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
const imageURL = ref('')
const isOpenEdit = ref(false)

function detailClick(bookId, img) {
  isOpenModal.value = true
  modalBookId.value = bookId
  imageURL.value = img
}

async function editDetail(id) {
  await getBookDetail(id)
  isOpenEdit.value = true
  console.log(bookDetail.value)
}

function submitEdit(id) {
  editBook(id).then(() => {
    toast.success('บันทึกข้อมูลสำเร็จ', { timeout: 2000 })
    closeEdit()
    location.reload()
  })
}

function deleteBook(id) {
  removeBook(id)
  toast.success('ลบรายการสำเร็จ', { timeout: 2000 })
}

function closeEdit() {
  isOpenEdit.value = false
}
</script>
