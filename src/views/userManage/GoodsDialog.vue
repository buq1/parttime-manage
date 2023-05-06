<!--
:visible.sync  控制 显示隐藏

-->
<template>
  <el-dialog :title="title" :visible.sync="a" width="70%" :before-close="handleClose">
    <div class="myform">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="请输入账户名"> </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" autocomplete="off"> </el-input>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="onSubmit">添 加</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { postRequest } from '@/request/api'
export default {
  props: ['title'],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      a: false,
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 3, max: 12, message: '账户长度不符合标准', trigger: 'blur' }
        ],
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      innerVisible: false,
      innerImgVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            user_name: this.form.account,
            user_password: this.form.password
          }
          postRequest('/userzc', data)
            .then(res => {
              if (res.status >= 200 && res.status < 300) {
                if (res.data.code == 400) {
                  this.$message.error(res.data.message)
                  return
                } else {
                  this.$message.success('添加成功')
                  this.resetForm()
                  this.a = false

                  this.$emit('successSubmit')
                }
              } else {
                this.$message.error('网络或服务器错误！')
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      console.log(this.$children[0])
      this.$refs['form'].resetFields()
      this.a = false
    }
  }
}
</script>

<style lang="scss" scoped>
.myform {
  padding: 20px;

  .line {
    text-align: center;
  }
}
</style>
