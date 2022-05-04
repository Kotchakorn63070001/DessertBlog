<template>
    <div class="container is-widescreen">
        <div class="m-4">
            <div class="columns">
                <div class="column is-2"></div>
                <div class="column is-8">
                        <div class="box">
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

                            
                            <!-- ส่วนผสม -->
                            <label class="label">ส่วนผสม</label>
                            <div class="content">
                                <div class="box pt-2 pb-2 has-background-link-light" v-for="(item, index) in ingredients" :key="item">
                                    <span>{{ item.ingredient }}</span>
                                    <div class="is-pulled-right">
                                        <button class="button is-small is-danger is-rounded" style="padding-left: 1em; padding-right: 1em;" @click="deleteIngreItem(index)">
                                            <span class="icon is-small">
                                                <i class="fa-solid fa-minus"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                                
                            <div class="columns">
                                <div class="column is-9">
                                    <div class="field">
                                        <div class="control">
                                            <input class="input is-info" id="addIngre" type="text" v-model="newIngre" placeholder="ส่วนผสมของคุณ">
                                       </div>
                                    </div>
                                </div>
                                <div class="column is-3">
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


                            <!-- วิธีทำ -->
                            <label class="label">วิธีทำ</label>
                            <div class="content">
                                <div class="box pt-2 pb-2 has-background-link-light" v-for="(item, index) in methodCook" :key="item">
                                    <span>{{ item.cooking_method }}</span>
                                    <div class="is-pulled-right">
                                        <button class="button is-small is-danger is-rounded" style="padding-left: 1em; padding-right: 1em;" @click="deleteMethodItem(index)">
                                            <span class="icon is-small">
                                                <i class="fa-solid fa-minus"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                                
                            <div class="columns">
                                <div class="column is-9">
                                    <div class="field">
                                        <div class="control">
                                            <input class="input is-info" id="addIngre" type="text" v-model="newMethod" placeholder="วิธีทำของคุณ">
                                        </div>
                                    </div>
                                </div>
                                 <div class="column is-3">
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


                            <!-- รูปภาพ -->
                            <div class="field">
                                <label class="label">รูปภาพเพิ่มเติม</label>
                                <div class="file is-info is-centered is-fullwidth">
                                    <label class="file-label">
                                    <input class="file-input" type="file" multiple accept="image/png, image/jpeg, image/jpg, image/webp"  @change="selectNewImage($event)">
                                       <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                เลือกภาพขั้นตอนการอบเมนูของคุณ...
                                            </span>
                                        </span>
                                    </label>
                                </div> 
                            </div>

                                
                            <div v-if="moreImages" class="columns is-multiline">
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
                                <!-- <img v-if="image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/webp'" :src="showImage(image)" alt="Placeholder image"> -->
                            </div>


                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-primary" @click="savePost">save</button>
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
                <div class="column is-2">

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
            // MainImage: '',
            ingredients: [],
            methodCook: [],
            newIngre: '',
            newMethod: '',
            moreImages: [],
            newImage: [],
            imageNo: [],
            
        }
    },
    created(){
        axios
            .get(`http://localhost:3000/posts/${this.$route.params.id}`)
            .then((response) => {
                this.title = response.data.posts.title
                this.description = response.data.posts.description
                this.typeDessert = response.data.posts.post_type_id
                this.ingredients = response.data.ingredients
                this.methodCook = response.data.methods
                this.moreImages = response.data.images
                this.moreImages.splice(0, 0, {image: response.data.posts.img})
                console.log(this.moreImages)
            })
            .catch((error) => {
                console.log(error)
            })

        
            // console.log(this.$route.params.id)
    },
    computed:{
        sizeMoreImage(){
            return this.moreImages.length
        },
        isNoMoreImage(){
            if (this.sizeMoreImage <= 0){
                return true;
            }
            return false;
        }
    },
    methods:{
        // selectMainImage(event){
        //     this.MainImage = event.target.files[0];
        // },
        selectNewImage(event){
            let file = event.target.files;
            for (let i=0; i<file.length; i++){
                this.newImage.push(file[i])
            }
        },
        showImage(image){
            return URL.createObjectURL(image)
        },
        deleteNewImage(index){
            this.newImage = Array.from(this.newImage)
            this.newImage.splice(index, 1)
        },
        deleteImage(index){
            this.moreImages = Array.from(this.moreImages)
            this.moreImages.splice(index, 1)
        },
        imagePath(file_path) {
            if (file_path){
                return 'http://localhost:3000/' + file_path
            } 
            else {
                return 'https://bulma.io/images/placeholders/640x360.png'
            }
        },
        deleteIngreItem(index){
            this.ingredients.splice(index, 1)
        },
        deleteMethodItem(index){
            this.methodCook.splice(index, 1)
        },
        addIngre(){
            if(this.newIngre === ''){
                alert('กรุณาใส่ส่วนผสม')
            }
            else{
                const newIngre = this.newIngre
                this.ingredients.push({ingredient: newIngre})
                this.newIngre = ''
            }
        },
        addMethodCook(){
            if(this.newMethod === ''){
                alert('กรุณาใส่วิธีทำ')
            }
            else{
                const newMethod = this.newMethod
                this.methodCook.push({cooking_method: newMethod})
                this.newMethod = ''
            }
        },
        savePost(){
            if(this.title === ''){
                alert('กรุณาใส่ชื่อเมนู')
            }
            else if(this.typeDessert === 0){
                alert('กรุณาเลือกประเภทขนม')
            }
            else if(this.ingredients.length <= 0){
                alert('กรุณาเพิ่มส่วนผสม')
            }
            else if(this.methodCook.length <= 0){
                alert('กรุณาเพิ่มวิธีทำ')
            }
            else if(this.newImage.length === 0){
                alert('กรุณาเพิ่มรูปภาพ')
            }
            else{
                const formData = new FormData();
                formData.append("title", this.title)
                formData.append("description", this.description)
                formData.append("typeDessert", this.typeDessert)

                // formData.append("mainImage", this.MainImage)

                this.ingredients.forEach((ingre) => {
                    formData.append("ingredient", ingre.ingredient);
                })
                this.methodCook.forEach((method) => {
                    formData.append("methodCook", method.cooking_method);
                })
                if (this.moreImages.length > 0){
                    this.moreImages.forEach((oldImg) => {
                        formData.append("oldImg", oldImg.image);
                    })
                }
                //  console.log(this.moreImages.length)
                // for(let i=0; i<this.moreImages.length; i++){
                //     let file = this.moreImages[i]
                //     formData.append("moreImages", file)
                // }
                for(let i=0; i<this.newImage.length; i++){
                    let file = this.newImage[i]
                    formData.append("newImage", file)
                }
                axios
                    .put(`http://localhost:3000/posts/update/${this.$route.params.id}`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then(() => this.$router.push({name: 'home'}))
                    .catch((err) => {
                        console.log(err);
                    });
            }

        },
    }
   
}


</script>
