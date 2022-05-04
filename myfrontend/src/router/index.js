import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/create',
    name: 'create-post',
    component: () => import('../views/Posts/CreatePost.vue')
  },
  {
    path: '/posts/:id',
    name: 'detail-post',
    component: () => import('../views/Posts/DetailPost.vue')
  },
  {
    path: '/posts/update/:id',
    name: 'edit-post',
    component: () => import('../views/Posts/EditPost.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('../views/Reports/ReportPage.vue')
  },
  {
    path: '/create/report/:postId',
    name: 'create-report',
    component: () => import('../views/Reports/CreateReportPost.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router