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
    <div class="flex justify-center items-center h-svh">
      <div class="grid grid-cols-2 bg-white shadow-lg p-6 rounded-md border">
        <button
          @click="goBack"
          class="w-fit p-2 rounded-xl hover:bg-[#C3ACD0] hover:border-white hover:text-white"
        >
          <icon icon="heroicons-outline:arrow-long-left" class="text-3xl" />
        </button>
        <span class="col-span-2 uppercase text-3xl font-semibold mb-6">Borrow book</span>
        <div class="flex flex-col items-center justify-center gap-y-3">
          <img :src="bookDetail.image" alt="" class="object-contain h-96" />
          <p>{{ bookDetail.school }} / {{ bookDetail.typeBook }} / {{ bookDetail.amountBook }}</p>
        </div>
        <div class="grid content-start gap-3">
          <p class="col-span-2 font-semibold mb-3">ข้อมูลการยืม</p>
          <p-input v-model="bookDetail.nameBook" label="" disabled />
          <p-input
            v-model="borrowData.amountBook"
            type="number"
            label=""
            placeholder="จำนวน(เล่ม)"
          />
          <p-input
            v-model="insertStudentNo"
            label="รหัสนักเรียน"
            placeholder="เช่น 12312241"
            class="col-span-2"
          />
          <p-input v-if="filteredStudent.length > 1" label="ชื่อ" placeholder="กรอกชื่อ" />
          <p-input v-if="filteredStudent.length > 1" label="นามสกุล" placeholder="กรอกนามสกุล" />
          <p-input
            v-if="filteredStudent.length === 1"
            v-model="filteredStudent[0].firstName"
            label="ชื่อ"
            placeholder="กรอกชื่อ"
            disabled
          />
          <p-input
            v-if="filteredStudent.length === 1"
            v-model="filteredStudent[0].lastName"
            label="นามสกุล"
            placeholder="กรอกนามสกุล"
            disabled
          />
          <p-input
            v-if="filteredStudent.length > 1"
            label="เบอร์โทร"
            placeholder="กรอกเบอร์โทรผู้ปกครอง"
          />
          <p-input
            v-if="filteredStudent.length === 1"
            v-model="filteredStudent[0].parentTel"
            label="เบอร์โทร"
            placeholder="กรอกเบอร์โทรผู้ปกครอง"
          />
          <p-input v-model="borrowData.borrowingDate" label="วันที่ยืม" type="date" />
          <!-- <p-input label="วันที่คืน" type="date" /> -->
        </div>
        <div class="col-span-2 flex justify-end gap-x-3 mt-3">
          <p-button :click="goBack" type="outline" text="ยกเลิก" main-class="w-32" />
          <p-button
            type="solid"
            text="ยืม"
            :main-class="`w-72 ${bookDetail.amountBook === 0 ? 'cursor-no-drop bg-gray-300 border-gray-300 hover:bg-gray-300 hover:border-gray-300' : ''}`"
            :disabled="bookDetail.amountBook === 0"
            :click="submit"
          />
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import useBooks from '@/componsable/book_api'
import useBorrowBook from '@/componsable/borrow'
import useStudent from '@/componsable/student'

import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'
import icon from '@/components/icon/index.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const { bookDetail, getBookDetail, editBook } = useBooks()
const { studentDetails, getStudentDetails } = useStudent()
const { saveBorrowBook } = useBorrowBook()

onMounted(() => {
  getStudentDetails()
  getBookDetail(id.value)
})

const id = ref(route.params.id)

const insertStudentNo = ref('')

const borrowData = reactive({
  bookId: route.params.id,
  studentNo: '',
  firstName: '',
  lastName: '',
  tel: '',
  borrowingDate: '',
  returnBook: '',
  amountBook: '',
  status: 'unreturned' //returned
})

function submit() {
  // console.log('Before Data: ' + bookDetail.value.amountBook)
  if (
    !borrowData.bookId ||
    !borrowData.studentNo ||
    !borrowData.firstName ||
    !borrowData.lastName ||
    !borrowData.tel ||
    !borrowData.borrowingDate ||
    !borrowData.amountBook
  ) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', { timeout: 2000 })
  } else {
    if (borrowData.amountBook > bookDetail.value.amountBook) {
      toast.error('จำนวนหนังสือมีไม่พอ', { timeout: 2000 })
    } else {
      bookDetail.value.amountBook -= borrowData.amountBook
      saveBorrowBook(borrowData)
      editBook(id.value)
    }
  }
}

const filteredStudent = computed(() => {
  const lowerCaseSearchTerm = insertStudentNo.value.toLowerCase()
  return studentDetails.value.filter((student) => {
    return student.studentNo.toLowerCase().includes(lowerCaseSearchTerm)
  })
})

function onStudentNoChange() {
  const studentNo = insertStudentNo.value.toLowerCase()
  const matchingStudents = studentDetails.value.filter((student) => {
    return student.studentNo.toLowerCase() === studentNo
  })

  if (matchingStudents.length > 0) {
    borrowData.studentNo = matchingStudents[0].id
    borrowData.firstName = matchingStudents[0].firstName
    borrowData.lastName = matchingStudents[0].lastName
    borrowData.tel = matchingStudents[0].parentTel
  } else {
    borrowData.firstName = ''
    borrowData.lastName = ''
  }
}

watch(insertStudentNo, onStudentNoChange)

function goBack() {
  router.go(-1)
}
</script>
