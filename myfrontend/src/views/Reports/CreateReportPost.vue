<template>
    <div class="container is-widescreen">
        <div class="m-4">
            <div class="columns">
                <div class="column is-2"></div>
                <div class="column is-8">
                    <div class="box">
                        <div class="field">
                                <label class="label">หัวข้อรายงานปัญหา</label>
                                <div class="control">
                                  <input class="input is-info" type="text" name="titleReport" v-model="titleReport" placeholder="หัวข้อรายงานปัญหาที่คุณพบ">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">เนื้อหารายงานปัญหา</label>
                                <div class="control">
                                    <textarea class="textarea is-info" name="textReport" v-model="textReport" placeholder="เนื้อหารายงานปัญหาที่คุณพบ"></textarea>
                                </div>
                            </div>

                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-primary" @click="submitReportPost">submit</button>
                                </div>
                                <div class="control">
                                    <router-link to="/home">
                                        <button class="button is-primary is-light">cancel</button>
                                    </router-link>
                                </div>
                            </div>
                            
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import axios from '@/plugins/axios'

export default{
    data(){
        return{
            titleReport: '',
            textReport: '',
        }
    },
    methods:{
       submitReportPost(){
           axios
            .post(`http://localhost:3000/create/report/post/${this.$route.params.postId}`, {
                titleReport: this.titleReport,
                textReport: this.textReport,
            })
            .then(() => {
                this.$router.push({name: 'home'})
            })
            .catch((err) => {
                console.log(err)
            })
            
       },
    },
}

</script>