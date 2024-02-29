<template>
  <div v-if="props.bookData.length === 0" class="flex justify-center items-center h-80">
    <n-empty description="ไม่พบข้อมูล">
      <template #extra>
        <!-- <n-button size="small"> Find Something New </n-button> -->
      </template>
    </n-empty>
  </div>
  <div class="grid gap-y-2">
    <div
      class="relative border p-4 grid grid-cols-12 items-center gap-x-5"
      v-for="book in bookDetails"
      :key="book.id"
    >
      <div
        v-if="accountLogin.role === 'admin'"
        class="absolute top-2 right-4 flex gap-x-2 justify-center items-center"
      >
        <button
          class="p-2 rounded-full hover:border hover:border-[#C3ACD0]"
          @click="editDetail(book.id)"
        >
          <icon icon="heroicons-outline:pencil" class="cursor-pointer" />
        </button>
        <!-- <button
          class="p-2 rounded-full hover:border hover:border-[#C3ACD0]"
          @click="deleteBook(book.id)"
        >
          <icon icon="heroicons-outline:trash" class="cursor-pointer" />
        </button> -->
      </div>
      <div class="">
        <img :src="book.image" alt="image" class="object-contain h-32 w-24" />
      </div>
      <div class="col-span-11 grid grid-cols-6">
        <div class="flex flex-col justify-center">
          <h3 class="font-bold">{{ book.nameBook }}</h3>
          <p>{{ book.school }}</p>
        </div>
        <div class="p-3">
          <p class="font-semibold">ประเภท</p>
          <p>{{ book.typeBook }}</p>
        </div>
        <div class="col-span-3 p-3">
          <p class="font-semibold">Description</p>
          <p>
            {{ book.description }}
          </p>
        </div>
        <div class="flex items-center justify-center">
          <router-link :to="`/borrow-book/${book.id}`">
            <p-button text="ยืม" type="outline"></p-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

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
import { onMounted, ref } from 'vue'
import { getUserInfo } from '@/stores/accountLogin'
import { useToast } from 'vue-toastification'

import useBooks from '@/componsable/book_api'

import PButton from '@/components/button/index.vue'
import PInput from '@/components/textInput/index.vue'
import icon from '@/components/icon/index.vue'

const { getBookDetails, bookDetails, getBookDetail, bookDetail, editBook, removeBook } = useBooks()

onMounted(() => {
  getBookDetails()
})

const accountLogin = getUserInfo()
const toast = useToast()
const isOpenEdit = ref(false)

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
  console.log(id)
  removeBook(id)
  toast.success('ลบรายการสำเร็จ', { timeout: 2000 })
}

function closeEdit() {
  isOpenEdit.value = false
}
</script>
