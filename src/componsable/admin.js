import { ref } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useAdmin() {
  
  const errors = ref([])
  
  const addAdmin = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'registerTeacher',
        data: data
      })
      location.reload()
    } catch (err) {
      console.error('Error adding teacher:', err)
      if (err.response && err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }
  return {
    errors,
    addAdmin
  }
}
