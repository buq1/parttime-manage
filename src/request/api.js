import { requestOfPost } from './common.js';

export function postRequest(url,data){
    return new Promise((resolve,reject) => {
        requestOfPost(url,data).then(res => resolve(res))
        .catch(error => reject(error))
    })
}