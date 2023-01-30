import service from './service.js';
//处理传参

//耦合度低 => 复用性高
export function requestOfPost(url,data){
    return service.post(url,data);
}

export function requestOfGet(url){
    return service.get(url);
}