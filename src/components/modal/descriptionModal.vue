<template>
  <div class="flex flex-col gap-y-3">
    <img :src="bookDetail.image" alt="" class="object-contain h-64" />
    <div class="space-y-1 h-64">
      <p><span class="font-semibold">รหัสหนังสือ:</span> {{ bookDetail.serialNumber }}</p>
      <p><span class="font-semibold">ชื่อหนังสือ:</span> {{ bookDetail.nameBook }}</p>
      <p><span class="font-semibold">โรงเรียน:</span> {{ bookDetail.school }}</p>
      <p><span class="font-semibold">ประเภท:</span> {{ bookDetail.typeBook }}</p>
      <p><span class="font-semibold">จำนวนคงเหลือ:</span> {{ bookDetail.amountBook }}</p>
      <p><span class="font-semibold">รายละเอียด:</span> {{ bookDetail.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// import PButton from '@/components/button/index.vue'

import useBooks from '@/componsable/book_api'

const { bookDetail, getBookDetail } = useBooks()

onMounted(() => {
  getBookDetail(props.bookID)
})

const props = defineProps({
  bookID: {
    type: String,
    default: null
  },
  bookImage: {
    type: String,
    default: ''
  }
})
</script>
