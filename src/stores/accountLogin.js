// import { ref } from 'vue'

const storageKey = 'user_info'

let userInfo = JSON.parse(localStorage.getItem(storageKey)) || {}
let isLogin = false

export function saveUserInfo(info) {
  userInfo = info
  localStorage.setItem(storageKey, JSON.stringify(userInfo))
  isLogin = true
}

export function getUserInfo() {
  return userInfo
}

export function removeUserInfo() {
  userInfo = {}
  isLogin = !isLogin
  localStorage.removeItem(storageKey)
}

export function isAuthenticated() {
  return Object.keys(userInfo).length !== 0
}

export { isLogin }
