<template>
  <div class="grid gap-y-2">
    <div
      class="border p-4 grid grid-cols-12 items-center gap-x-5"
      v-for="conut in counts"
    >
      <div class="">
        <img
          src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg"
          alt="image"
          class="object-contain h-32 w-24"
        />
      </div>
      <div class="col-span-11 grid grid-cols-5">
        <div class="flex flex-col justify-center">
          <h3 class="font-bold">Book Name</h3>
          <p>โรงเรียนเทศบาลชนะชัยศรี</p>
        </div>
        <div class="col-span-3">
          <p>Description</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt tempore, excepturi
            architecto culpa, autem ipsa adipisci ab esse maxime nam quibusdam ullam veritatis omnis
            neque earum eos aperiam quas rem.
          </p>
        </div>
        <div class="flex items-center justify-center">
          <p-button text="Borrow" type="outline"></p-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import PButton from '@/components/button/index.vue'

const counts = ref(20)
</script>
