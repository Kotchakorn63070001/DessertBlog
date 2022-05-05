<template>
      <div class="container is-widescreen">
        <section class="section">
           <div class="content">
                 <div class="columns">
                   <div class="column is-4 is-offset-3">
                     <input class="input is-rounded" type="text" placeholder="ค้นหาเมนู" v-model="search">
                   </div>
                   <div class="column is-2">
                     <button class="button is-link is-rounded" @click="getPosts">Search</button>
                   </div>
                 </div>
          </div>
        </section>

        <div class="columns is-multiline">
          <div class="column is-3" v-for="post in posts" :key="post.id">
            <div class="card" style="height: 100%;">

              

              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="imagePath(post.img)" alt="Placeholder image">
                </figure>
              </div>

              <div style="position: absolute; top: 0.3em; right: 0.3em;">
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
                        <a class="dropdown-item" v-if="isPostOwner(post)" @click="$router.push({name:'edit-post', params:{id: post.post_id}})">
                          <span>Edit</span>
                        </a>
                        <a class="dropdown-item" v-if="isPostOwner(post) || isAdmin()" @click="deletePost(post)" >
                             <span>Delete</span>
                        </a>
                        <a class="dropdown-item" @click="addReport(post.post_id)">
                            <span>Report</span>
                        </a>
                      </div>
                    </div>
                  </div>
              </div>


              <div class="card-content">
                <div class="content">
                  <p class="title is-3">{{ post.title }} </p>
                  <p class="subtitle is-6">
                    {{ shortContent(post.description) }}
                  </p>

                </div>
                
                <div class="buttons">
                  <a class="button is-small is-danger is-light" @click="addLike(post.post_id)">
                      <span class="icon">
                        <i class="fa-solid fa-heart"></i>
                      </span>
                      <span>{{ post.num_like }}</span>
                  </a>
                  <a class="button is-small is-info is-light">
                      <span class="icon is-medium">
                        <i class="fa-solid fa-eye"></i>
                      </span>
                      <span>{{ post.num_view }}</span>
                  </a>
                  
                  <a class="button is-small is-primary is-light" @click="readMore(post.post_id)">
                    <router-link :to="`/posts/${post.post_id}`">
                      <span>Read More</span>
                    </router-link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
// import axios from "axios";
import axios from '@/plugins/axios'

export default {
props: ['user','admin'],

    data() {
      return {
        search: '',
        posts: [],
        showEditModal : false,

      }
    },
    created() {
       this.getPosts();    
    },
    methods: {
      getPosts(){
        axios
          .get('http://localhost:3000/', {
            params: {
              search: this.search,
            }
          })
          .then((response) => {
            this.posts = response.data;
          })
          .catch((err) => {
            console.log(err);
          })
      },
      imagePath(file_path) {
        if (file_path){
          return 'http://localhost:3000/' + file_path
        } 
        else {
          return 'https://bulma.io/images/placeholders/640x360.png'
        }
      },
      shortContent(content) {
        if (content.length > 200) {
          return content.substring(0, 197) + '...'
        }
        return content
      },
      addLike(postId){
        axios
          .put(`http://localhost:3000/posts/addlike/${postId}`)
          .then((response) => {
            let selectedPost = this.posts.filter(e => e.id === postId)[0]
            selectedPost.num_like = response.data.like
            this.$router.push('/home')
          })
          .catch((err) => {
            console.log(err);
          });
      },
      readMore(postId){
        axios
          .put(`http://localhost:3000/posts/addview/${postId}`)
          .then((response) => {
            let selectedPost = this.posts.filter(e => e.id === postId)[0]
            selectedPost.num_view = response.data.view
          })
          .catch((err) => {
            console.log(err);
          });
      },
      editPost(postId){
        axios
          .put(`http://localhost:3000/posts/update/${postId}`)
          .then((response) => {
            console.log(response.data)
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deletePost(post){
        const result = confirm(`Are you sure you want to delete '${post.title}'`);
        if (result) {
          axios
            .delete(`http://localhost:3000/posts/${post.post_id}`)
            .then((response) => {
              console.log(response)
              this.$router.push("/home");
            })
            .catch((error) => {
              alert(error);
            });
        }
      },
      addReport(postId){
        this.$router.push({name: 'create-report', params: { postId: postId}})
      },
      isPostOwner (post) {
      if (!this.user) return false
      return post.user_id === this.user.user_id
    },
      isAdmin() {
      if (!this.user) return false
      return this.user.role === 'admin'
    },
    }
  }
</script>

<style scoped>
</style>
