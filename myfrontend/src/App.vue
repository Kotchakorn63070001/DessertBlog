<template>
  <div id="app">
    <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <span><h2 class="title is-4 has-text-white">DessertBlog</h2></span>
        </a>
        

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">

      <a class="navbar-item" href="/home" v-if="user">
        <span class="icon-text">
          <span class="icon">
            <i class="fa-solid fa-house-chimney-window"></i>
          </span>
          <span>Home</span>
        </span>
      </a>

      <a class="navbar-item" v-if="user" >
        <router-link to="/create" class="has-text-white">
          <span class="icon-text">
            <span class="icon">
              <i class="fa-solid fa-pen"></i>
            </span>
            <span>Create Post</span>
          </span>
        </router-link>
      </a>

      <a class="navbar-item" >
        <router-link to="/reports" class="has-text-white">
            <span>Report</span>
        </router-link>
      </a>

      <div class="navbar-item has-dropdown is-hoverable" v-if="user">
        <a class="navbar-link">
          <!-- <span class="icon">
            <i class="fa-solid fa-user"></i>
          </span> -->
          <figure class="image is-24x24 my-auto">
            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
          </figure>
          <span class="pl-3">{{ user.username }}</span>
        </a>

        <div class="navbar-dropdown is-right">
          <a class="navbar-item">
            <router-link to="/profile">
              <span>Profile</span>
            </router-link>
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" @click="logout()">
            Log out
          </a>
        </div>
      </div>

    
        <div class="navbar-item"  v-if="!user">
          <div class="buttons">
            <a class="button is-primary">
              <router-link to="/user/login" class="has-text-white">
                <strong>login</strong>
              </router-link>
            </a>
          </div>
        </div>

    </div>
  </div>
</nav>
   <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
  </div>
</template>
<script>
import axios from '@/plugins/axios'

export default {
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.onAuthChange()
  },
  methods: {
      logout () {
        localStorage.clear()
        this.user = null
        // this.$router.push('/user/login')
        this.$router.replace({ name: "login"}).catch(()=>{});
      },
    onAuthChange () {
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser () {
      const token = localStorage.getItem('token')
      console.log(token)
      axios.get('/user/me').then(res => {
        this.user = res.data
      })
    },
  },
}
</script>



