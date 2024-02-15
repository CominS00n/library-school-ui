<template>
  <div class="shadow-md border rounded-lg p-3">
    <div class="flex divide-x">
      <div class="flex flex-col justify-center items-center gap-y-3 w-full p-3">
        <div class="flex justify-center items-center h-96 w-fit" v-if="!imageUrl">
          <icon icon="heroicons-outline:photo" class="text-5xl" />
        </div>
        <!-- <img src="" alt="preview" class="h-96 w-fit" v-if="!imageUrl" /> -->
        <img :src="imageUrl" alt="preview" class="h-96 w-fit" v-if="imageUrl" />
        <div class="flex items-center gap-x-2">
          <input
            @change="handleImageUpload"
            type="file"
            name="image"
            id="imageInput"
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
      <p-button :click="() => submit()" text="ตกลง" type="solid" main-class="w-80" />
      <!-- <button @click="submit(data)">click</button> -->
    </div>
    {{ data }}
    <!-- {{ imageUrl }} -->
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { bookTypes } from '@/constant/mockData'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import useBooks from '@/componsable/book_api'

import PInput from '@/components/textInput/index.vue'
import PSelect from '@/components/select/index.vue'
import PButton from '@/components/button/index.vue'
import icon from '@/components/icon/index.vue'

const { addBook } = useBooks()

const router = useRouter()
const toast = useToast()

const imageUrl = ref('')
const file = ref(null)

const typeBookSelect = bookTypes.slice(1).sort()

const data = reactive({
  name: '',
  school: 'โรงเรียนเทศบาลชนะชัยศรี',
  type: '',
  amount: 0,
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
  if (!data.name || !data.type || !data.amount || !data.image) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', { timeout: 2000 })
  } else {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('school', data.school)
    formData.append('type', data.type)
    formData.append('amount', data.amount)
    formData.append('description', data.description)
    formData.append('image', file.value)
    formData.append('borrowData', data.borrowData)

    // check value 
    // for (const value of formData.values()) {
    //   console.log(value)
    // }
    addBook(formData)
  }
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
