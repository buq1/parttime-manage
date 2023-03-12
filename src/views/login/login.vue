<template>
    <div>
        <el-header class="flex-float">
            <div class="flex">
                <img src="../../assets/logo.png" class="imgStyle" />
                <h4>欢迎登录大学生兼职信息后台管理系统</h4>
            </div>

        </el-header>
        <div class="nav">
            <div>
                <div class="l-tit">登录</div>
                <div class="l-nav">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                      <el-form-item prop="account">
                        <el-input v-model="ruleForm.account" placeholder="请输入账户名">
                            <template slot="prepend"><i class="el-icon-user-solid"></i></template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off">
                        <template slot="prepend"><i class="el-icon-lock"></i></template>
                            </el-input>
                        </el-form-item>

                        <el-radio v-model="ruleForm.verify" :label="true" @click.native.prevent="changeStatus()">记住我</el-radio>
                       
                            <el-button type="primary" @click="loginFn('ruleForm')">登录</el-button>

                    </el-form>
                    
                </div>
                <p>忘记密码请联系系统管理员</p>
            </div>
        </div>
    </div>
</template>



<script>
//axios api接口
import url from '../../request/url.js';
import { postRequest } from '../../request/api';
export default {
    name: "login",
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
        return {
            ruleForm: {
                account: "",
                password: "",
                verify: false
            },
            rules:{
                account:[
                    {required:true,message:'请输入账户',trigger:'blur'},
                    {min:3,max:12,message:'账户长度不符合标准',trigger:'blur'}
                ],
                password:[
                    {validator: validatePass, trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        loginFn(formName) {
            this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
                    account: this.ruleForm.account,
                    password: this.ruleForm.password
                };
                postRequest(url.login, data).then(
                    (res) => {
                        if (res.code == 400) {
                            this.msgFn("error", res.msg);
                            return;
                        }
                        if(this.ruleForm.verify){
                            localStorage.setItem("token", res.data.token)
                        }else{
                        sessionStorage.setItem("token", res.data.token);
                        }
                        setTimeout(() => {
                            this.$router.push("");
                        }, 2000)
                    },
                    (error) => {
                        console.log(error);
                    }
                )
          } else {
            console.log('error submit!!');
            return false;
          }
        })

        },
        changeStatus(){
            this.ruleForm.verify = ! this.ruleForm.verify
        }
    }
}
</script>

<style scoped>
.l-nav /deep/ .el-form-item__content{
    margin: 0px !important;
}
p{
    color: #0756e7;
    font-size: 14px;
}
.l-nav>form>label{
    margin-top: 4px;
transform: translateX(-110px);
}
.l-nav>form>button{
    margin-top: 18px;
    width:100%;
}
.demo-ruleForm{
width: 320px;
margin-top: 22px;
}
.el-input{
    margin-top: 9px;
}
.l-nav {
    color: #333333;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
i{
    font-size: 26px;
    font-weight: bold;
}
.l-tit {
    width: 100%;
    height: 60px;
    border-bottom: 1px dotted #e3e3e3;
    color: black;
    font-size: 26px;
    line-height: 80px;
    overflow: hidden;
}

.nav {
    width: 100%;
    height: calc(100vh - 66px);
    background-image: url('../../assets/background-gfd99d3f8c_1920.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav>div {
    width: 450px;
    height: 380px;
    background-color: #fff;
    opacity: 0.9;
    translate: 0 -30%;
    border-radius: 10px;
}

h4 {
    margin-left: 20px;
}

.flex-float {
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.flex {
    display: flex;
    align-items: center;
}

.imgStyle {
    width: 60px;
    height: 60px;
}

.el-header {
    background-color: #333333;
    height: 66px !important;
}
</style>