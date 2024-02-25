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
      <!-- Register Admin -->
      <n-tabs type="segment" animated>
        <n-tab-pane name="admin" tab="Admin">
          <n-divider title-placement="left">Librarian</n-divider>
          <div class="lg:grid lg:grid-cols-2 gap-6 p-2 lg:space-y-0 space-y-3">
            <p-input v-model="adminData.firstName" label="First Name" />
            <p-input v-model="adminData.lastName" label="Last Name" />
            <p-input v-model="adminData.address" label="Address" class="lg:col-span-2" />
            <p-input v-model="adminData.Email" label="Email" />
            <p-input v-model="adminData.tel" label="Phone" />
            <p-input v-model="adminData.jobPostion" label="Job position" />
            <p-input v-model="adminData.school" label="School" />
            <p-input v-model="adminData.username" label="Username" />
            <p-input v-model="adminData.password" label="Password" type="password" password />
            <div class="lg:col-span-2 lg:flex gap-x-6 mt-6 space-y-3 lg:space-y-0">
              <p-button :click="cancelButton" type="outline" text="Cancel" mainClass="lg:w-64 w-full" />
              <p-button :click="adminRegister" type="solid" text="Submit" mainClass="w-full" />
            </div>
          </div>
        </n-tab-pane>

        <!-- Register Student -->
        <n-tab-pane name="student" tab="Student">
          <n-divider title-placement="left">Student</n-divider>
          <div class="lg:grid lg:grid-cols-2 gap-6 space-y-3 lg:space-y-0">
            <p-input v-model="studentData.studentNo" label="Student No." class="col-span-2" />
            <p-input v-model="studentData.firstName" label="First Name" />
            <p-input v-model="studentData.lastName" label="Last Name" />
            <p-input v-model="studentData.address" label="Address" />
            <p-input v-model="studentData.tel" label="Phone" />
            <p-input v-model="studentData.studentNo" label="Username" disabled />
            <p-input v-model="studentData.password" label="Password" type="password" password />
          </div>
          <n-divider title-placement="left">Parent</n-divider>
          <div class="lg:grid lg:grid-cols-2 gap-6 p-2">
            <p-input v-model="studentData.parentsName" label="First Name" />
            <p-input v-model="studentData.parentLastname" label="Last Name" />
            <p-input v-model="studentData.parentTel" label="Phone" class="col-span-2" />
            <div class="lg:col-span-2 lg:flex gap-x-6 mt-6 space-y-3 lg:space-y-0">
              <p-button :click="cancelButton" type="outline" text="Cancel" mainClass="lg:w-64 w-full" />
              <p-button :click="studentRegister" type="solid" text="Submit" mainClass="w-full" />
            </div>
            <!-- {{ studentData }} -->
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { reactive, ref } from 'vue'
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
  school: '',
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
    studentData.username = studentData.studentNo
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
