<template>
  >
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
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th v-for="head in headers">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(borrow, i) in borrowDetails">
              <td>{{ i + 1 }}</td>
              <td>
                <img :src="getBookInfo(borrow.bookId).image" alt="" class="h-24 w-24" />
              </td>
              <td>{{ getBookInfo(borrow.bookId).nameBook }}</td>
              <td>
                {{ getUserBorrow(borrow.studentNo).firstName }}
                {{ getUserBorrow(borrow.studentNo).lastName }}
              </td>
              <td>{{ borrow.borrowingDate }}</td>
              <td>{{ borrow.returnBook }}</td>
              <td>{{ borrow.status }}</td>
              <td>
                <p-button
                  :click="
                    () =>
                      isOpenBorrowBook(
                        borrow.id,
                        getBookInfo(borrow.bookId).nameBook,
                        getBookInfo(borrow.bookId).id,
                        getUserBorrow(borrow.studentNo).studentNo
                      )
                  "
                  type="outline"
                  text="คืน"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </TransitionRoot>

  <n-modal
    v-model:show="openBorrowBook"
    class="custom-card w-[560px]"
    preset="card"
    :title="returnData.nameBook"
    :bordered="false"
    size="huge"
  >
    <div class="space-y-4">
      <p-input v-model="returnData.studentNo" label="รหัสนักเรียน" disabled />
      <p-input v-model="returnData.firstName" label="ชื่อ" />
      <p-input v-model="returnData.lastName" label="นามสกุล" />
      <p-input v-model="returnData.tel" label="เบอร์โทร" />
      <p-input v-model="borrowDetail.borrowingDate" label="วันที่ยืม" type="date" disabled />
      <p-input v-model="returnBook.returnBook" label="วันที่คืน" type="date" />
    </div>
    {{ returnData }}
    <template #footer>
      <div class="flex gap-x-4">
        <p-button :click="isCloseBorrowBook" text="Cancel" />
        <p-button
          :click="() => returnBook(borrowDetail.borrowingDate)"
          text="Submit"
          type="solid"
          main-class="w-full"
        />
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
// import { borrows, bookList } from '@/constant/mockData'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import { differenceInDays } from 'date-fns'

import useBorrowBook from '@/componsable/borrow'
import useStudent from '@/componsable/student'
import useBooks from '@/componsable/book_api'

import PButton from '@/components/button/index.vue'
import PInput from '@/components/textInput/index.vue'

const toast = useToast()

const { getBorrowDetails, borrowDetails, getBorrowDetail, borrowDetail } = useBorrowBook()
const { getStudentDetails, studentDetails } = useStudent()
const { getBookDetails, bookDetails } = useBooks()

onMounted(() => {
  getStudentDetails()
  getBookDetails()
  getBorrowDetails()
})

const headers = ref([
  'ลำดับ',
  'Image',
  'Book Name',
  'Borrow Name',
  'Date Borrow',
  'Date Return',
  'Status',
  'Action'
])

const returnData = reactive({
  nameBook: '',
  bookId: '',
  studentNo: '',
  firstName: '',
  lastName: '',
  tel: '',
  returnBook: new Date(),
  amountBook: ''
})

const openBorrowBook = ref(false)

async function isOpenBorrowBook(id, bookName, bookID, studentNo) {
  await getBorrowDetail(id)
  openBorrowBook.value = true
  console.log(borrowDetail.value)
  returnData.nameBook = bookName
  returnData.studentNo = studentNo
  returnData.firstName = borrowDetail.value.firstName
  returnData.lastName = borrowDetail.value.lastName
  returnData.tel = borrowDetail.value.tel
  returnData.amountBook = borrowDetail.value.amountBook
}

function isCloseBorrowBook() {
  openBorrowBook.value = !openBorrowBook.value
}

// const isShowAlert = ref(false)

async function returnBook(borrowingDate) {
  console.log(borrowingDate)
  console.log(returnData.returnBook)
  let date1 = new Date(borrowingDate)
  let dayDiff = differenceInDays(returnData.returnBook, date1)
  const fine = ref(0)

  if (dayDiff > 3) {
    console.log(dayDiff + ' วัน')
    fine.value = (dayDiff - 3) * 20
    toast.info(`ยืมทั้งหมด ${dayDiff} ต้องเสียค่าปรับ ${fine.value} บาท`, {
      timeout: false,
      icon: false
    })
  }

  toast.success('ทำรายสำเร็จ', { timeout: 2000 })
  isCloseBorrowBook()
}

const getUserBorrow = (studentNo) => {
  const userBorrow = studentDetails.value.find((item) => item.id === studentNo)
  return userBorrow || { firstName: 'N/A', lastName: 'N/A' }
}

const getBookInfo = (bookId) => {
  const bookInfo = bookDetails.value.find((item) => item.id === bookId)
  return bookInfo || { nameBook: 'N/A', image: 'path-to-default-image' }
}
</script>
