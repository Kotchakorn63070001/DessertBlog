<template>
    <div class="container is-widescreen">
        <div class="m-4">
            <div class="columns">
                <!-- <div class="is-2"></div> -->
                <div class="column is-three-fifths is-offset-one-fifth">
                    <div class="box">
                        <article class="media">
                            <figure class="media-left">
                                <figure class="image is-128x128">
                                    <img style="border-radius: 50%;width: 128px; height: 128px; overflow: hidden;" :src="imagePath(user.user_img)">
                                </figure>
                            </figure>
                            <div class="media-content mt-4">
                                <div class="content">
                                    <h4>Name     : {{user.name}}</h4>
                                    <h5>Username : {{user.username}}</h5>
                                    <p>Email     : {{user.email}} </p>
                                </div>
                            </div>
                            <div class="media-right">
                                <a>
                                    <!-- <router-link to="/create" class="has-text-white"> -->
                                     <span class="icon" @click="editProfile(user.user_id)">
                                        <!-- <span class="icon" @click="editProfile === true"> -->
                                            <i class="fa-solid fa-marker"></i>
                                        </span>
                                    <!-- </router-link> -->
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
            <!-- <div class="is-2"></div> -->
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
export default{
    props: ['user'],
    data(){
        // return{
        //     editProfile: false,
        // }
       
    },

        
    methods: {
        editProfile(userId){
            this.$router.push({name: 'edit-profile', params: {userId: userId}})
        },
        imagePath(file_path) {
            if (file_path){
            return 'http://localhost:3000/' + file_path
            } 
            else {
            return 'https://bulma.io/images/placeholders/128x128.png'
            }
        },
    }
}
</script>
