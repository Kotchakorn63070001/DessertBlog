<template>
    <div class="container is-widescreen">
        <div class="m-4">
            <div class="columns">
                <div class="column is-2"></div>
                <div class="column is-8">
                        <div class="box">
                            <div class="field">
                                <label class="label"><span class="has-text-link-dark">name :</span> {{name}}</label>
                                <!-- <div class="control">
                                  <input class="input is-info" type="text" name="name" v-model="name" value="" placeholder="">
                                </div> -->
                            </div>

                            <div class="field">
                                <label class="label"><span class="has-text-link-dark">username :</span> {{username}}</label>
                                <!-- <div class="control">
                                    <input class="input is-info" type="text" name="username" v-model="username" value="" placeholder="">
                                </div> -->
                            </div>
                            <div class="field">
                                <label class="label"><span class="has-text-link-dark">email :</span> {{email}}</label>
                                <!-- <div class="control">
                                    <input class="input is-info" type="text" name="email" v-model="email" value="" placeholder="">
                                </div> -->
                            </div>

    
                            <!-- รูปภาพ -->
                            <div class="field">
                                <label class="label"><span class="has-text-link-dark">Your Image Profile</span></label>
                                <div class="file is-dark is-centered is-fullwidth">
                                    <label class="file-label">
                                    <input class="file-input" type="file" accept="image/png, image/jpeg, image/jpg, image/webp"  @change="selectImage($event)">
                                       <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                เลือกรูปโปรไฟล์ของคุณ...
                                            </span>
                                        </span>
                                    </label>
                                </div> 
                            </div>

                                
                            <!-- <div v-if="moreImages" class="columns is-multiline">
                                <div v-for="(oldImage, index) in moreImages" :key="oldImage" class="column is-one-quarter">
                                    <div class="card" :class="{'has-background-danger-light': index === 0}">
                                        <div class="card-image">
                                             <figure class="image is-4by3">
                                                <img :src="imagePath(oldImage.image)" alt="Placeholder image">
                                            </figure>
                                        </div>
                                        <footer class="card-footer">
                                            <a @click="deleteImage(index)" class="card-footer-item">Delete</a>
                                        </footer>
                                    </div>
                                </div>
                                <div v-for="(image, index) in newImage" :key="image" class="column is-one-quarter">
                                    <div class="card" :class="{'has-background-danger-light': isNoMoreImage && index === 0}">
                                        <div class="card-image">
                                            <figure class="image is-4by3">
                                                <img :src="showImage(image)" alt="Placeholder image">
                                                
                                            </figure>
                                        </div>
                                        <footer class="card-footer">
                                            <a @click="deleteNewImage(index)" class="card-footer-item">Delete</a>
                                        </footer>
                                    </div>
                                </div>
                            </div> -->


                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-primary" @click="savePost">save</button>
                                </div>
                                <div class="control">
                                    <router-link to="/profile">
                                        <button class="button is-primary is-light">cancel</button>
                                    </router-link>
                                </div>
                            </div>



                        </div>
                    <!-- </form> -->
                </div>
                <div class="column is-2">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from "axios";
import axios from '@/plugins/axios'

export default{
    // props: ['user'],
    data(){
        return{
            image: ''
        }
    },
    // created(){
    //     // console.log(this.$attrs)
    //     axios
    //         .get(`http://localhost:3000/user/${this.$route.params.userId}`)
    //         .then((response) => {
    //             this.user = response.data.name
    //             // this.description = response.data.posts.description
    //             // this.typeDessert = response.data.posts.post_type_id
    //             // this.ingredients = response.data.ingredients
    //             // this.methodCook = response.data.methods
    //             // this.moreImages = response.data.images
    //             // this.moreImages.splice(0, 0, {image: response.data.posts.img})
    //             // console.log(this.moreImages)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })


    //         // console.log(this.$route.params.id)
    // },
    computed:{
        name(){
            return this.$attrs.user.name
        },
        username(){
            return this.$attrs.user.username
        },
        email(){
            return this.$attrs.user.email
        },
        
    },
    methods:{
        // selectMainImage(event){
        //     this.MainImage = event.target.files[0];
        // },
        selectImage(event){
            this.image = event.target.files[0];
            
        },
        imagePath(file_path) {
            if (file_path){
                return 'http://localhost:3000/' + file_path
            } 
            else {
                return 'https://bulma.io/images/placeholders/640x360.png'
            }
        },
        savePost(){
            if(this.name === ''){
                alert('กรุณาใส่ชื่อของคุณ')
            }
            else if(this.username === ''){
                alert('กรุณาใส่ชื่อผู้ใช้ของคุณ')
            }
            else if(this.email === ''){
                alert('กรุณาใส่อีเมลของคุณ')
            }
            else{
                const formData = new FormData();
                // formData.append("name", this.name)
                // formData.append("username", this.username)
                // formData.append("email", this.email)
                formData.append("image", this.image)
                // formData.append("mainImage", this.MainImage)


                //  console.log(this.moreImages.length)
                // for(let i=0; i<this.moreImages.length; i++){
                //     let file = this.moreImages[i]
                //     formData.append("moreImages", file)
                // }

                axios
                    .put(`http://localhost:3000/user/update/${this.$route.params.userId}`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then(() => this.$router.push({name: 'profile'}))
                    .catch((err) => {
                        console.log(err);
                    });
            }

        },
    }
   
}


</script>
