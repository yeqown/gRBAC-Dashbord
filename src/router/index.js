import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
// import InitializeAdmin from '@/components/views/initial/InitializeAdmin'
// import GeneratePwd from '@/components/views/initial/GeneratePwd'
import Verify from '@/components/views/initial/Verify'

import Dashbord from '@/components/views/Dashbord'
import About from '@/components/views/About'
import Role from '@/components/views/Role'
import Perm from '@/components/views/Perm'
import User from '@/components/views/User'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      redirect: 'verify'
      // redirect: to => {
      //   let isInitialed = false
      //   if (isInitialed) {
      //     return 'dashbord'
      //   } else {
      //     return 'Verify'
      //   }
      // }
    },
    {
      path: '/Verify',
      name: 'Verify',
      component: Verify
    },
    {
      path: '/Dashbord',
      name: 'Dashbord',
      component: Dashbord,
      meta: {
        BreadCrumb: '导航页'
      },
      children: [
        {
          path: 'Role',
          name: 'Role',
          component: Role,
          meta: {
            BreadCrumb: '角色管理'
          }
        },
        {
          path: 'User',
          name: 'User',
          component: User,
          meta: {
            BreadCrumb: '用户管理'
          }
        },
        {
          path: 'Perm',
          name: 'Perm',
          component: Perm,
          meta: {
            BreadCrumb: '权限管理'
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
  // console.log(to)

  // if not verified, must redirect to verifyPage
  // console.log('getters', store.getters)
  if (!store.getters.verified && to.name !== 'Verify') {
    console.error('not verified')
    next({path: '/Verify'})
    return
  }

  if (to.meta !== undefined) {
    let {BreadCrumb: isBreadCrumb} = to.meta
    let BreadCrumbs = []

    if (isBreadCrumb) {
      to.matched.map(matched => {
        let {BreadCrumb} = matched.meta
        BreadCrumbs.push({
          breadCrumbName: BreadCrumb,
          name: matched.name,
          path: matched.path,
          isCur: matched.path === to.fullPath
        })
      })
    }
    // console.log('2222222222', BreadCrumbs)
    store.commit('setBreadCrumbs', BreadCrumbs)
  }

  next()
})

export default router
