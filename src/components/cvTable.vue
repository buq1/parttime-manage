<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="简历ID" prop="cv_id"> </el-table-column>
    <el-table-column label="创建人ID" prop="user_id"> </el-table-column>
    <el-table-column label="姓名" prop="cv_name"> </el-table-column>
    <el-table-column label="性别" prop="cv_sex"> </el-table-column>
    <el-table-column label="联系电话" prop="cv_phone"> </el-table-column>
    <el-table-column label="出生日期" prop="cv_birthday"> </el-table-column>
    <el-table-column label="就读院校" prop="cv_school"> </el-table-column>
    <el-table-column label="就读专业" prop="cv_major"> </el-table-column>
    <el-table-column label="个人介绍" prop="cv_introduce"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" @input="toSearch" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handlePass(scope.row)">通过</el-button>
        <el-button size="mini" type="danger" @click="handleReject(scope.row)">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getRequest, postRequest } from '@/request/api'

export default {
  data() {
    return {
      tableData: [],
      search: ''
    }
  },
  created() {
    this.initTable()
  },
  methods: {
    initTable() {
      getRequest('/getCvHistory')
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => console.log(err))
      if (this.tableData != []) this.$emit('changeNum')
    },
    handlePass(row) {
      postRequest('/passCV', row)
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.$message.success('通过成功')
              this.initTable()
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(err => console.log(err))
    },
    handleReject(row) {
      postRequest('/rejectCV', row)
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.$message.success('驳回成功')
              this.initTable()
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    toSearch(val) {
      if (val == '') this.initTable()
      else {
        let data = { texString: val }
        postRequest('/searchpersonal', data)
          .then(res => {
            this.tableData = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
