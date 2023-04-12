<template>
  <div class="c-nav">
    <div class="c-header">
      <span @click="$router.go(-1)">&lt;返回</span>
    </div>
    <div class="c-middle">
      <el-button type="primary" round @click="dialogVisible = true">添加公告</el-button>
    </div>
    <div class="c-bottom">
      <div class="bar-title">现行公告</div>
      <el-table :data="tableData" :max-height="300" border style="width: 100%">
        <el-table-column prop="n_id" label="公告ID" min-width="80"> </el-table-column>
        <el-table-column prop="n_title" label="公告标题" min-width="100"> </el-table-column>
        <el-table-column prop="n_nav" label="公告内容" min-width="300"> </el-table-column>
        <el-table-column label="公告封面" min-width="120">
          <template v-slot="scope">
            <el-image :lazy-load="true" :src="scope.row.n_photo"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="n_status" label="公告状态" min-width="60"> </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template v-slot="scope">
            <el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
            <el-button @click="onDelete(scope.row)" type="danger" size="small">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="c-bottom">
      <div class="bar-title">公告记录</div>
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="n_id" label="公告ID" min-width="80"> </el-table-column>
        <el-table-column prop="n_title" label="公告标题" min-width="100"> </el-table-column>
        <el-table-column prop="n_nav" label="公告内容" min-width="300"> </el-table-column>
        <el-table-column label="公告封面" min-width="120">
          <template v-slot="scope">
            <el-image :lazy-load="true" :src="scope.row.n_photo"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="n_status" label="公告状态" min-width="60"> </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template v-slot="scope">
            <el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
            <el-button @click="onDelete(scope.row)" type="primary" size="small">上线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新加公告" :close-on-click-modal="false" center :visible="dialogVisible" width="30%">
      <el-form ref="form" :model="from" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="from.n_title"></el-input>
        </el-form-item>
        <el-form-item label="公告封面">
          <el-upload class="avatar-uploader" action="http://127.0.0.1:8088/oss/policy" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input v-model="from.n_nav"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button type="primary" @click="onSubmit(1)">保存并上线</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { postRequest } from '@/request/api'
export default {
  methods: {
    handleClick(row) {
      this.dialogVisible = true
      this.from = row
    },
    onSubmit(v) {
      let status = Number(v || 0)
      this.from.n_status = status
      postRequest('/newnotice', this.from)
        .then(res => {
          if (v) {
            this.$notify({
              title: '成功',
              message: '成功提交公告，可去前台看效果',
              offset: 100
            })
          } else {
            this.$notify({
              title: '成功',
              message: '成功保存',
              offset: 100
            })
          }
        })
        .catch(err => {
          console.log(err)
        })

      this.dialogVisible = false
      this.from = {
        n_title: '',
        n_photo: '',
        n_nav: ''
      }
    },
    onDelete(row) {
      this.MessageBox.confirm('此操作将下线该公告，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({ type: 'success', message: '删除成功！' })
        })
        .catch(() => {})
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = res.data.imageurl
      this.from.n_photo = res.data.imageurl
    }
  },

  data() {
    return {
      tableData: [
        {
          n_id: 1,
          n_title: '123213131231',
          n_photo: 'ssssss',
          n_nav: '',
          n_status: 0
        }
      ],
      tableData1: [
        {
          n_id: 1,
          n_title: '123213131231',
          n_photo: 'ssssss',
          n_nav: '',
          n_status: 0
        }
      ],
      imageUrl: '',
      dialogVisible: false,
      from: {
        n_title: '',
        n_photo: '',
        n_nav: ''
      }
    }
  }
}
</script>

<style scoped>
.bar-title {
  padding: 10px 20px;
}
.c-bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.c-middle {
  width: 100%;
  margin: 15px 0;
  box-sizing: border-box;
  padding: 0 30px;
}
.c-nav {
  width: 100%;
  height: inherit;
  overflow-y: auto;
  color: black;
}
.c-header {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #aaa;
}
.c-header > span {
  cursor: pointer;
}
.c-header > span:hover {
  color: blue;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
