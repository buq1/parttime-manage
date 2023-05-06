<template>
  <el-container style="height: 100%">
    <el-header class="flex-float">
      <div class="flex">
        <img src="../assets/logo.png" class="imgStyle" />
        <h1 class="h-text">后台管理</h1>
        <h4>欢迎来到大学生兼职信息后台管理系统</h4>
      </div>

      <div class="flex reverse">
        <el-dropdown :show-timeout="150" @command="exitLogin($event)">
        <el-button icon="el-icon-setting" circle class="setting-button"></el-button>
        <el-dropdown-menu>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </el-header>
    <el-container class="nativeclass">
      <el-aside>
        <el-row class="tac" style="height: 100%">
          <el-menu style="height: 100%" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#333333" text-color="white" router>
            <el-menu-item index="1" route="/home/">
              <i class="el-icon-s-data"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-menu-item index="2" route="/home/approve">
              <i class="el-icon-s-check"></i>
              <span slot="title">审核</span>
            </el-menu-item>

            <el-menu-item index="3" route="/home/gwmanage">
              <i class="el-icon-document"></i>
              <span slot="title">招聘信息管理</span>
            </el-menu-item>
            <el-menu-item index="4" route="/home/gsmanage">
              <i class="el-icon-s-management"></i>
              <span slot="title">入驻公司管理</span>
            </el-menu-item>
            <el-menu-item index="5" route="/home/cvmanage">
              <i class="el-icon-s-check"></i>
              <span slot="title">用户简历管理</span>
            </el-menu-item>
            <el-menu-item index="6" route="/home/usermanage">
              <i class="el-icon-mouse"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>

            <el-menu-item index="7" route="/home/notice">
              <i class="el-icon-paperclip"></i>
              <span slot="title">通知公告</span>
            </el-menu-item>

            <el-menu-item index="8" route="/home/info">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员信息</span>
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main style="background: white">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keypath) {
      console.log(key, keypath)
    },
    handleClose(key, keypath) {
      console.log(key, keypath)
    },
    exitLogin(e){
      if (e == 'exit') {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.flex-float {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.flex {
  display: flex;
  align-items: center;
}
.nativeclass {
  height: calc(100vh - 66px);
}
.nativeclass /deep/ .el-main {
  height: 100%;
  overflow-y: auto;
  background-color: rgb(241, 244, 245) !important;
}
.imgStyle {
  width: 60px;
  height: 60px;
}
.el-header {
  background-color: #333333;
  height: 66px !important;
}
.el-aside {
  width: 200px !important;
}
.h-text {
  margin-left: 10px;
}
h4 {
  margin-left: 30px;
}
.reverse {
  flex-direction: row-reverse;
}
.setting-button {
  background: #333333;
  color: white;
  border: none;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
}
.el-button--default:hover,
.el-button--default:focus {
  background: #333333;
}
.is-circle {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
