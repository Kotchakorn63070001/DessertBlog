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

                        <div class="container pb-3">
                            <p class="subtitle"><b>Comments</b></p>
                            <div class="box" v-for="(comment) in comments" :key="comment.id">
                                <article class="media">
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <div class="content">
                                            <!-- <input v-model="editCommentText" class="input" type="text" /> -->
                                            <p class="is-size-6">@username</p>
                                            <p class="is-size-6">{{ comment.comment_text }}</p>
                                        </div>
                                    </div>
                                    <div>
                                            <div class="dropdown is-right is-hoverable">
                                                <div class="dropdown-trigger">
                                                <button class="button is-small is-link is-light is-rounded" aria-haspopup="true" aria-controls="dropdown-menu3" style="padding-left: 1em; padding-right: 1em;">
                                                    <span class="icon is-medium">
                                                    <i class="fa-solid fa-ellipsis" aria-hidden="true"></i>
                                                    </span>
                                                </button>
                                                </div>
                                                <div class="dropdown-menu" id="dropdown-menu3" role="menu" style="min-width: 5em">
                                                <div class="dropdown-content" style="padding-top: 0.2rem; padding-bottom: 0.2rem">
                                                    <a class="dropdown-item">
                                                    <span>Edit</span>
                                                    </a>
                                                    <a class="dropdown-item">
                                                        <span>Delete</span>
                                                    </a>
                                                    <a href="#" class="dropdown-item">
                                                    <span>Report</span>
                                                    </a>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                </article>
            </div>
              <!-- <div class="columns">
                <div class="column is-8">
                  <input type="text" class="input" v-model="commTxt" placeholder="Add new comment" />
                </div>
                <div class="column is-4">
                  <button @click="addComment" class="button">Add comment</button>
                </div>
              </div> -->
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
            comments: [],
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
                this.comments = response.data.comments

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