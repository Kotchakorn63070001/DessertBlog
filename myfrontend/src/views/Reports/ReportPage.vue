<template>
    <div class="container is-widescreen">
        <div class="m-5">
            <div class="columns">
                <div class="column is-2"></div>
                <div class="column is-8">
                    <h3 class="title is-3">Report Problem</h3>
                        <div class="box has-background-info-light" v-for="report in reports" :key="report.report_id">
                            <div class="content">
                            <h5><b>{{report.report_title}}</b></h5>
                            <p v-if="report.post_id !== null">Post ID : {{report.post_id}}</p>
                            <p v-if="report.comment_id !== null">Comment ID : {{report.comment_id}}</p>
                            <p>{{ report.report_text }}</p>
                            <p>By Username : @{{report.username}}</p>
                            <div class="level-right">
                                <div class="buttons">
                                    <button class="button is-small is-warning is-rounded" v-if="report.status === 'pending'">{{report.status}}</button>
                                    <button class="button is-small is-primary is-rounded" v-else>{{report.status}}</button>
                                    <button class="button is-small is-info is-rounded" @click="changeStatus(report.report_id)">Change Status</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" :class="{'is-active' : showChangeStatus}">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">Change Status Report</p>
                    <button class="delete" aria-label="close" @click="showChangeStatus = false"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="field">
                            <label class="label">สถานะรายงานปัญหา</label>
                            <div class="select">
                                <select v-model="status">
                                    <option value="0" disabled="disabled">--- Select Status ---</option>
                                    <option value="1">pending</option>
                                    <option value="2">complete</option>
                                </select>
                                </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                    <button class="button is-success" @click="saveStatus">Save changes</button>
                    <button class="button" @click="showChangeStatus = false">Cancel</button>
                    </footer>
                </div>
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
            reports: [],
            showChangeStatus: false,
            idReportChange: 0,
            status: 0,
            error: null,
        }
    },
    mounted(){
        this.getReport();
    },
    methods:{
        getReport(){
            axios
            .get(`http://localhost:3000/reports`)
            .then((response) => {
                this.reports = response.data.reports

            })
            .catch((error) => {
                this.error = error.response.data.message;
            });
        },
        changeStatus(reportId){
            this.showChangeStatus = true;
            this.idReportChange = reportId;
        },
        saveStatus(){
            console.log('คลิกแล้วว')
            console.log(this.idReportChange)
            var reportId = this.idReportChange
            axios
                    .put(`http://localhost:3000/status/${reportId}`, {
                        status: this.status,
                    })
                    .then((response) => {
                        let selectReport = this.reports.filter(e => e.report_id === this.idReportChange)[0]
                        selectReport.status = response.data.status
                        this.status = 0
                        this.showChangeStatus = false
                        this.$router.push('/reports')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            // if (this.status === 2){
            //     axios
            //         .put(`http://localhost:3000/report/${reportId}`, {
            //             status: 'complete',
            //         })
            //         .then(() => {
            //             this.status = 0
            //             this.showChangeStatus = false
            //             this.$router.push({name: 'report'})
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //         })
            // }
            // else if (this.status === 1){
            //     axios
            //         .put(`http://localhost:3000/report/${reportId}`, {
            //             status: 'pending',
            //         })
            //         .then(() => {
            //             this.status = 0
            //             this.showChangeStatus = false
            //             this.$router.push({name: 'report'})
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //         })
            // }
        }
        
    }
   
}


</script>