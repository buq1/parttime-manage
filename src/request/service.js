import vue from '../main.js';
import axios from 'axios'
//引入axios，直接与后台接口交互，统一处理所有接口（加token）

function getTokenByLocal(){
    let token = sessionStorage.getItem("token");
    return token;
}
const service = axios.create({
    baseURL:'/api',
    timeout: 5000
})
//请求拦截
service.interceptors.request.use(
    config => {
        if(getTokenByLocal()){
            config.headers['token'] = getTokenByLocal();

        }else{
           vue.$router.push('/login');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
//响应拦截
service.interceptors.response.use(
    response => {
        let res = response.data;
        if(res.code == '-101'){
          vue.$router.push('/login');
        }
        return Promise.resolve(res);
     },
     error => {
        return Promise.reject(error);
     }
)
export default service;