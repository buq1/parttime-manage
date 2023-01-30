<template>
  <div id="app">
    <el-container style="height:100%">
      <el-header style="height:96px">
        <table width="100%" hight="96px" border="0" cellpadding="0" cellspacing="0">

    <tr id="header">
        <td>

        </td>
        <td>
            <h2>后台管理</h2>
        </td>
        <td>
            <h4>欢迎来到大学生兼职信息后台管理系统</h4>
        </td>
        <td>
          
        </td>
    </tr>
        </table>
      </el-header>
      <el-container class="nativeclass">
        <el-aside>
 <el-row class="tac" style="height:100%">          
    <el-menu
      style="height:100%"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333333"
      text-color="white"
      >
      
      <el-menu-item index="2">
        <i class="el-icon-message-solid"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
            
          </el-row> 
        </el-aside>
        <el-main style="background:white">


        </el-main>
      </el-container>
    </el-container>
</div>
</template>

<script>

export default {
  methods:{
    handleOpen(key,keypath){
      console.log(key,keypath);
    },
    handleClose(key,keypath){
      console.log(key,keypath);
    }
  }

}
</script>

<style>
body {
background-color: #333333;
height: 100%;
margin: 0;
}
html{height:100%}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  height: 100%;
}
#header{
  width: 100%;
   height: 8vh;
   min-height: 80px;
   max-height: 100px;
}
.nativeclass{
  height: calc(100% - 96px);
}

</style>
