import axios from 'axios';
import { Loading,Message } from 'element-ui';
import router from '../router'
// 创建axios实例
const instance = axios.create({
    // 域名URL
    baseURL: process.env.BASE_URL,
    // `headers` 是即将被发送的自定义请求头
    headers: {
        'Content-Type': 'application/json'
    },
    // 请求超时时间
    timeout: 30000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // 默认的
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认的
    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }]

});
let loading
function startLoading() {
    loading = Loading.service({ fullscreen: true });
}
function endLoading() {
    if(loading)loading.close()
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.loading) startLoading()
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    setTimeout(() => {
        endLoading()
    }, 400);
    if(!!response.config.message) {
        response.data.success ? 
        Message.success(`${response.config.message}成功！`) :
        Message.error(`${response.config.message}失败！`);
    }
    return response.data;
}, function (error) {
    setTimeout(() => {
        endLoading()
    }, 400);
    Message.error('网络错误！');
    endLoading()
    router.push('/')
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;
