import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login/login.vue';
import home from '../views/HomeView.vue';
import vue from '@/main';


Vue.use(Router);


const router = new Router({
    mode: 'hash', // 去掉#，需要路由模式改为history
    routes:[
        {
            path:'/',
            name:'login',
            component:login,
        },
        {
            path:'/home',
            name:'home',
            component:home,
            children:[
                {
                    path:'index',
                    name:'index',
                    component:()=>import ('../views/index/index.vue')
                }
            ]
        },
    ]
});

router.beforeEach((to,from,next)=>{
    if(to.path =='/'){
        next()
    }else{
        if(sessionStorage.getItem("token")){
          next()
        }else{
           vue.$message.error("未登录，请登录！") 
           next({path:'/'})
        }
    }

},err=>{
    console.log(err)
})
router.afterEach((to,from)=>{
})
export default router