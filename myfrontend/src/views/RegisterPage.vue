<template>
<section class="hero  is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
              <h1 style="margin-bottom: 5%;font-size: 30px;font-weight:50px;">Register</h1>
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <!-- <input class="input" type="text" placeholder="Text input" required> -->
                  <input
                v-model="$v.name.$model"
                :class="{ 'is-danger': $v.name.$error }"
                class="input"
                type="text"
              />
                </div>
                 <template v-if="$v.name.$error">
              <p class="help is-danger" v-if="!$v.name.required">
                กรุณาใส่ชื่อ-นามสกุล
              </p>
            </template>
              </div>
              
              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <!-- <input class="input" type="text" placeholder="Text input" required> -->
                   <input
                v-model="$v.username.$model"
                :class="{ 'is-danger': $v.username.$error }"
                class="input"
                type="text" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>

                 <template v-if="$v.username.$error">
              <p class="help is-danger" v-if="!$v.username.required">
                <!-- This field is required -->
                กรุณาใส่ username
              </p>
              <p class="help is-danger" v-if="!$v.username.minLength">
                อย่างตัว5ตัวอักษรแต่ไม่เกิน20ตัวอักษร
              </p>
            </template>
              </div>


            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <!-- <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required> -->
                 <input
                v-model="$v.email.$model"
                :class="{ 'is-danger': $v.email.$error }"
                class="input"
                type="text"
                placeholder="e.g. bobsmith@gmail.com"
              />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
              <template v-if="$v.email.$error">
              <p class="help is-danger" v-if="!$v.email.required">
                กรุณาใส่อีเมล
              </p>
              <p class="help is-danger" v-if="!$v.email.email">อีเมลไม่ถูกต้อง</p>
            </template>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <!-- <input type="password" placeholder="*******" class="input" required> -->
                <input
                v-model="$v.password.$model"
                :class="{ 'is-danger': $v.password.$error }"
                class="input"
                type="password"
                placeholder="*******" 
              />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
               <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">
                กรุณาใส่รหัสผ่าน
              </p>
              <p class="help is-danger" v-if="!$v.password.minLength">
                ต้องมีอย่างน้อย8ตัว
              </p>
              
            </template>
            </div>
            
            <div class="field">
              <button class="button is-success" style="margin-bottom: 5px;margin-left: 70px;" @click="submit()">
                Register
              </button>
            </div>
            <footer class="card-footer">
               
                <div class="card-footer-item" >
               <router-link to="/user/login">
              <p>Login</p>
            </router-link>
               </div>
                
                 <div class="card-footer-item" style="background-color:#6699FF;" >
               <router-link to="/user/register">
              <strong>Register</strong>
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
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";


// function complexPassword(value) {
//   if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
//     return false;
//   }
//   return true;
// }

export default {
  data() {
    return {
      name: "",
      username:"",
      password: "",
    email: "",
    };
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          email: this.email,
          name: this.name,
        
        };

        axios
          .post("http://localhost:3000/user/register", data)
          .then((res) => {
              console.log(res)
            alert("Register Success")
            this.$router.replace({ name: "login"}).catch(()=>{});
          })
          .catch((err) => {
            alert(err.response.data.details.message)
          });
      }
    },
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    name: {
        required:required,
        
    },
    password: {
      required: required,
      minLength: minLength(8),
    //   complex: complexPassword,
    },
    
    username: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    
  },
};
</script>
