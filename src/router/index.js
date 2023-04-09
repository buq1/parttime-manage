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
                    path:'',
                    name:'index',
                    component:()=>import ('../views/index/index.vue')
                },
                {
                    path:'cvmanage',
                    name:'cvmanage',
                    component:()=>import ('../views/cvManage/index')
                },
                {
                    path:'approve',
                    name:'approve',
                    component:()=>import('../views/spManage/index')
                },
                {
                    path:'usermanage',
                    name:'usermanage',
                    component:()=>import('../views/userManage/index')
                },
                {
                    path:'gwmanage',
                    name:'gwmanage',
                    component:()=>import('../views/gwMange/index')
                },
                {
                    path:'gsmanage',
                    name:'gsmanage',
                    component:()=>import('../views/gsManage/index')
                },
                {
                    path:'notice',
                    name:'notice',
                    component:()=>import('../views/notice/index')
                },
                {
                    path:'info',
                    name:'info',
                    component:()=>import('../views/infoManage/index')
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