import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import InitializeAdmin from '@/components/views/initial/InitializeAdmin'
import GeneratePwd from '@/components/views/initial/GeneratePwd'
import CreateAdmin from '@/components/views/initial/CreateAdmin'

import Dashbord from '@/components/views/Dashbord'
import About from '@/components/views/About'
import Role from '@/components/views/Role'
import Perm from '@/components/views/Perm'
import User from '@/components/views/User'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      // redirect: '/InitializeAdmin',
      redirect: to => {
        // console.log(to)
        let isInitialed = false
        if (isInitialed) {
          return 'Dashbord'
        } else {
          return 'InitializeAdmin'
        }
      }
    },
    {
      path: '/InitializeAdmin',
      name: 'InitializeAdmin',
      component: InitializeAdmin,
      children: [
        {
          path: 'GeneratePwd',
          name: 'GeneratePwd',
          component: GeneratePwd
        },
        {
          path: 'CreateAdmin',
          name: 'CreateAdmin',
          component: CreateAdmin
        }
      ]
    },
    {
      path: '/Dashbord',
      name: 'Dashbord',
      component: Dashbord,
      meta: {
        BreadCumb: '导航页'
      },
      children: [
        {
          path: 'Role',
          component: Role,
          meta: {
            BreadCumb: '角色管理'
          }
        },
        {
          path: 'User',
          component: User,
          meta: {
            BreadCumb: '用户管理'
          }
        },
        {
          path: 'Perm',
          component: Perm,
          meta: {
            BreadCumb: '权限管理'
          }
        }
      ]
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, to.matched)
  // login check do here and some other
  next()
})

export default router
