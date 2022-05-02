<template>
    <div class="container is-widescreen">
        <section class="section" v-if="error">
            <div class="container is-widescreen">
                <div class="notification is-danger">{{ error }}</div>
            </div>
        </section>
        
        <div class="content m-5">
                <div class="card has-background-white">
                    <div class="hero-body">
                        <p class="title">{{ post.title }}</p>
                    </div>
                    <div class="card-image pt-5">
                        <div class="columns is-centered">
                                <div class="column is-half">
                                    <figure class="image">
                                        <img :src="imagePath(post.img)" alt="Placeholder image">
                                    </figure>
                                </div>
                        </div>
                        
                    </div>
                    <div class="card-content">
                        <div class="content">
                            {{ post.description }}
                        </div>
                        <div class="content">
                            <p class="is-size-5"><b>ส่วนผสม (Ingredient)</b></p>
                            <ul>
                                <li v-for="ingredient in ingredients" :key="ingredient.ingredient_no">{{ ingredient.ingredient }}</li>
                            </ul>
                        </div>
                        <div class="content">
                            <p class="is-size-5"><b>วิธีทำ (Cooking Method)</b></p>
                            <ol type="1">
                                <li v-for="method in methods" :key="method.cooking_method_no">{{ method.cooking_method }}</li>
                            </ol>
                        </div>

                        <div class="columns  is-gapless is-multiline">
                            <div class="column " v-for="image in images" :key="image.image_no">
                                <figure class="image"  >
                                    <img :src="imagePath(image.image)" style="width: 100%; border-radius: 5%" alt="Placeholder image">
                                   </figure>
                            </div>
                        </div>
                    </div>
           
                    <footer class="card-footer">
                        <a class="card-footer-item" href="/">To Home Page</a>
                    </footer>

                    
                </div>
            </div>
    </div>
</template>

<script>
import axios from "axios";

export default{
    data(){
        return{
            post: {},
            ingredients: [],
            methods: [],
            images: [],
            error: null,
        }
    },
    mounted(){
        this.getPostDetail(this.$route.params.id);
    },
    methods:{
        getPostDetail(postId){
            axios
            .get(`http://localhost:3000/posts/${postId}`)
            .then((response) => {
                this.post = response.data.posts;
                this.ingredients = response.data.ingredients;
                this.methods = response.data.methods;
                this.images = response.data.images;

            })
            .catch((error) => {
                this.error = error.response.data.message;
            });
        },
        imagePath(file_path) {
            if (file_path){
              return 'http://localhost:3000/' + file_path
            } 
            else {
              return 'https://bulma.io/images/placeholders/640x360.png'
            }
      },
    }
   
}


</script>