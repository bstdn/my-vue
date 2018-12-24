import Vue from 'vue'
import Router from 'vue-router'

const User = () => import('@/pages/user/user');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Home => require(['@/pages/home/home'], Home),
      iconCls: 'fa fa-users',
      leaf: true,
      children: [
        {path: '/user', component: User, name: '用户管理'},
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login => require(['@/pages/login/login'], Login),
      hidden: true
    },
  ]
})
