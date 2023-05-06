<!--
:visible.sync  控制 显示隐藏

-->
<template>
  <el-dialog :title="title" :visible.sync="a" width="70%" :before-close="handleClose">
    <div class="myform">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item label="公司名称" prop="m_name">
          <el-input v-model="form.m_name"></el-input>
        </el-form-item>
        <el-form-item label="公司LOGO">
          <el-upload action="http://127.0.0.1:8088/oss/policy" :on-success="handleSuccess" :on-error="handleError" list-type="picture-card" :limit="1" :on-exceed="throwOver">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="公司管理员ID" prop="m_creater">
          <el-input v-model="form.m_creater"></el-input>
        </el-form-item>
        <el-form-item label="公司统一社会信用码" prop="m_shxydm">
          <el-input v-model="form.m_shxydm"></el-input>
        </el-form-item>
        <el-form-item label="公司营业执照照片">
          <el-upload action="http://127.0.0.1:8088/oss/policy" list-type="picture-card" :on-success="handleSuccess1" :on-error="handleError" :limit="1" :on-exceed="throwOver">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="公司简介">
          <el-input type="textarea" v-model="form.m_infor"></el-input>
        </el-form-item>
        <el-form-item label="公司环境照片">
          <el-upload class="upload-demo" action="http://127.0.0.1:8088/oss/policy" :on-success="handleSuccess2" :limit="6" :on-exceed="throwOver" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :multiple="true" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { postRequest } from '@/request/api'
export default {
  props: ['title'],
  data() {
    return {
      a: false,
      form: {
        m_name: '',
        m_photo: [],
        m_shxydm: '',
        m_infor: '',
        m_logo: '',
        m_yyzz: '',
        m_creater: '',
        m_status: 0
      },
      rules: {
        m_shxydm: [{ required: true, message: '请输入公司统一社会信用码', trigger: 'blur' }],
        m_name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        m_creater: [{ required: true, message: '请输入公司管理员ID', trigger: 'blur' }]
      },
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      disabled: false
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
      this.$refs.form.validate(async valid => {
        if (valid) {
          postRequest('/newAdminMechanism', this.form)
            .then(res => {
              this.$message.success('新建成功')
              this.resetForm()
              this.a = false
              this.$emit('successsubmit')
            })
            .catch(err => {
              console.log(err)
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
    },
    handleSuccess(res, file, fileList) {
      console.log(res)
      this.form.m_logo = res.data.imageurl
    },
    handleSuccess1(res, file, fileList) {
      this.form.m_yyzz = res.data.imageurl
    },
    handleSuccess2(res, file, fileList) {
      this.form.m_photo.push(res.data.imageurl)
      console.log(this.form.m_photo)
    },
    handleError(err, file, fileList) {
      console.log(err)
    },
    handleRemove(file, fileList) {
      console.log(file)
    },
    handlePreview(file) {
      console.log(file)
    },
    throwOver(file, fileList) {
      this.$message.error('文件数量超出限制,限制为1个')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
