import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useReturnBook() {
  const returnBookDetails = ref([])
  const returnBookDetail = ref([])
  const errors = ref([])

  const getReturnBookDetails = async () => {
    const response = await axios.get('returnBook')
    returnBookDetails.value = response.data
  }

  const getReturnBookDetail = async (id) => {
    const response = await axios.get(`returnBook/${id}`)
    returnBookDetail.value = response.data
  }

  const saveReturnBook = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'returnBook',
        data: data
      })
      location.reload()
    } catch (err) {
      console.error('Error adding return book:', err)
      if (err.response && err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  return {
    returnBookDetails,
    returnBookDetail,
    errors,
    getReturnBookDetails,
    getReturnBookDetail,
    saveReturnBook
  }
}
