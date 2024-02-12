<template>
  <div class="h-svh flex items-center justify-center">
    <div class="w-[560px] border p-6 rounded-lg bg-white shadow-md space-y-8">
      <h1 class="text-3xl font-bold">Login</h1>
      <div class="space-y-4">
        <p-input v-model="suser" label="Username" />
        <p-input v-model="spass" label="Password" type="password" password />
        <p>
          ท่านต้องการเข้าสู่ระบบด้วยบัญชีผู้ดูแลใช่หรือไม่
          <span @click="isOpenModal = true" class="underline text-[#7743DB] cursor-pointer"
            >เข้าสู่ระบบ</span
          >
        </p>
        <div class="flex gap-x-6 w-full">
          <router-link to="/"
            ><p-button text="Cancel" type="outline" main-class="w-32"
          /></router-link>
          <p-button text="Submit" type="solid" main-class="w-full" />
        </div>
      </div>
    </div>
  </div>

  <n-modal
    v-model:show="isOpenModal"
    class="custom-card w-[560px]"
    preset="card"
    title="Login Admin"
    :bordered="false"
    size="huge"
  >
    <div class="space-y-4">
      <p-input v-model="auser" label="Username" />
      <p-input v-model="apass" label="Password" type="password" password />
      <div class="flex gap-x-2 items-center">
        <input v-model="check" type="checkbox" class="accent-[#7743DB]" />
        <label>ต้องการเข้าสู่ระบบ</label>
      </div>
    </div>
    <template #footer>
      <div class="flex gap-x-4">
        <p-button :click="closeModal" text="Cancel" />
        <p-button text="Submit" type="solid" main-class="w-full" />
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'

import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'

const suser = ref('')
const spass = ref('')
const auser = ref('')
const apass = ref('')

const check = ref(false)

const isOpenModal = ref(false)

function closeModal() {
  isOpenModal.value = false
  console.log(isOpenModal.value)
}
</script>
