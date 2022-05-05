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
                                        <img :src="imagePath(post.img)" style="border-radius: 2%; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;" alt="Placeholder image">
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

                        <div class="columns is-gapless is-multiline">
                            <div class="column is-half mt-5" v-for="image in images" :key="image.image_no">
                                <figure class="image is-5by3">
                                    <img :src="imagePath(image.image)" style="border-radius: 2%" alt="Placeholder image">
                                   </figure>
                            </div>
                        </div>

                        <div class="container pb-3">
                            <p class="subtitle"><b>Comments</b></p>
                            <div class="box" v-for="(comment, index) in comments" :key="comment.comment_id">
                                <article class="media">
                                    <div class="media-left">
                                        <figure class="image is-96x96">
                                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <div class="content">
                                            <!-- <input v-model="editCommentText" class="input" type="text" /> -->
                                            <p class="is-size-6"><strong>@username</strong></p>
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
                                                    <a class="dropdown-item" @click="deleteComment(comment.comment_id, index)">
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
                            <div class="box">
                                <article class="media">
                                    <figure class="media-left">
                                        <p class="image is-96x96">
                                            <img src="https://bulma.io/images/placeholders/128x128.png">
                                        </p>
                                    </figure>
                                    <div class="media-content">
                                        <div class="field">
                                            <p class="is-size-6"><strong>@username</strong></p>
                                            <p class="control">
                                                <input type="text" class="input" v-model="newComment" placeholder="Add a comment..." />
                                            </p>
                                        </div>
                                        <nav class="level">
                                            <div class="level-left"></div>
                                            <div class="level-right">
                                                <div class="level-item">
                                                    <a class="button is-info" @click="submitComment">Submit</a>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>

                    <footer class="card-footer">
                        <a class="card-footer-item" href="/home">To Home Page</a>
                    </footer>

                    
                </div>
            </div>
    </div>
</template>

<script>
// import axios from "axios";
import axios from '@/plugins/axios'

export default{
    data(){
        return{
            post: {},
            ingredients: [],
            methods: [],
            images: [],
            comments: [],
            newComment: '',
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
        submitComment(){
            if (this.newComment !== ''){
                axios
                    .post(`http://localhost:3000/${this.$route.params.id}/comments`, {
                        comment: this.newComment,
                    })
                    .then((response) => {
                        this.newComment = ''
                        this.comments.push(response.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        deleteComment(commentId, index){
            axios
                .delete(`http://localhost:3000/comments/${commentId}`)
                .then((response) => {
                    console.log(response);
                    this.comments.splice(index, 1);
                    this.$router.push(`/posts/${this.$route.params.id}`)
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        
    }
   
}


</script>
