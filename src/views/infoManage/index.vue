<template>
  <div class="i-nav">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认新密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">更改密码</el-button>

  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { postRequest } from '@/request/api';

export default {
  data() {
     var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        }else{
          callback();
        } 
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入新密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          password: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
         password :[
            {validator:validatePass1,trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let val = new FormData()
            val.append('password',this.ruleForm.password)
            val.append('username',sessionStorage.getItem('username'))
            val.append('newpassword',this.ruleForm.checkPass)
            postRequest('changepass',val).then(
              res=>{
                console.log(res)
                if(res.data.code == '200'){
                  this.$message.success(res.data.message)
                  sessionStorage.removeItem('username')
                  this.$router.replace({name:'login'})
                }else{
                  this.$message.error(res.data.message)
                }
              }
            ).catch(
              err=>{
                console.log(err)
              }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  
}
</script>

<style lang="scss" scoped>
.i-nav{
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
