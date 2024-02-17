export const student = [
    {
        id: '001',
        studentNo: '132234001',
        fname: 'first name',
        lname: 'last name',
        address: 'address',
        phone: '000-000-0000',
        username: '132234001',
        pass: 'password',
        pfname: 'first name',
        plname: 'last name',
        pphone: '000-000-0000'
    }
]

export const bookTypes = [
    'ทั้งหมด', 'ความรู้ทั่วไป', 'ปรัชญา', 'ศาสนา', 'ภาษาศาสตร์', 'วิทยาศาสตร์'
]

export const bookList = [
    {
        id: '001',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 1,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 10
    },
    {
        id: '002',
        name: 'ใช้คลื่นพลังบวกดึงดูดพลังสุข',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 1,
        description: 'ใช้ "กฎแห่งแรงสั่นสะเทือน" ดึงดูดพลังงานบวกรอบตัว เพื่อบรรลุ "ความสุข" และ "เป้าหมายอันยิ่งใหญ่" กว่าที่คุณคิดฝัน',
        image: '002.jpg',
        borrowData: 13
    },
    {
        id: '003',
        name: 'เมื่อแมวที่บ้านคุณผันตัวเองมาเป็นไลฟ์โค้ช',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'คำแนะนำแบบแมว ๆ ที่จะทำให้ชีวิตคุณง่ายและเบาสบายขึ้น',
        image: '003.jpg',
        borrowData: 1
    },
    {
        id: '004',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 1
    },
    {
        id: '005',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 24
    },
    {
        id: '006',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 13
    },
    {
        id: '007',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 16
    },
    {
        id: '008',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 2
    },
    {
        id: '009',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 7
    },
    {
        id: '010',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 2
    },
    {
        id: '011',
        name: 'จิตวิทยาสายดาร์ก',
        school: 'โรงเรียนเทศบาลชนะชัยศรี',
        type: 'ปรัชญา',
        amount: 0,
        description: 'เมื่อคำพูดของคุณ สามารถควบคุมจิตใจคนได้',
        image: '001.jpg',
        borrowData: 8
    },
]

export const Admin = [
    {
        id: '001',
        fname: 'First Name',
        lname: 'Last Name',
        address: '',
        email: 'test@mail.com',
        jobPosition: '',
        school: '',
        username: 'admin',
        password: 'admin'
    }
]

export const borrows = [
    {
        id: '001',
        book_id: '001',
        fname: 'first name',
        lname: 'last name',
        borrow_date: '10/2/2567',
        return_date: '16/2/2567',
    }
]
