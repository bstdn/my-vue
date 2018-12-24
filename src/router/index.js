import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Home => require(['@/pages/home/home'], Home),
    },
    {
      path: '/login',
      name: 'Login',
      component: Login => require(['@/pages/login/login'], Login),
    },
  ]
})
