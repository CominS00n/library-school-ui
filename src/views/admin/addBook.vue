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
          <div class="flex justify-center items-center h-96 w-fit" v-if="!data.imageUrl">
            <icon icon="heroicons-outline:photo" class="text-5xl" />
          </div>
          <!-- <img src="" alt="preview" class="h-96 w-fit" v-if="!imageUrl" /> -->
          <img :src="imageUrl" alt="preview" class="h-96 w-fit" v-if="data.imageUrl" />
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
        <p-button :click="submit" text="ตกลง" type="solid" main-class="w-80" />
      </div>
      <!-- {{ data }} -->
    </div>
  </TransitionRoot>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { bookTypes } from '@/constant/mockData'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { TransitionRoot } from '@headlessui/vue'

import PInput from '@/components/textInput/index.vue'
import PSelect from '@/components/select/index.vue'
import PButton from '@/components/button/index.vue'
import icon from '@/components/icon/index.vue'

const router = useRouter()
const toast = useToast()

const imageUrl = ref('')

const typeBookSelect = bookTypes.slice(1).sort()

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
  const file = event.target.files[0]
  if (file) {
    data.image = file
    imageUrl.value = URL.createObjectURL(file)
  }
}

function handleSelectBook(value) {
  data.type = value
}

function submit() {
  toast.success('เพิ่มรายการหนังสือสำเร็จ', { timeout: 2000 })
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
