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
    <n-tabs type="line" animated>
      <n-tab-pane name="student" tab="นักเรียน">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th v-for="(head, i) in student_heads" :key="i">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(studentDetail, i) in studentDetails"
              :key="i"
              :class="`${i % 2 !== 0 ? 'bg-gray-100' : ''}`"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ studentDetail.studentNo }}</td>
              <td>{{ studentDetail.firstName }}</td>
              <td>{{ studentDetail.lastName }}</td>
              <td>{{ studentDetail.address }}</td>
              <td>{{ studentDetail.tel }}</td>
              <td>{{ studentDetail.parentsName }} {{ studentDetail.parentLastname }}</td>
              <td>{{ studentDetail.parentTel }}</td>
            </tr>
          </tbody>
        </table>
      </n-tab-pane>
      <n-tab-pane name="admin" tab="ผู้ดูแลระบบ">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th v-for="(head, i) in admin_heads" :key="i">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(adminDetail, i) in adminDetails"
              :key="i"
              :class="`${i % 2 !== 0 ? 'bg-gray-100' : ''}`"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ adminDetail.firstName }}</td>
              <td>{{ adminDetail.lastName }}</td>
              <td>{{ adminDetail.address }}</td>
              <td>{{ adminDetail.Email }}</td>
              <td>{{ adminDetail.tel }}</td>
              <td>{{ adminDetail.jobPostion }}</td>
              <td>{{ adminDetail.school }}</td>
            </tr>
          </tbody>
        </table>
      </n-tab-pane>
    </n-tabs>
  </TransitionRoot>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'

import useStudent from '@/componsable/student'
import useAdmin from '@/componsable/admin'

const { getStudentDetails, studentDetails } = useStudent()
const { getAdminDetails, adminDetails } = useAdmin()

onMounted(() => {
  getStudentDetails()
  getAdminDetails()
})

const student_heads = ref([
  'ลำดับ',
  'รหัสนักเรียน',
  'ชื่อ',
  'นามสกุล',
  'ที่อยู่',
  'เบอร์โทร',
  'ชื่อผู้ปกครอง',
  'เบอร์โทรผู้ปกครอง'
])

const admin_heads = ref([
  'ลำดับ',
  'ชื่อ',
  'นามสกุล',
  'ที่อยู่',
  'Email',
  'เบอร์โทร',
  'ตำแหน่งงาน',
  'โรงเรียน'
])
</script>
