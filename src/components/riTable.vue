<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="用户ID" prop="ri_id"> </el-table-column>
    <el-table-column label="公司ID" prop="ri_jgid"> </el-table-column>
    <el-table-column label="职位" prop="ri_position"> </el-table-column>
    <el-table-column label="联系方式" prop="ri_phone"> </el-table-column>
    <el-table-column label="身份证号码" prop="ri_sfz"> </el-table-column>
    <el-table-column label="公司管理员权限" prop="ri_admin"> </el-table-column>
    <el-table-column label="招聘人姓名" prop="ri_name"> </el-table-column>
    <el-table-column label="身份证照片" prop="ri_sfzzp"> </el-table-column>
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
      getRequest('/getPendingRi')
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => console.log(err))
      if (this.tableData != []) this.$emit('changeNum')
    },
    handlePass(row) {
      postRequest('/passRi', row)
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
      postRequest('/rejectRi', row)
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
        postRequest('/searchPendingRi', data)
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
