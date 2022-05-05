import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    meta: { guess: true },
    component: () => import('../views/IndexPage.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { login: true },
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    meta:{ guess: true },
    component: () => import('../views/LoginPage.vue')
  },

  {
    path: '/user/register',
    name: 'register',
    meta:{ guess: true },
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/create',
    name: 'create-post',
    meta: { login: true },
    component: () => import('../views/Posts/CreatePost.vue')
  },
  {
    path: '/posts/:id',
    name: 'detail-post',
    meta: { login: true },
    component: () => import('../views/Posts/DetailPost.vue')
  },
  {
    path: '/posts/update/:id',
    name: 'edit-post',
    meta: { login: true },
    component: () => import('../views/Posts/EditPost.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { login: true },
    component: () => import('../views/ProfilePage.vue')
  }
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')
   
    if (to.meta.login && !isLoggedIn) {
      alert('Please login first!')
      next({ path: '/user/login' })
    }
   
    if (to.meta.guess && isLoggedIn) {
      // alert("You've already logged in")
      next({ path: '/home'})
    }
   
    next()
})

export default router
