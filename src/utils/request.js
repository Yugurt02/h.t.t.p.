import axios from 'axios';
import {ElMessage} from "element-plus";

const getHttpBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') { //生产环境
        return 'http://47.238.86.13:8090'
    } else { //开发环境
        return 'http://localhost:8090'
    }
}

// 创建axios实例
const service = axios.create({
    baseURL: getHttpBaseUrl(), // api的base_url
});

// 请求拦截器
service.interceptors.request.use(config => {
    return config;
}, error => {
    // 请求错误处理
    // console.log(error); // for debug
});

// 响应拦截器
service.interceptors.response.use(response => {
    // 可以在这里对响应数据进行处理，例如：对返回的状态码进行判断
    const res = response.data;
    if (res.code !== 200) {
        ElMessage({
            message: res.msg,
            type: 'error',
        })
    } else {
        // ElMessage({
        //     message: res.msg,
        //     type: 'success',
        // })
    }
    return res;
}, error => {
    // console.log('err' + error); // for debug
    ElMessage({
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error);
});

export default service;
