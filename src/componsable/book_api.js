import { ref } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('bookList')

export default function useBooks() {
  const bookDetails = ref([])
  const bookDetail = ref([])
  const errors = ref([])

  const getBookDetails = async () => {
    const response = await axios.get(api_path)
    bookDetails.value = response.data
  }

  const getBookDetail = async (id) => {
    const response = await axios.get(`bookList/${id}`)
    bookDetail.value = response.data
  }

  const addBook = async (data, file) => {
    // axios
    //   .post('bookList', formData, {
    //     headers: {
    //       name: data.name,
    //       school: data.school,
    //       type: data.type,
    //       amount: data.amount,
    //       description: data.description,
    //       image: 'multipart/form-data',
    //       borrowData: data.borrowData
    //     }
    //   })
    //   .then((response) => {
    //     console.log('ไฟล์ถูกอัปโหลดเรียบร้อย', response.data)
    //   })
    //   .catch((error) => {
    //     console.error('เกิดข้อผิดพลาดในการอัปโหลดไฟล์', error)
    //   })
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('school', data.school)
      formData.append('type', data.type)
      formData.append('amount', data.amount)
      formData.append('description', data.description)
      formData.append('file', file)
      formData.append('borrowData', data.borrowData)

      const response = await axios.post('bookList', formData)
      console.log(response)

      console.log('ไฟล์ถูกอัปโหลดเรียบร้อย', response.data)
    } catch (error) {
      // การจัดการข้อผิดพลาดที่เกิดขึ้นจาก Axios
      console.error('เกิดข้อผิดพลาดในการอัปโหลดไฟล์:', error.message)
      if (error.response) {
        // มีการตอบกลับจากเซิร์ฟเวอร์ แต่อยู่ในช่วง 2xx (สำเร็จ) นอกเหนือจาก 200 OK
        console.error('รหัสสถานะ:', error.response.status)
        console.error('สถานะข้อผิดพลาด:', error.response.statusText)
      } else if (error.request) {
        // ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์
        console.error('ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์:', error.request)
      } else {
        // มีข้อผิดพลาดในการตรวจจับร้อยหลายขั้นตอน
        console.error('เกิดข้อผิดพลาดในการทำคำขอ:', error.message)
      }
      throw error // นำ error ไป throw เพื่อให้ catch ด้านนอกได้รับข้อมูลเพิ่มเติม
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
