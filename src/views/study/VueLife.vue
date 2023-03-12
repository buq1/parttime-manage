<template>
    <p id="dom">{{msg}}</p>
</template>
<script>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, reactive, toRefs } from 'vue'
export default {
    name:"life",
    setup(){
        const data = reactive({
            msg:"你好！",
            msg2:"hello world"
        })
        //数据渲染前
        onBeforeMount(() =>{
           console.log("onBeforeMount",document.querySelector("#dom"))
        })
        //数据渲染后
        onMounted(() => {
            console.log("onMounted",document.querySelector("#dom"))
            setTimeout(() => {
                data.msg = "hello"
                data.msg2 = "hello"
            }, 2000);
        })
        //dom更新前
        onBeforeUpdate(() => {
            console.log("onBeforeUpdate")
        })
        //dom更新后
        onUpdated(() => {
            //此处不能做数据变更，否则死循环
            console.log("onUpdated")
        })
        return{
            ...toRefs(data)
        }
    }
}
</script>