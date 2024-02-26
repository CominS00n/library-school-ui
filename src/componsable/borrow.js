import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useBorrowBook() {
  const borrowDetails = ref([])
  const borrowDetail = ref([])
  const errors = ref([])

  const getBorrowDetails = async () => {
    const response = await axios.get('lendBook')
    borrowDetails.value = response.data
  }

  const getBorrowDetail = async (id) => {
    const response = await axios.get(`lendBook/${id}`)
    borrowDetail.value = response.data
  }

  const editBorrowBook = async (id) => {
    try {
      await axios.put(`lendBook/${id}`, borrowDetail.value)
      console.log('Changing success')
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const saveBorrowBook = async (data) => {
    console.log(data)
    try {
      await axios({
        method: 'post',
        url: 'lendBook',
        data: data
      })
      location.reload()
    } catch (err) {
      console.error('Error adding borrow:', err)
      if (err.response && err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  return {
    errors,
    getBorrowDetails,
    borrowDetails,
    borrowDetail,
    getBorrowDetail,
    editBorrowBook,
    saveBorrowBook
  }
}
