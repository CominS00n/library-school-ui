import axios from 'axios'

import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { saveUserInfo } from '@/stores/accountLogin'

const toast = useToast()
const router = useRouter()

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useStudent() {
  const studentDetails = ref([])
  const studentDerail = ref([])
  const errors = ref([])

  const getStudentDetails = async () => {
    const response = await axios.get('registerStudent')
    studentDetails.value = response
  }

  const getStudentDetail = async (id) => {
    const response = await axios.get(`registerStudent/${id}`)
    studentDerail.value = response
  }

  const addStudent = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'registerStudent',
        data: data
      })
      location.reload()
    } catch (err) {
      console.error('Error adding Student:', err)
      if (err.response && err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  const studentLogin = async (username, password) => {
    await getStudentDetails().then(() => {
      const checkUsername = studentDetails.value.find((user) => user.username === username)
      const checkPassword = checkUsername.find(
        (user) => user.username === username && user.password === password
      )
      console.log(checkUsername)
      console.log(checkPassword)

      if (!checkUsername && !checkPassword) {
        toast.error('username หรือ password ไม่ถูกต้อง', { timeout: 2000 })
      } else if (checkUsername && checkPassword) {
        saveUserInfo({
          id: checkPassword.id,
          username: checkPassword.username,
          firstName: checkPassword.firstName,
          lastName: checkPassword.lastName,
          studentNo: checkPassword.studentNo
        })
        console.log(`${checkPassword.firstName} ${checkPassword.lastName} เข้าสู่ระบบ`)
        router.push('/')
        toast.success('เข้าสู่ระบบสำเร็จ', { timeout: 2000 })
      } else {
        toast.error('username หรือ password ไม่ถูกต้อง', { timeout: 2000 })
      }
    })
  }
  return {
    errors,
    addStudent,
    getStudentDetails,
    getStudentDetail,
    studentDetails,
    studentDerail,
    studentLogin
  }
}
