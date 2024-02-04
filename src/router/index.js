import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/book-list',
      name: 'book-list',
      component: () => import('@/views/bookList.vue')
    }
  ]
})

export default router
