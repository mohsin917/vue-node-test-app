import { h, resolveComponent } from 'vue'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/login',
    name: 'Login',
    // component:Login,
    component: () => import('@/views/login/Login.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/register',
    // component:Register,
    component: () => import('@/views/register/Register.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { auth: true },
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: DefaultLayout,
    redirect: '/admin',
    children: [

          {
            path: '',
            name: 'AdminList',
            component: () => import('@/views/admin/list/List.vue'),
            meta: { auth: true },
          },
          {
            path: 'create',
            name: 'CreateAdmin',
            component: () => import('@/views/admin/form/Form.vue'),
            meta: { action: 'create', mode: true, auth: true },
          },
          {
            path: 'update/:id',
            name: 'UpdateAdmin',
            component: () => import('@/views/admin/form/Form.vue'),
            meta: { action: 'update', mode: true, auth: true },
          },
          {
            path: 'view/:id',
            name: 'ViewAdmin',
            component: () => import('@/views/admin/view/View.vue'),
            meta: { auth: true },
          },
        
    ],
  },
  {
    path: '/users',
    name: 'Users',
    component: DefaultLayout,
    redirect: '/users',
    children: [

          {
            path: '',
            name: 'UsersList',
            component: () => import('@/views/users/list/List.vue'),
            meta: { auth: true },
          },
          {
            path: 'create',
            name: 'CreateUser',
            component: () => import('@/views/users/form/Form.vue'),
            meta: { action: 'create', mode: true, auth: true },
          },
          {
            path: 'update/:id',
            name: 'Update',
            component: () => import('@/views/users/form/Form.vue'),
            meta: { action: 'update', mode: true, auth: true },
          },
          {
            path: 'view/:id',
            name: 'View',
            component: () => import('@/views/users/view/View.vue'),
            meta: { auth: true },
          },
        
    ],
  },

  {
    path: '/properties',
    name: 'Properties',
    component: DefaultLayout,
    redirect: '/properties',
    children: [
   
      {
        path: '',
        name: 'PropertyList',
        component: () => import('@/views/property/list/List.vue'),
        meta: { auth: true },
      },
      {
        path: 'create',
        name: 'CreateProperty',
        component: () => import('@/views/property/form/Form.vue'),
        meta: { action: 'create', mode: true, auth: true },
      },
      {
        path: 'view/:id',
        name: 'ViewProperty',
        component: () => import('@/views/property/view/View.vue'),
        meta: { auth: true },
      },
      {
        path: 'update/:id',
        name: 'UpdateProperty',
        component: () => import('@/views/property/form/Form.vue'),
        meta: { action: 'update', mode: true, auth: true },
      },
    ]
  },

  {
    path: '/openHouse',
    name: 'OpenHouse',
    component: DefaultLayout,
    redirect: '/OpenHouse',
    children: [
      {
        path: '',
        name: 'OpenHouseList',
        component: () => import('@/views/openHouse/list/List.vue'),
        meta: { auth: true },
      },
      {
        path: 'create',
        name: 'CreateHouse',
        component: () => import('@/views/openHouse/form/Form.vue'),
        meta: { action: 'create', mode: true, auth: true },
      },
      {
        path: 'view/:id',
        name: 'ViewHouse',
        component: () => import('@/views/openHouse/view/View.vue'),
        meta: { auth: true },
      },
      {
        path: 'update/:id',
        name: 'UpdateHouse',
        component: () => import('@/views/openHouse/form/Form.vue'),
        meta: { action: 'update', mode: true, auth: true },
      },
    ]
  },
  {
    path: '/openHouseDetail',
    name: 'OpenHouseDetail',
    component: DefaultLayout,
    redirect: '/',
    children: [
      {
        path: '',
        name: 'OpenHouseDetail',
        component: () => import('@/views/openHouseDetail/list/openHouseList.vue'),
        meta: { auth: true },
      },
      // {
      //   path: 'create',
      //   name: 'CreateOpenHouseDetail',
      //   component: () => import('@/views/openHouseDetail/form/Form.vue'),
      //   meta: { action: 'create', mode: true, auth: true },
      // },
      // {
      //   path: 'view/:id',
      //   name: 'ViewOpenHouseDetail',
      //   component: () => import('@/views/openHouseDetail/view/View.vue'),
      //   meta: { auth: true },
      // },
      // {
      //   path: 'update/:id',
      //   name: 'UpdateOpenHouseDetail',
      //   component: () => import('@/views/openHouseDetail/form/Form.vue'),
      //   meta: { action: 'update', mode: true, auth: true },
      // },
    ]
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  reload: false,
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && to.name === 'Login') {
    next({ path: '/dashboard' })
  } else if (!to.meta.auth) {
    next()
  } else if (to.meta.auth && localStorage.getItem('token')) {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router
