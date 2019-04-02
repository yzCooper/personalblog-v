import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/adminlogin',
      name: 'login',
      component: () => import ('@/views/login.vue')
    },
    {
      path: '/manage/index',
      name: 'index',
      component: () => import ('@/views/index.vue')
    },
    {
      path: '/',
      name: 'module',
      component: () => import ('@/views/blogview/module.vue'),
      redirect:'/maincontent',
      children:[
        {
          path: '/maincontent',
          name: 'maincontent',
          component: () => import ('@/views/blogsubview/maincontent.vue'),
        },
        {
          path: '/classification',
          name: 'classification',
          component: () => import ('@/views/blogsubview/classification.vue'),
        },
        {
          path: '/aboutme',
          name: 'aboutme',
          component: () => import ('@/views/blogsubview/aboutme.vue'),
        }
    ]
    }

  ]
})
