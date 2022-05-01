<template>
    <div class="container is-widescreen">
        <div class="m-4">
            <div class="columns">
                <div class="column is-half is-offset-one-quarter">
                    <!-- <form action="/create/" method="POST" enctype="multipart/form-data"> -->
                        <div class="box has-background-link-light	">
                            <div class="field">
                                <label class="label">ชื่อเมนู</label>
                                <div class="control">
                                  <input class="input is-info" type="text" name="title" v-model="title" placeholder="ชื่อเมนูของคุณ">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">คำอธิบาย</label>
                                <div class="control">
                                    <textarea class="textarea is-info" name="description" v-model="description" placeholder="คำอธิบายเมนูของคุณ"></textarea>
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column is-8">
                                    
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">ประเภทขนม</label>
                                <div class="select is-info">
                                    <select v-model="typeDessert">
                                        <option value="0" disabled="disabled">--- เลือกประเภทขนม ---</option>
                                        <option value="1">Bakery</option>
                                        <option value="2">Thai Dessert</option>
                                    </select>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">ภาพขนมของคุณ</label>
                                <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" @change="selectMainImage($event)">
                            </div>

                            
                            <!-- <div class="field">
                                <div id="file-js" class="file is-info is-centered has-name is-boxed  is-fullwidth">
                                    <label class="file-label">
                                      <input class="file-input" type="file" accept="image/png, image/jpeg, image/webp" @change="selectImages">
                                      <span class="file-cta">
                                        <span class="file-icon">
                                          <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label has-text-centered">
                                       
                                          เลือกภาพเมนูของคุณ
                                        </span>
                                      </span>
                                      <span class="file-name has-text-centered">
                                        No file uploaded
                                      </span>
                                    </label>
                                </div>
                            </div> -->

                            <!-- ส่วนผสม -->
                            <div class="box">
                                <label class="label">ส่วนผสม</label>
                                <div class="content">
                                    <ul>
                                        <li v-for="item in ingredients" :key="item">
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                                
                                <div class="columns">
                                    <div class="column is-8">
                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-info" id="addIngre" type="text" v-model="newIngre" placeholder="ส่วนผสมของคุณ">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-4">
                                        <div class="field">
                                            <div class="control">
                                                <button class="button is-link is-light" id="addBtn" @click="addIngre()">
                                                    <span class="icon-text">
                                                        <span class="icon is-medium">
                                                            <i class="fa-solid fa-plus"></i>
                                                        </span>
                                                        <span>เพิ่มส่วนผสม</span>
                                                    </span>
                                                </button>
                                            </div>
                                          </div>      
                                    </div>
                                </div>
                            </div>

                            <!-- วิธีทำ -->
                            <div class="box">
                                <label class="label">วิธีทำ</label>
                                <div class="content">
                                    <ul>
                                        <li v-for="item in methodCook" :key="item">
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                                
                                <div class="columns">
                                    <div class="column is-8">
                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-info" id="addIngre" type="text" v-model="newMethod" placeholder="ส่วนผสมของคุณ">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-4">
                                        <div class="field">
                                            <div class="control">
                                                <button class="button is-link is-light" id="addBtn" @click="addMethodCook()">
                                                    <span class="icon-text">
                                                        <span class="icon is-medium">
                                                            <i class="fa-solid fa-plus"></i>
                                                        </span>
                                                        <span>เพิ่มวิธีทำ</span>
                                                    </span>
                                                </button>
                                            </div>
                                          </div>      
                                    </div>
                                </div>
                            </div>

                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-primary" @click="submitPost">submit</button>
                                </div>
                                <div class="control">
                                    <router-link to="/">
                                        <button class="button is-primary is-light">cancel</button>
                                    </router-link>
                                    
                                </div>
                            </div>

                        </div>
                    <!-- </form> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default{
    data(){
        return{
            title: '',
            description: '',
            typeDessert: 0,
            MainImage: '',
            ingredients: [],
            methodCook: [],
            newIngre: '',
            newMethod: '',
        }
    },
    methods:{
        selectMainImage(event){
            this.MainImage = event.target.files[0];
        },
  
        addIngre(){
            const newIngre = this.newIngre
            this.ingredients.push(newIngre)
            this.newIngre = ''
        },
        addMethodCook(){
            const newMethod = this.newMethod
            this.methodCook.push(newMethod)
            this.newMethod = ''
        },
        submitPost(){
            const formData = new FormData();
            formData.append("title", this.title)
            formData.append("description", this.description)
            formData.append("typeDessert", this.typeDessert)
            // this.imageMain.forEach((image) => {
            //     formData.append("mainImage", image)
            // })
            formData.append("mainImage", this.MainImage)
            // this.images.forEach((image) => {
            //     formData.append("mainImage", image);
            // });
            this.ingredients.forEach((ingre) => {
                formData.append("ingredient", ingre);
            })
            this.methodCook.forEach((method) => {
                formData.append("methodCook", method);
            })
            axios
                .post("http://localhost:3000/create", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    // data: JSON.stringify(formData)
                })
                .then(() => this.$router.push({name: 'home'}))
                .catch((e) => console.log(e.response.data));
        },
    }
   
}


</script>


