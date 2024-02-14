<template>
  <div class="flex flex-col gap-y-3">
    <img :src="`/image/${book.image}`" alt="" class="object-contain h-64" />
    <div class="space-y-1">
      <p><span class="font-semibold">ชื่อหนังสือ:</span> {{ book.name }}</p>
      <p><span class="font-semibold">โรงเรียน:</span> {{ book.school }}</p>
      <p><span class="font-semibold">ประเภท:</span> {{ book.type }}</p>
      <p><span class="font-semibold">จำนวนคงเหลือ:</span> {{ book.amount }}</p>
      <p><span class="font-semibold">รายละเอียด:</span> {{ book.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { bookList } from '@/constant/mockData'

const props = defineProps({
  bookID: {
    type: String,
    default: null
  }
})

const id = ref(props.bookID)
const book = ref(bookList.find((book) => book.id === id.value))
</script>
