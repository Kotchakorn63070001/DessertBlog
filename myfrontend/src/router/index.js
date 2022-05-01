import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/create',
    name: 'create-post',
    component: () => import('../views/Posts/CreatePost.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router