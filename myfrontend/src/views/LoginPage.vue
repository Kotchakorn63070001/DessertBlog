<template>
<section class="hero  is-fullheight">
  <div class="hero-body">
    <div class="container" >
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
           <h1 style="margin-bottom: 5%;font-size: 30px;font-weight:50px;">Login</h1>
            <div class="field">
              <label for="" class="label">Username</label>
              
              <div class="control has-icons-left">
                <input type="text"  v-model="username" class="input" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
           
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" v-model="password" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            
            <div class="field">
              <button class="button is-success" style="margin-bottom: 5px;margin-left: 75px;" @click="submit()">
                Login
              </button>
            </div>
            <footer class="card-footer">
                
               <div class="card-footer-item is-link" style="background-color:#6699FF;">
               <router-link to="/user/login">
              <strong>Login</strong>
            </router-link>
               </div>
        
              <div class="card-footer-item" >
               <router-link to="/user/register">
              <p>Register</p>
               </router-link>
            </div>

            </footer>
          </form>
        </div>
      </div> 
    </div>
  </div>
</section>
</template>
<script>
import axios from '@/plugins/axios'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        password: this.password
      }

      axios.post('http://localhost:3000/user/login/', data)
        .then(res => {
          const token = res.data.token                                
          localStorage.setItem('token', token)
          this.$emit('auth-change')
        //   this.$router.push({path: '/home'})
        this.$router.replace({ name: "home"}).catch(()=>{});
        })
        .catch(error => {
          this.error = error.response.data
          console.log(error.response.data)
        })
     }
   },
}
</script>
