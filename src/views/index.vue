<template>
    <wrapper>
        <el-card class="box-card" style="min-height: calc(100vh - 102px);">
            <div slot="header" class="clearfix">
                <span>博客管理</span>
                <el-button @click="addNewApp" icon="el-icon-circle-plus-outline" style="float: right; padding: 3px 0" type="text">添加标签</el-button>
            </div>
             <el-tabs v-model="activeName" @tab-click="handleClick" @tab-remove="deleteApp">
                <el-tab-pane v-for="(item,index) in appList" :key="index" 
                            closable :name="item[0].wid">
                            <span slot="label" @dblclick="editApp(item[0],index)">
                                {{item[0].appName+' ('+item.filter(t => t.mid).length + ')'}}
                            </span>
                    <el-row :gutter="20">
                        <el-col class="module-help-card" :lg="6" :xl="4">
                            <div class="addModuleBtn" @click="addNewModule">
                                <i class="el-icon-plus"></i>
                            </div>
                        </el-col>
                        <el-col class="module-help-card" 
                        v-dragging="{ item: element, list: item, group: 'item' }"
                        v-for="element in item.filter(t => t.mid)" :key="element.mid" :lg="6" :xl="4">
                            <el-card shadow="hover" @click.native="lookOrEditHelp(element)" :body-style="{ padding: '0px' }">
                                <div style="padding: 14px;position:relative">
                                    <span>{{element.moduleName}}</span>
                                    <div class="sub-text">
                                        更新时间：{{element.updateTime||'暂无'}}
                                        <span v-if="!!element.updateTime" style="float:right;color:#67C23A">
                                            <i class="el-icon-success"></i> 已完成
                                        </span>
                                        <span v-else style="float:right;color:#E6A23C">
                                            <i class="el-icon-warning"></i> 未完成
                                        </span>
                                    </div>
                                    <div style="position:absolute;right:14px;top:14px;cursor:pointer">
                                        <el-dropdown @click.native="handleStop" trigger="click" @command="handleCommand(element,$event)">
                                            <span class="el-dropdown-link">
                                                <i class="el-icon-more"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog
            :title="modalTitle"
            :visible.sync="addAppDialogVisible"
            :close-on-click-modal="false"
            class="appModal"
            width="420px"
            >
            <el-form v-if="handleType === 'app'" label-position="top" label-width="80px" :model="appForm">
                <!-- <el-form-item label="应用id">
                    <el-input v-model="appForm.wid"></el-input>
                </el-form-item> -->
                <el-form-item label="应用名称">
                    <el-input v-model="appForm.appName"></el-input>
                </el-form-item>
            </el-form>
            <el-form v-else label-position="top" label-width="80px" :model="appForm">
                <el-form-item label="模块名称">
                    <el-input v-model="appForm.moduleName"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addAppDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAppOrModule">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="帮助文档"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            >
            <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                >
            </quill-editor>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditContent">确 定</el-button>
            </span>
        </el-dialog>
    </wrapper>
</template>

<script>
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module';
import Wrapper from '@/components/wrapper';
import server from '@/server/index';
Quill.register('modules/ImageResize', ImageResize)
export default {
    components: {
        Wrapper,quillEditor
    },
    data() {
        return {
            appList:[],
            activeName: '',
            dialogVisible:false,
            addAppDialogVisible:false,
            modalTitle:'',
            handleType:'',
            selectedModule:null,
            appForm: {
                wid: '',
                appName: '',
                moduleName:''
            },
            editApIpnput:'',
            canEditIndex:'',
            editInputValue:'',
            content:'',
            editorOption:{
                modules: {
                    ImageResize: {},
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image']
                    ]
                }
            }
        }
    },
    mounted() {
        this.getAllAppList(true)
        this.$dragging.$on('dragged', ({ value }) => {
            console.log(value.list)
        })
    },
    methods: {
        async getAllAppList(isInit = false) {
            const {data} = await server.getAllAppList()
            this.appList = [...Object.values({...data})]
            if(isInit) this.activeName = this.appList[0][0].wid
        },
        handleClick(tab, event) {
            this.activeName = tab.name
        },
        emptyForm() {
            this.appForm =  {
                wid: '',
                appName: '',
                moduleName:''
            }
        },
        addNewApp() {
            this.handleType = 'app'
            this.modalTitle = '添加应用'
            this.emptyForm()
            this.addAppDialogVisible = true
        },
        saveAppOrModule() {
            if(this.handleType === 'app') {
                const param = _.omit(this.appForm,'moduleName')
                this.addApplication(param)
            }else {
                const param = _.pick(this.appForm,'moduleName')
                this.handleType === 'addModule' ? param.wid = this.activeName : param.mid = this.selectedModule.mid
                this.addOrEditModule(param)
            }
        },
        addApplication(param) {
            server.addApplication(param).then(() => {
                this.addAppDialogVisible = false
                this.getAllAppList()
            })
        },
        updateApplication(param) {
            server.updateApplication(param).then(res => {
                this.canEditIndex = ''
                this.getAllAppList()
            }).catch(err => {
                console.log(err);
            })
        },
        deleteApp(wid) {
            this.$confirm('是否要删除该应用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delApplication({wid:wid})
            }).catch(() => {
                
            });
        },
        delApplication(param) {
            server.delApplication(param).then(() => {
                this.getAllAppList(true)
            })
        },
        addNewModule() {
            this.handleType = 'addModule'
            this.modalTitle = '添加模块'
            this.emptyForm()
            this.addAppDialogVisible = true
        },
        addOrEditModule(param) {
            server.addOrUpdateModule(this.handleType,param).then(() => {
                this.getAllAppList()
                this.addAppDialogVisible = false
            })
        },
        lookOrEditHelp(row) {
            this.selectedModule = row
            this.dialogVisible = true
            server.getManageHelpInfo(row).then(res => {
                this.content = res.data
            })
        },
        async saveEditContent() {
            server.savehelpsource(Object.assign({},this.selectedModule,{sourcedata:this.content})).then(() => {
                this.dialogVisible = false
                this.getAllAppList()
            })
        },
        editApp(item,index) {
            this.canEditIndex = index 
            this.$prompt('请输入应用名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue:item.appName
            }).then(({ value }) => {
                this.updateApplication({wid:this.activeName,appName:value})
            }).catch(() => {
              
            });
        },
        handleCommand(row,command) {
            if(command === 'edit') {
                this.modalTitle = '编辑模块'
                this.handleType = 'updateModule'
                this.selectedModule = row
                this.appForm.moduleName = row.moduleName
                this.addAppDialogVisible = true
            }else {
                this.$confirm('确认删除该模块吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delModule(row)
                }).catch(() => {

                });
            }
        },
        async delModule(param) {
            server.delModule(param).then(() => {
                this.getAllAppList()
            })
        },
        handleStop(e) {
            e.stopPropagation();
        }
    },
}
</script>

<style scoped lang="less">
.module-help-card {
    margin-bottom: 20px;
    font-family: '微软雅黑';
    height:80px;
}
.sub-text {
    margin-top: 15px;
    font-size: 12px;
    color:#909399
}
.appModal /deep/ .el-dialog__body{
    padding: 0 20px;
}
.addModuleBtn {
    border:1px dashed #dcdcdc;
    height: 80px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        box-shadow: 2px 3px 6px 0px #ebebeb;
        transition: all .3s;
    }
    i {
        line-height: 75px;
        font-size: 1.5em;
        color:#909399
    }
}
</style>
<style>
.ql-container {
    height: 50vh!important;
}
.dragging .el-card{
    background: #A52134
}
.dragging .el-card{
    color: #fff
}
</style>
