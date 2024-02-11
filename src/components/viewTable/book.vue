<template>
  <div class="grid grid-cols-5 gap-y-5 gap-x-2">
    <n-card v-for="book in bookList" class="h-[460px]" :key="book.id">
      <div class="">
        <img
          :src="`/image/${book.image}`"
          alt=""
          class="object-contain h-64 w-64"
        />
      </div>
      <h1 class="text-center font-semibold h-12">{{ book.name }}</h1>
      <div class="detail">
        <p>{{ book.school }}</p>
        <p>ประเภท: {{ book.type }}</p>
        <p>จำนวน: {{ book.amount }}</p>
        {{ book.borrowData }}
      </div>
      <div class="acton flex mt-3 justify-between">
        <p-button text="รายละเอียด"></p-button>
        <p-button text="ยืม" type="solid"></p-button>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { bookList } from '@/constant/mockData';

import PButton from '@/components/button/index.vue'

</script>
