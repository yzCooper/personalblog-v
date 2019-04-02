import axios from '@/libs/axios';
import qs from 'qs';
export default {
    /**
     * 获取博文内容
     * @param {"wid":wid,"mid":mid}
     */
    getHelpInfo: (param) => {
        return axios({
            url: '/helpcenter/info/helpinfo',
            method: 'post',
            data: param
        });
    },
    /**
     * 获取分类页面所有文章标签
     */
    categorysource:()=>{
        return axios({
            url: '/helpcenter/info/categorysource',
            method: 'GET'
        });
    },
    /**
     * 获取时间线数据
     * @param wid 标签id
     */
    timeLineContent:(wid)=>{
        return axios({
            url: '/helpcenter/info/timeLineContent',
            method: 'GET',
            params:{"wid":wid}
        });
    },

    /**
     * 获取最新的文章数据
     */
    latestContentList:()=>{
        return axios({
            url: '/helpcenter/info/latestContentList',
            method: 'GET'
        });
    }
}