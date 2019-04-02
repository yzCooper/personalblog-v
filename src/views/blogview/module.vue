<template>
    <div>
        <el-container>
            <el-header class="header" v-show="somethingshow">
                <el-row :gutter="20">
                    <el-col :span="4" style="padding-right: 7px;">
                        <div class="head-left">
                            <i class="el-icon-star-on"></i>
                            <span class="header_left_content">俞ZZZ的博客</span>
                            <i class="el-icon-star-on"></i>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="header_middle">
                            <i class="el-icon-search" style="font-size:14px"></i>
                            <input type="text" class="header_input"  size="15" placeholder="搜索文章">
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <div style="width:300px；float:right">
                                <el-menu default-active="1" class="header_menu" mode="horizontal">
                                    <el-menu-item index="1" @click="_changepage('1')">
                                        <i class="iconfont yzblog_home"></i>
                                        <span style="padding-left:6px">首页</span>
                                    </el-menu-item>
                                    <el-menu-item index="3" @click="_changepage('2')">
                                        <i class="iconfont yzblog_feilei"></i>
                                         <span style="padding-left:6px">分类</span>
                                    </el-menu-item>
                                    <el-menu-item index="4" @click="_changepage('3')">
                                        <i class="iconfont yzblog_guanyu"></i>
                                        <span style="padding-left:6px">关于</span>
                                    </el-menu-item>
                                </el-menu>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-header class="header" v-show="!somethingshow">
                <div class="head-left" style="position: relative;border:none">
                    <i class="el-icon-star-on"></i>
                    <span class="header_left_content">俞ZZZ的博客</span>
                    <i class="el-icon-star-on"></i>
                    <el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="_changepage('1')">首页</el-dropdown-item>
                            <el-dropdown-item @click.native="_changepage('2')">分类</el-dropdown-item>
                            <el-dropdown-item @click.native="_changepage('3')">关于</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-main style="padding:35px 0 0 0">
                    <el-col :span="4" class="content_left" v-show="somethingshow">
                        <div class="grid-content bg-purple">
                            <img src="../../assets/author.jpg" alt="" class="author_img">
                        </div>
                        <h2 class="name">俞宙</h2>
                        <div class="title">只想安静的学技术Zzz</div>
                        <div class="github">
                            <a href="https://github.com/yzHiteqinfo">
                                <i class="iconfont yzblog_git"></i>
                                <span>github</span>
                            </a>
                        </div>
                        <div style="clear:both"></div>
                        <div class="cut_off_rule" style="margin-bottom:60px">
                            <span class="cut_off_rule_title">最新文章</span>
                            <div v-for="item in latestArticle" :key="item.mid" class="pointer" @click="_chooseArticle(item)">{{item.moduleName}}</div>
                        </div>
                        <div class="cut_off_rule">
                            <span class="cut_off_rule_title">技能</span>
                            <div>
                                <el-tag class="tag_style">java</el-tag>
                                <el-tag type="success" class="tag_style">多线程</el-tag>
                                <el-tag type="warning" class="tag_style">IO</el-tag>
                                <el-tag type="success" class="tag_style">spring</el-tag>
                                <el-tag type="warning" class="tag_style">spring boot</el-tag>
                                <el-tag type="success" class="tag_style">分布式</el-tag>
                                <el-tag type="danger" class="tag_style">redis</el-tag>
                                <el-tag type="warning" class="tag_style">RocketMQ</el-tag>
                                <el-tag type="danger" class="tag_style">mysql</el-tag>
                                <el-tag type="warning" class="tag_style">js</el-tag>
                                <el-tag type="success" class="tag_style">vue</el-tag>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <router-view :articleInfo="articleInfo" :somethingshow="somethingshow"/>
                    </el-col>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import server from '@/server/blogpage';
export default {
    data() {
        return {
            menu:[],
            defaultactive:"",
            content:"",
            selectContent:"",
            optionVal:[],
            latestArticle:[],
            articleInfo:{},
            clientwidth:1080,
            somethingshow:true
        }
    },
    watch:{
        clientwidth:function(val){
            if(val > 1300){
                this.somethingshow = true
            }else{
                this.somethingshow = false
            }
        }
    },
    mounted(){
        // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
        this.clientwidth = `${document.body.clientWidth}`;
        // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
        const that = this;
        window.onresize = function temp() {
            that.clientwidth = `${document.body.clientWidth}`;
        };
        this._latestContentList()
    },
    methods: {
        _changepage(type){
            let path = type == '1' ? '/maincontent' : type =='2' ? 'classification' : '/aboutme'
            this.$router.push(path)
        },
        async _latestContentList(){
            let {data} = await server.latestContentList()
            this.latestArticle = data
            this.articleInfo = data[0]
        },
        _chooseArticle(item){
            this.articleInfo = item
        }
    },
    components: {
        
    }
}
</script>

<style scoped lang="less">
    .pointer {
        cursor: pointer;
    }
    .header{
        box-shadow: 0 2px 8px #f0f1f2;
        height: 64px !important;
        .header_left_content{
            font-family: inherit;
            font-weight: 500
        }
        .header_middle{
            padding: 16px 0;
            .header_input{
                width:200px;
                border:0px;
                outline: none;
                height:32px;
                padding-left: 6px; 
                font-size: 14px;
            }
            .header_input::-webkit-input-placeholder {
                color: #b1babf;
                opacity: 0.5;
                font-weight: bold;
            }
        }
        .header_menu{
            border:0;
            li{
                // padding-top: 10px;
                height: 64px;
            }
            li:hover{
                border-bottom: 2px solid #1890ff!important;
            }
        }
    }
    .head-left{
        text-align: center;
        font-size: 20px;
        position: relative;
        margin-top: 20px;
        border-right: 1px solid #ebedf0;
    }
    .blogname{
        text-align: center;
    }
    .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: 2px solid #1890ff!important;
        color: #303133;
    }
    .content_left{
        border-right:1px solid #ebedf0;
        height: calc(100vh - 106px);
        text-align: center;
        .author_img{
            width: 132px;
            height: 132px;
            border-radius: 50%;
        }
        .name{
            font-size: 1.5em;
            font-weight: 700;
            margin-top: 10px;
        }
        .title{
            font-size: 13px;
            margin-top: 5px;
            margin-bottom: 5px;
        }
        ul{
            width: 206px;
            margin: 0 auto;
            list-style: none;
            li{
                float: left;
                border-radius: 2px;
                padding: 2px;
                margin-top: 6px;
            }
            li:hover{
                background: #c7c7c7
            }
        }
        .github{
            text-align:center;
            margin-top:6px;
        }
        a{
            text-decoration: none;
            color: inherit;
        }
    }
    .cut_off_rule{
        width:100%;
        margin-top:35px;
        border-top:1px solid #ebedf0;
        position: relative;
        padding-top:20px;
        .cut_off_rule_title{
            position: absolute;
            top: -12px;
            left: 15px;
            background: #fff;
        }
        div{
            text-align: left;
            padding: 5px 15px;
            color:#8590a6;
            font-size: 14px;
        }
    }
    .tag_style{
        margin: 3px 8px 3px 0;
        height: 25px;
        line-height: 25px;
    }
</style>