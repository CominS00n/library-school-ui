import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import Toast from 'vue-toastification'
import VueApexCharts from "vue3-apexcharts"

import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(Toast)
app.use(VueApexCharts)

app.mount('#app')
