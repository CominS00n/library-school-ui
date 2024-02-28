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
    <div>
      <n-tabs type="segment" animated>
        <!-- Register Student -->
        <n-tab-pane name="student" tab="นักเรียน">
          <n-divider title-placement="left">ข้อมูลนักเรียน</n-divider>
          <div class="lg:grid lg:grid-cols-2 gap-6 space-y-3 lg:space-y-0">
            <p-input
              v-model="studentData.studentNo"
              label="รหัสนักเรียน"
              placeholder="ตัวอย่าง 12312231"
              class="col-span-2"
            />
            <p-input v-model="studentData.firstName" label="ชื่อ" placeholder="ชื่อนักเรียน" />
            <p-input v-model="studentData.lastName" label="นามสกุล" placeholder="นามสกุลนักเรียน" />
            <p-input v-model="studentData.address" label="ที่อยู่" placeholder="ที่อยู่" />
            <p-input v-model="studentData.tel" label="เบอร์โทรศัพท์" placeholder="เบอร์โทรศัพท์" />
            <p-input v-model="studentData.studentNo" label="Username" disabled />
            <p-input
              v-model="studentData.password"
              label="Password"
              type="password"
              placeholder="password"
              password
            />
          </div>
          <n-divider title-placement="left">ข้อมูลผู้ปกครอง</n-divider>
          <div class="lg:grid lg:grid-cols-2 gap-6 p-2">
            <p-input v-model="studentData.parentsName" label="ชื่อ" placeholder="ชื่อผู้ปกครอง" />
            <p-input
              v-model="studentData.parentLastname"
              label="นามสกุล"
              placeholder="นามสกุลผู้ปกครอง"
            />
            <p-input
              v-model="studentData.parentTel"
              label="เบอร์โทรศัพท์"
              placeholder="เบอร์โทรศัพท์"
              class="col-span-2"
            />
            <div class="lg:col-span-2 lg:flex gap-x-6 mt-6 space-y-3 lg:space-y-0">
              <p-button
                :click="cancelButton"
                type="outline"
                text="ยกเลิก"
                mainClass="lg:w-64 w-full"
              />
              <p-button :click="studentRegister" type="solid" text="สมัครสมาชิก" mainClass="w-full" />
            </div>
          </div>
        </n-tab-pane>

        <!-- Register Admin -->
        <n-tab-pane name="admin" tab="ผู้ดูแล">
          <n-divider title-placement="left">ข้อมูลบรรณารักษ์</n-divider>
          <div class="lg:grid lg:grid-cols-2 gap-6 p-2 lg:space-y-0 space-y-3">
            <p-input v-model="adminData.firstName" label="ชื่อ" placeholder="ชื่อบรรณารักษ์" />
            <p-input v-model="adminData.lastName" label="นามสกุล" placeholder="นามสกุลบรรณารักษ์" />
            <p-input v-model="adminData.address" label="ที่อยู่" placeholder="ที่อยู่" class="lg:col-span-2" />
            <p-input v-model="adminData.Email" label="E-mail" placeholder="email" />
            <p-input v-model="adminData.tel" label="เบอร์โทรศัพท์" placeholder="เบอร์โทรศัพท์" />
            <p-input v-model="adminData.jobPostion" label="ตำแหน่งงาน" placeholder="ตำแหน่งงาน" />
            <p-input v-model="adminData.school" label="โรงเรียน" />
            <p-input v-model="adminData.username" label="Username" placeholder="username" />
            <p-input v-model="adminData.password" label="Password" type="password" placeholder="password" password />
            <div class="lg:col-span-2 lg:flex gap-x-6 mt-6 space-y-3 lg:space-y-0">
              <p-button
                :click="cancelButton"
                type="outline"
                text="ยกเลิก"
                mainClass="lg:w-64 w-full"
              />
              <p-button :click="adminRegister" type="solid" text="สมัครสมาชิก" mainClass="w-full" />
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import useStudent from '@/componsable/student.js'
import useAdmin from '@/componsable/admin'

import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'

const { addStudent } = useStudent()
const { addAdmin } = useAdmin()

const router = useRouter()
const toast = useToast()

const studentData = reactive({
  studentNo: '',
  firstName: '',
  lastName: '',
  address: '',
  tel: '',
  username: '',
  password: '',
  parentsName: '',
  parentLastname: '',
  parentTel: ''
})

const adminData = reactive({
  firstName: '',
  lastName: '',
  address: '',
  Email: '',
  tel: '',
  jobPostion: '',
  school: 'โรงเรียนเทศบาลชนะชัยศรี',
  username: '',
  password: ''
})

function studentRegister() {
  if (
    !studentData.studentNo ||
    !studentData.firstName ||
    !studentData.lastName ||
    !studentData.address ||
    !studentData.tel ||
    !studentData.password ||
    !studentData.parentsName ||
    !studentData.parentLastname ||
    !studentData.parentTel
  ) {
    toast.error('กรอกข้อมูลไม่ครบถ้วน', { timeout: 2000 })
  } else {
    if (studentData.username === '') {
      studentData.username = studentData.studentNo
    }
    addStudent(studentData)
    toast.success('สมัครสมาชิกสำเร็จ', { timeout: 2000 })
  }
}

function adminRegister() {
  if (
    !adminData.firstName ||
    !adminData.lastName ||
    !adminData.address ||
    !adminData.Email ||
    !adminData.jobPostion ||
    !adminData.username ||
    !adminData.password ||
    !adminData.tel ||
    !adminData.school
  ) {
    toast.error('กรอกข้อมูลไม่ครบถ้วน', { timeout: 2000 })
  } else {
    addAdmin(adminData)
    toast.success('สมัครสมาชิกสำเร็จ', { timeout: 2000 })
  }
}

const cancelButton = () => {
  router.push('/admin')
}
</script>
