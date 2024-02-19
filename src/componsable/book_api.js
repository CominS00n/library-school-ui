import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

// const api_path = ref('bookList')
const toast = useToast()

export default function useBooks() {
  const bookDetails = ref([])
  const bookDetail = ref([])
  const errors = ref([])

  const getBookDetails = async () => {
    const response = await axios.get('bookList')
    bookDetails.value = response.data
  }

  const getBookDetail = async (id) => {
    const response = await axios.get(`bookList/${id}`)
    bookDetail.value = response.data
  }

  const addBook = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'bookList',
        data: data
      })
      location.reload()
      toast.success('บันทึกรายการหนังสือ', { timeout: 2000 })
    } catch (error) {
      console.error('Error adding Book:', error)
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }
  return {
    bookDetails,
    bookDetail,
    errors,
    getBookDetails,
    getBookDetail,
    addBook
  }
}
