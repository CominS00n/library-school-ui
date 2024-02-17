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
              ><p-button text="Cancel" type="outline" main-class="w-32"
            /></router-link>
            <p-button :click="loginStudent" text="Submit" type="solid" main-class="w-full" />
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
        <p-button :click="closeModal" text="Cancel" />
        <p-button :click="loginAdmin" text="Submit" type="solid" main-class="w-full" />
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import { student, Admin } from '@/constant/mockData'
import { saveUserInfo } from '@/stores/accountLogin'

import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'

const suser = ref('132234001')
const spass = ref('password')
const auser = ref('admin')
const apass = ref('admin')

const check = ref(false)
const isOpenModal = ref(false)

const router = useRouter()
const toast = useToast()

function closeModal() {
  isOpenModal.value = false
}

function loginStudent() {
  const foundStudent = student.find(
    (item) => item.username === suser.value && item.pass === spass.value
  )
  if (foundStudent) {
    saveUserInfo({
      username: foundStudent.username,
      firstName: foundStudent.fname,
      lastName: foundStudent.lname,
      studentNo: foundStudent.studentNo,
      parentFirstName: foundStudent.pfname,
      parentLastName: foundStudent.plname,
      parentPhone: foundStudent.pphone
    })
    console.log(`${foundStudent.fname}  ${foundStudent.lname} เข้าสู่ระบบ`)
    router.push('/')
    toast.success('เข้าสู่ระบบสำเร็จ', { timeout: 2000 })
  } else {
    console.log('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
  }
}

function loginAdmin() {
  const foundAdmin = Admin.find(
    (item) => item.username === auser.value && item.password === apass.value
  )
  if (!check.value) {
    toast.error('กรุณายืนยันการเข้าสู่ระบบ', { timeout: 2000 })
    console.log('กรุณายืนยันการเข้าสู่ระบบ')
  } else if (foundAdmin) {
    saveUserInfo({
      username: foundAdmin.username,
      firstName: foundAdmin.fname,
      lastName: foundAdmin.lname,
      email: foundAdmin.email
    })
    toast.success('เข้าสู่ระบบสำเร็จ', { timeout: 2000 })
    console.log(`${foundAdmin.fname}  ${foundAdmin.lname} เข้าสู่ระบบ`)
    router.push('/admin')
  } else {
    toast.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', { timeout: 2000 })
    console.log('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
  }
}
</script>
