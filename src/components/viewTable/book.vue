<template>
  <div class="grid grid-cols-5 gap-y-5 gap-x-2">
    <n-card v-for="conunt in countItems">
      <div class="">
        <img
          src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg"
          alt=""
          class="object-contain h-64 w-64"
        />
      </div>
      <h1 class="text-center font-semibold">Book Name</h1>
      <div class="detail">
        <p>โรงเรียนเทศบาลชนะชัยศรี</p>
        <p>ประเภท</p>
        <p>จำนวน</p>
      </div>
      <div class="acton flex justify-between mt-3">
        <p-button text="รายละเอียด"></p-button>
        <p-button text="ยืม" type="solid"></p-button>

      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import PButton from '@/components/button/index.vue'

const countItems = ref(10)
</script>
