<template>
    <div>
       <div id="div1">
           <div v-html="eText"></div>
       </div>
    </div>
</template>

<script>
import E from "wangeditor"
/* 
  npm install wangeditor 安装
  需在dom生成后使用  
*/
export default {
    name:'wangEditor',
    props:{
        eText:{
            type:String,
            default:''
        }
    },
    data(){
        return{
           editor:"",
        }
    },
    mounted() {
       this.loadEditor();
    },
    methods: {
        loadEditor() {
            this.editor = new E("#div1")
            this.editor.config.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    // 'link',  // 插入链接
    // 'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    // 'image',  // 插入图片
    // 'table',  // 表格
    // 'video',  // 插入视频
    // 'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
    ]

            this.editor.config.onchange = (newhtml) =>{
                this.$emit('sendEditor',newhtml)
            }
            //配置change事件触发间隔时间，默认为200ms
            this.editor.config.onchangeTimeout = 500;
            this.editor.create()
        }
    }
}
</script>

<style scoped>

</style>