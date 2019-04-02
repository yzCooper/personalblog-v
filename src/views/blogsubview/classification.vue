<template>
    <div>
        <div style="text-align:center">
            <div style="margin: 30px 0;">
                <span>博文分类</span>
                <i class="iconfont yzblog_shouzhi"></i>
                <i class="iconfont yzblog_shouzhi"></i>
                <i class="iconfont yzblog_shouzhi"></i>
            </div>
            <el-badge :value="item.num" class="pointer elbadge_style" v-for="(item,index) in taglist" :key="index">
                <el-tag :type="colorlist[index%3]" @click.native="_tagclick(item.wid,item.app_name)">{{item.app_name}}</el-tag>
            </el-badge>
            <el-timeline style="width: 300px;margin: 15px 0 0 100px;">
                <el-timeline-item  type="info" color="#1890ff" v-if="titlename" style="padding-bottom:50px;font-size:22px">
                    {{titlename}}
                </el-timeline-item>
                <el-timeline-item v-for="(activity, index) in timelineData" :key="index" type="info" color="#1890ff" 
                                class="pointer"
                                :timestamp="activity.create_time" 
                                @click.native="_checkBlog(activity.wid,activity.mid)">
                    {{activity.module_name}}
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    import server from '@/server/blogpage.js'
    export default {
        data() {
            return {
                taglist: [],
                colorlist: ['success', 'warning', 'danger'],
                content: "",
                timelineData:[],
                titlename:""
            }
        },
        mounted() {
            this.categorysource();
        },
        methods: {
            async categorysource() {
                const {
                    data
                } = await server.categorysource()
                this.taglist = data
            },
            async timeLineContent(wid) {
                const {
                    data
                } = await server.timeLineContent(wid)
                this.timelineData = data
            },
            _tagclick(wid,name) {
                this.titlename = name
                this.timeLineContent(wid)
            },
            _checkBlog(wid,mid){
                this.$router.push({
                    path:'/maincontent',
                    query:{"wid":wid,"mid":mid}
                })
            }
        },
        components: {}
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
    .elbadge_style {
        margin: 0 25px 0 0;
    }
    .content {
        padding-left: 35px;
        overflow: auto;
    }
    .content>>>img {
        width: 80%;
        height: auto;
    }
    .content>>>.ql-align-center {
        text-align: center !important;
    }
</style>