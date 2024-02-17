import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/stores/accountLogin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/borrow-book/:id',
      name: 'borrow-book',
      component: () => import('@/views/bookBorrow.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next({ name: 'login' })
        }
      },
    },
    {
      path: '/',
      name: '/',
      redirect: '/home',
      component: () => import('@/components/layout/page/tenant.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/tenant/HomeView.vue')
        },
        {
          path: 'book-list',
          name: 'book-list',
          component: () => import('@/views/tenant/bookList.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/admin-home',
      component: () => import('@/components/layout/page/admin.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next({ name: 'login' })
        }
      },
      children: [
        {
          path: 'admin-home',
          name: 'admin-home',
          component: () => import('@/views/admin/HomeView.vue')
        },
        {
          path: 'admin-book-list',
          name: 'admin-book-list',
          component: () => import('@/views/admin/bookList.vue')
        },
        {
          path: 'admin-register',
          name: 'admin-register',
          component: () => import('@/views/admin/register.vue')
        },
        {
          path: 'admin-return-book',
          name: 'admin-return-book',
          component: () => import('@/views/admin/bookReturn.vue')
        },
        // {
        //   path: 'admin-dashboard',
        //   name: 'admin-dashboard',
        //   component: () => import('@/views/admin/dashboard.vue')
        // },
        {
          path: 'admin-add-book',
          name: 'admin-add-book',
          component: () => import('@/views/admin/addBook.vue')
        }
      ]
    }
  ]
})

export default router
