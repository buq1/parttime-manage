
module.exports ={
  lintOnSave: false,
  /*devServer:{
    open:true,
    proxy:{
      '/api':{
        //通信目标地址
        target:'',
        //ws => websocket (即时通讯，比如游戏)
        //同意跨域
        changeOrigin:true,
        //重写
        pathRewrite:{
          '/api':''
        }

      }
    }
   
  },*/
  //全局sass引入
  /* 需安装node-sass，目前安装报错
  css:{
    loaderOptions:{
      sass:{
        prependData:'@import "./src/common/css/global.scss"'
      }
    }
  },*/
  //vue打包优化
}
