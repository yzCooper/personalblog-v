<template>
    <div v-loading="loading">
        <div v-html="content" :class="somethingshow ? 'content' : 'mincontent'" :style="'height:'+height+'px'"></div>
    </div>
</template>

<script>
import server from '@/server/blogpage.js'
import { setTimeout } from 'timers';
    export default {
        props:{
            articleInfo:{
                type:Object,
                default:{}
            },
            somethingshow:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                content:"",
                height:window.innerHeight - 120,
                loading:false
            }
        },
        watch:{
            articleInfo:function(val){
                this._getHelpInfo(val.wid,val.mid)
            },
            somethingshow:function(val){
                
            }
        },
        mounted(){
            let query = this.$route.query
            if(query.wid){
                this._getHelpInfo(query.wid,query.mid)
            }
        },
        methods: {
            async _getHelpInfo(wid,mid) {
                this.loading = true
                let {
                    data
                } = await server.getHelpInfo({
                    wid: wid,
                    mid: mid,
                })
                this.content = data
                setTimeout(() => {
                    this.loading = false
                }, 500);
            },
        },
        components: {
        }
    }
</script>
<style scoped>
    .pointer {
        cursor: pointer;
    }
    .content{
        padding-left: 35px;
        overflow: auto;
    }
    .content >>>img{
        width:80%;
        height:auto;
    }
    .content >>>.ql-align-center{
        text-align: center !important;
    }
    .mincontent{
        padding-left: 35px;
        width:100%;
    }
    .mincontent>>>img{
        width:80%;
        height:auto;
    }
</style>