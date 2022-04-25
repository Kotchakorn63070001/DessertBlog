<template>
      <div class="container is-widescreen">
        <section class="section" id="app">
           <div class="content">
            <form method="GET" action="/home">
                 <div class="columns">
                   <div class="column is-4 is-offset-3">
                     <input class="input is-rounded" type="text" name="search" placeholder="ค้นหาเมนู" value="">
                   </div>
                   <div class="column is-2">
                     <input class="button is-link is-rounded" type="submit" value="Search">
                   </div>
                 </div>
            </form>
          </div>
        </section>

        <div class="columns is-multiline">
          <div class="column is-3" v-for="post in posts" :key="post.id">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="imagePath(post.img)" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <p class="title is-3">{{ post.title }}</p>
                  <p class="subtitle is-6">
                    {{ shortContent(post.description) }}
                  </p>

                </div>
                <div>
                  <button class="button is-small is-danger is-light" @click="addLike(post.post_id)">
                    <span class="icon-text">
                        <span class="icon is-medium">
                          <i class="fa-solid fa-heart"></i>
                        </span>
                        <span>{{ post.num_like }}</span>
                    </span>
                  </button>
                  <button class="button is-small is-info is-light">
                    <span class="icon-text">
                      <span class="icon is-medium">
                        <i class="fa-solid fa-eye"></i>
                      </span>
                      <span>{{ post.num_view }}</span>
                    </span>
                  </button>
                  <a class="button is-small is-primary is-light" href="<%= `/posts/${post.post_id}/` %>">
                    <span>Read More</span>
                  </a>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
      return {
        search: '',
        posts: [],
      }
    },
    created() {
      axios.get("http://localhost:3000/")
        .then((response) => {
          this.posts = response.data;
          console.log(this.posts)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    methods: {
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped>
</style>