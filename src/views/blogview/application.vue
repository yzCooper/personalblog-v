<template>
    <div class="bac_img">
        <div class="help_top">
            <h1 style="color:#fff">YZ BLOG</h1>
            <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select _input">
                <el-button slot="append" icon="el-icon-search">搜索</el-button>
            </el-input>
        </div>
        <div class="help_content">
            <el-row v-for="(val,k) in appmoduleList" :key='k'>
                <el-col :span="6" v-for="(item,index) in val" :key="index" style="position:relative">
                    <h3><i class="el-icon-menu" style="padding-right:10px"></i>{{item[0].appName}}</h3>
                    <ul class="changeHeight" :id="k+index">
                        <li v-for="(mod,i) in item" :key="i" v-if="mod.moduleName"  @click="_showHelpDetail(mod,item)">{{mod.moduleName}}</li>
                    </ul>
                    <div v-if="item.length>5" style="position:absolute;left:30px;bottom: -5px;cursor: pointer;" @click="showMore(k+index)">
                        <span>更多</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import server from '@/server/index';
export default {
    data() {
        return {
            searchContent:"",
            appmoduleList:[]
        }
    },
    mounted(){
        this.getAllAppList()
    },
    methods: {
        async getAllAppList() {
            let {data} = await server.getAllAppList()
            let i = -1;
            let arr = [];
            _.each(data,(value,key)=>{
                i++;
                if(i%4 !=0 || i==0){
                    arr.push(value);
                }else{
                    this.appmoduleList.push(arr);
                    arr=[];
                    arr.push(value);
                }
            })
            this.appmoduleList.push(arr);
        },
        _showHelpDetail(val,item){
            this.$router.push({
                name:'module',
                query:{
                    menu:JSON.stringify(item),
                    checked:JSON.stringify(val)
                }
            })
        },
        showMore(item){
            if(document.getElementById(item).className){
                document.getElementById(item).setAttribute("class","")
            }else{
                document.getElementById(item).setAttribute("class","changeHeight")
            }

            
        }
    },
    components: {
    
    }
}
</script>
<style lang="less">
</style>
<style scoped lang="less">
        .bac_img{
            background-image: url('../../assets/bg.jpg');
            width:100%;
            height:100%;
        }
    .help_top{
        padding-top: 200px;
        text-align: center;
    }
    .help_content{
        width: 60%;
        margin: 100px auto;
        color:#fff;
        ul{
            list-style: none;
            padding-left:30px;
            overflow: hidden;
            li{
                cursor: pointer;
                width:70%;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #c7c7c7;
                font-size: 14px;
            }
        }

    }
    ._input{
        width: 50%;
    }
    .changeHeight{
        height: 200px;
    }
        .changeHeight2{
        height: 500px;
    }
</style>