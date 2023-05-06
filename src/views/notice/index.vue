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
        <el-table-column prop="n_nav" label="公告内容" min-width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.n_nav"></div>
          </template>
        </el-table-column>
        <el-table-column label="公告封面" min-width="120">
          <template v-slot="scope">
            <el-image :lazy-load="true" :src="scope.row.n_photo"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="公告状态" min-width="60">
          <template v-slot="{ row }">
            <span>{{ row.n_status | statusFilter }} </span>
          </template>
        </el-table-column>
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
        <el-table-column prop="n_nav" label="公告内容" min-width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.n_nav"></div>
          </template>
        </el-table-column>
        <el-table-column label="公告封面" min-width="120">
          <template v-slot="scope">
            <el-image :lazy-load="true" :src="scope.row.n_photo"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="公告状态" min-width="60">
          <template v-slot="{ row }">
            <span>{{ row.n_status | statusFilter }} </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template v-slot="scope">
            <el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
            <el-button @click="onDelete(scope.row)" type="primary" size="small">上线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
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
          <wangEditor :e-text="from.n_nav" @sendEditor="getNavText"> </wangEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button v-show="pd" type="primary" @click="onSubmit(1)">保存并上线</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { postRequest, getRequest } from '@/request/api'
import wangEditor from '@/components/wangEditor.vue'
export default {
  components: {
    wangEditor
  },
  created() {
    this.initTableData()
    this.initTableData1()
  },
  filters: {
    statusFilter(status) {
      return ['已下线', '公告中'][status]
    }
  },
  methods: {
    getNavText(val) {
      this.nav = val
    },
    handleClick(row) {
      console.log(row)
      this.dialogVisible = true
      this.imageUrl = row.n_photo
      this.from = row
      this.pd = false
    },
    onSubmit(v) {
      if (this.pd) {
        let status = Number(v || 0)
        this.from.n_status = status
        this.from.n_nav = this.nav
        console.log(this.from)
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
            this.imageUrl = ''
            this.initTableData()
            this.initTableData1()
            this.nav = ''
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.from.n_nav = this.nav
        postRequest('/upndata', this.from)
          .then(res => {
            this.$message.success('更新成功')
            this.imageUrl = ''
            this.initTableData()
            this.initTableData1()
            this.nav = ''
          })
          .catch(err => this.$message.error('更新失败'))
      }
      this.dialogVisible = false
      this.from = {
        n_title: '',
        n_photo: '',
        n_nav: ''
      }
    },
    onDelete(row) {
      if (row.n_status == 1) {
        this.$confirm('此操作将下线该公告，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let data = {
              n_id: row.n_id,
              n_status: 0
            }
            postRequest('/upnstatus', data)
              .then(res => {
                this.$message({ type: 'success', message: '下线成功！' })
                this.initTableData()
                this.initTableData1()
              })
              .catch(err => console.log(err))
          })
          .catch(() => {})
      } else {
        this.$confirm('此操作将上线该公告，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let data = {
              n_id: row.n_id,
              n_status: 1
            }
            postRequest('/upnstatus', data)
              .then(res => {
                this.$message({ type: 'success', message: '上线成功！' })
                this.initTableData()
                this.initTableData1()
              })
              .catch(err => console.log(err))
          })
          .catch(() => {})
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = res.data.imageurl
      this.from.n_photo = res.data.imageurl
    },
    initTableData() {
      getRequest('/getnbyone')
        .then(res => (this.tableData = res.data.data))
        .catch(err => console.log(err))
    },
    initTableData1() {
      getRequest('/getnbyzero')
        .then(res => (this.tableData1 = res.data.data))
        .catch(err => console.log(err))
    }
  },

  data() {
    return {
      tableData: [],
      tableData1: [],
      imageUrl: '',
      dialogVisible: false,
      from: {
        n_title: '',
        n_photo: '',
        n_nav: ''
      },
      nav: '',
      pd: true
    }
  }
}
</script>

<style scoped>
.c-bottom /deep/ .el-image {
  width: 160px;
  height: 90px;
}
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
