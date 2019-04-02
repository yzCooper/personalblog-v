import axios from '@/libs/axios';
import qs from 'qs';
export default {
    isAuthenticated: (param) => {
        return axios({
            url: '/helpcenter/isAuthenticated',
            method: 'GET',
            params:param
        });
    },
    userLogin: (param) => {
        return axios({
            url: '/helpcenter/login',
            method: 'POST',
            data:qs.stringify(param),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
    },
    userLogOut: () => {
        return axios({
            url: '/helpcenter/logout',
            method: 'POST',
        });
    },
    getAllAppList: () => {
        return axios({
            url: '/helpcenter/manage/getapplicationname',
            method: 'GET',
            loading:true
        });
    },
    addApplication: (param) => {
        return axios({
            url: '/helpcenter/manage/addApplication',
            method: 'post',
            message:'新增',
            data: param
        });
    },
    updateApplication: (param) => {
        return axios({
            url: '/helpcenter/manage/updateApplication',
            method: 'POST',
            message:'修改',
            data: param
        });
    },
    delApplication: (param) => {
        return axios({
            url: '/helpcenter/manage/delApplication',
            method: 'post',
            message:'删除',
            data: param
        });
    },
    addOrUpdateModule(type,param) {
        return axios({
            url: `/helpcenter/manage/${type}`,
            method: 'post',
            message:type === 'addModule' ? '添加' : '修改',
            data: param
        });
    },
    delModule: (param) => {
        return axios({
            url: '/helpcenter/manage/delModule',
            method: 'post',
            message:'删除',
            data: param
        });
    },
    savehelpsource: (param) => {
        return axios({
            url: '/helpcenter/manage/uploadWordToHtml',
            method: 'post',
            message:'保存',
            data: param
        });
    },
    getappModuleFromWid:(param) =>{
        return axios({
            url: '/helpcenter/manage/getappModuleFromWid',
            method: 'post',
            data: {"wid":param}
        });
    },
    getManageHelpInfo: (param) => {
        return axios({
            url: '/helpcenter/manage/helpinfo',
            method: 'post',
            data: param
        });
    }
}