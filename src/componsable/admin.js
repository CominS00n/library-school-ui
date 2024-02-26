import axios from 'axios'

import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { saveUserInfo } from '@/stores/accountLogin'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useAdmin() {
  const adminDetails = ref([])
  const adminDetail = ref([])
  const errors = ref([])

  const toast = useToast()
  const router = useRouter()
  const getAdminDetails = async () => {
    const response = await axios.get('registerTeacher')
    adminDetails.value = response.data
  }

  const getAdminDetail = async (id) => {
    const response = await axios.get(`registerTeacher/${id}`)
    adminDetail.value = response.data
  }

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

  const adminLogin = async (username, password) => {
    await getAdminDetails().then(() => {
      const checkUsername = adminDetails.value.find(
        (user) => user.username === username && user.password === password
      )

      if (checkUsername) {
        saveUserInfo({
          id: checkUsername.id,
          username: checkUsername.username,
          firstName: checkUsername.firstName,
          lastName: checkUsername.lastName
        })
        console.log(`${checkUsername.firstName} ${checkUsername}`)
        toast.success('เข้าสู่ระบบสำเร็จ', { timeout: 2000 })
        router.push('/admin')
      } else {
        toast.error('username หรือ password ไม่ถูกต้อง', { timeout: 2000 })
      }
    })
  }
  return {
    errors,
    addAdmin,
    adminDetail,
    adminDetails,
    getAdminDetail,
    getAdminDetails,
    adminLogin
  }
}
