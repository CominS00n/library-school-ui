<template>
  <TransitionRoot
    appear
    :show="true"
    enter="ease-out duration-300"
    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to="opacity-100 translate-y-0 sm:scale-100"
    leave="ease-in duration-200"
    leave-from="opacity-100 translate-y-0 sm:scale-100"
    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
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
              ><p-button text="ยกเลิก" type="outline" main-class="w-32"
            /></router-link>
            <p-button :click="loginStudent" text="เข้าสู่ระบบ" type="solid" main-class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </TransitionRoot>

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
        <p-button :click="closeModal" text="ยกเลิก" />
        <p-button :click="loginAdmin" text="เข้าสู่ระบบ" type="solid" main-class="w-full" />
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'
// import { student, Admin } from '@/constant/mockData'
// import { saveUserInfo } from '@/stores/accountLogin'

import useAdmin from '@/componsable/admin'
import useStudent from '@/componsable/student'

import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'

const { studentLogin, getStudentDetails } = useStudent()
const { adminLogin, getAdminDetails } = useAdmin()

onMounted(() => {
  getStudentDetails()
  getAdminDetails()
})

const suser = ref('132234001') // Input Student Username
const spass = ref('password') // Input Student Password
const auser = ref('admin') // Input Admin Username
const apass = ref('admin') // Input Admin Password

const check = ref(false)
const isOpenModal = ref(false)

// const router = useRouter()
const toast = useToast()

function closeModal() {
  isOpenModal.value = false
}

function loginStudent() {
  if (!suser.value || !spass.value) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
  } else {
    studentLogin(suser.value, spass.value)
  }
}

function loginAdmin() {
  if (!auser.value || !apass.value) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
  } else if (!check.value) {
    toast.error('กรุณายืนยันการเข้าสู่ระบบ', { timeout: 2000 })
  } else {
    adminLogin(auser.value, apass.value)
  }
}
</script>
