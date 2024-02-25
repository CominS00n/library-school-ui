import { ref } from 'vue'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

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
    } catch (error) {
      console.error('Error adding Book:', error)
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }

  const editBook = async (id) => {
    try {
      await axios.put(`bookList/${id}`, bookDetail.value)
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }
  return {
    bookDetails,
    bookDetail,
    errors,
    getBookDetails,
    getBookDetail,
    addBook,
    editBook
  }
}
