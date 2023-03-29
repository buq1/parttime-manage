import vue from '../main.js';
import axios from 'axios'
//引入axios，直接与后台接口交互，统一处理所有接口（加token）

function getTokenByLocal(){
    let token = sessionStorage.getItem("token");
    return token;
}
const service = axios.create({
    baseURL:'http://127.0.0.1:8088',
    timeout: 5000
})
//请求拦截
service.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
//响应拦截
service.interceptors.response.use(
    response => {
        // let res = JSON.parse(response.data);
        console.log(response)
        return Promise.resolve(response);
     },
     error => {
        vue.$message.error("服务器错误")
        return Promise.reject(error);
     }
)
export default service;