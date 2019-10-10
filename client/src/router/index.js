import Vue from 'vue'
import Router from 'vue-router'
import AccessDenied from '@/components/403'
import Auth from '@/components/Auth'
import UserManager from '@/components/UserManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/403',
      name: 'AccessDeniedPage',
      component: AccessDenied
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/usermanager',
      name: 'UserManager',
      component: UserManager
    },
    {
      path: '*',
      redirect: '/usermanager'
    }
  ]
})
