<template>
  <div class="">
    <div class="flex justify-between container w-full mx-auto h-16 items-center">
      <div class="flex items-center space-x-6 h-full">
        <h1 class="text-2xl">Library</h1>
        <ul class="space-x-3 flex h-full">
          <li
            v-for="(item, i) in props.item"
            :key="i"
            class="hover:text-[#7743DB] text-center flex px-4"
            :class="`${$route.name === item.link ? 'border-[#7743DB] border-b-2' : ''}`"
          >
            <RouterLink :to="`${item.link}`" class="flex items-center">
              <span v-show="item.icon" class="mr-2">
                <icon :icon="item.icon" />
              </span>
              <div v-if="item.title">
                {{ item.title }}
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div v-if="!auth">
        <router-link to="/login"
          ><p-button text="เข้าสู่ระบบ" type="outline" main-class="w-24 p-0 h-9"
        /></router-link>
      </div>

      <div v-if="auth" class="dropdown dropdown-end hover:bg-gray-50">
        <div tabindex="0" role="button">
          <div class="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
            <div
              class="h-7 w-7 rounded-full bg-[#C3ACD0] text-white flex justify-center items-center"
            >
              {{ accountLogin.firstName[0] }}{{ accountLogin.lastName[0] }}
            </div>
            <span> {{ accountLogin.firstName }} {{ accountLogin.lastName }} </span>
          </div>
        </div>
        <ul
          tabindex="0"
          class="mt-1 z-[1] p-2 shadow-md menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <button class="w-full" @click="logout">
              <icon icon="heroicons-outline:logout" />ออกจากระบบ
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getUserInfo, isAuthenticated, removeUserInfo } from '@/stores/accountLogin'

import icon from '@/components/icon/index.vue'
import PButton from '@/components/button/index.vue'

const router = useRouter()
const accountLogin = getUserInfo()
const auth = isAuthenticated()

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})

function logout() {
  removeUserInfo()
  router.push('/')
}
</script>
