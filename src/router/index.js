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
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register.vue')
    },
    {
      path: '/borrow-book',
      name: 'borrow-book',
      component: () => import('@/views/bookBorrow.vue')
    },
    {
      path: '/return-book',
      name: 'return-book',
      component: () => import('@/views/bookReturn.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard.vue')
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: () => import('@/views/addBook.vue')
    }
  ]
})

export default router
