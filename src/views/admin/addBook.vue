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
    <div class="shadow-md border rounded-lg p-3">
      <div class="flex divide-x">
        <div class="flex flex-col justify-center items-center gap-y-3 w-full p-3">
          <div class="flex justify-center items-center h-96 w-fit" v-if="!imageUrl">
            <icon icon="heroicons-outline:photo" class="text-5xl" />
          </div>
          <img :src="imageUrl" alt="preview" class="h-96 w-fit" v-if="imageUrl" />
          <div class="flex items-center gap-x-2">
            <input
              @change="handleImageUpload"
              type="file"
              ref="myFile"
              class="block pr-4 w-fit border border-gray-200 shadow-sm rounded-full text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4"
            />
          </div>
        </div>
        <div class="w-full p-3 space-y-3">
          <p-input v-model="data.name" label="ชื่อหนังสือ" placeholder="กรอกชื่อหนังสือ" />
          <p-input v-model="data.school" label="โรงเรียน" placeholder="โรงเรียน" />
          <p-select
            @select="handleSelectBook"
            :menuLists="typeBookSelect"
            placeholder="เลือกประเภท"
            label="ประเภท"
          />
          <p-input v-model="data.amount" label="จำนวน" placeholder="จำนวน" />
          <p-input v-model="data.description" label="รายละเอียด" placeholder="รายละเอียด" />
        </div>
      </div>
      <div class="flex justify-end gap-x-3">
        <p-button :click="goBack" text="ยกเลิก" type="outline" main-class="w-32" />
        <p-button :click="submit" text="ตกลง" type="solid" main-class="w-80" />
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { bookTypes } from '@/constant/mockData'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { TransitionRoot } from '@headlessui/vue'
import { storage } from '@/stores/firebase'
import { uploadBytes } from '@firebase/storage'

import useBooks from '@/componsable/book_api'

import PInput from '@/components/textInput/index.vue'
import PSelect from '@/components/select/index.vue'
import PButton from '@/components/button/index.vue'
import icon from '@/components/icon/index.vue'

const { addBook } = useBooks()

const router = useRouter()
const toast = useToast()

const imageUrl = ref('')
const file = ref()

const typeBookSelect = bookTypes.slice(1).sort()
const uploadImagePath = ref('folder/myfile.png')

const data = reactive({
  name: '',
  school: 'โรงเรียนเทศบาลชนะชัยศรี',
  type: '',
  amount: '',
  description: '',
  image: null,
  borrowData: 0
})

const handleImageUpload = (event) => {
  file.value = event.target.files[0]
  if (file.value) {
    data.image = file.value
    imageUrl.value = URL.createObjectURL(file.value)
  }
}

function handleSelectBook(value) {
  data.type = value
}

function submit() {
  // if (!data.name || !data.type || !data.amount ) {
  //   toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', { timeout: 2000 })
  // } else {
    // const formData = new FormData()
    // formData.append('nameBook', data.name)
    // formData.append('school', data.school)
    // formData.append('typeBook', data.type)
    // formData.append('amountBook', data.amount)
    // formData.append('description', data.description)
    // formData.append('image', file.value)
    // formData.append('borrowData', data.borrowData)
    // check values&keys in formData a
    // for (const value of formData.values()) {
    //   console.log(value)
    // }
    uploadToFirebase()
    // addBook(formData)
  // }
}


const uploadToFirebase = () => {
  const fileName = file.value.name
  const storageRef = ref(storage, `folder/${fileName}`)
  const objectFile = file.value

  uploadBytes(storageRef, objectFile)
  .then((snapshot) => {
    console.log('Upload Successful')
    uploadImagePath.value = snapshot.metadata.fullPath
    console.log(uploadImagePath)
  })
}

function goBack() {
  data.image = null
  imageUrl.value = ''
  data.name = ''
  data.school = 'โรงเรียนเทศบาลชนะชัยศรี'
  data.type = ''
  data.amount = ''
  data.description = ''
  router.push('/admin')
}
</script>
