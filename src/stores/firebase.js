// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from '@firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAiLVgdHiRrqmMXH2034A-gaewLKcO3mZA',
  authDomain: 'library2-efcfa.firebaseapp.com',
  projectId: 'library2-efcfa',
  storageBucket: 'library2-efcfa.appspot.com',
  messagingSenderId: '671960721627',
  appId: '1:671960721627:web:8a9a4e5aaff8c0c534c4fe',
  measurementId: 'G-JF1SB3D6BV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
