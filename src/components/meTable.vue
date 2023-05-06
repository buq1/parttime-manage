<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="公司ID" prop="m_id"> </el-table-column>
    <el-table-column label="公司介绍" prop="m_infor"> </el-table-column>
    <el-table-column label="公司名称" prop="m_name"> </el-table-column>
    <el-table-column label="公司logo" prop="m_logo">
      <template v-slot="{ row }">
        <el-image :src="row.m_logo" lazy></el-image>
      </template>
    </el-table-column>
    <el-table-column label="公司环境" prop="m_photo"> </el-table-column>
    <el-table-column label="营业执照" prop="m_yyzz">
      <template v-slot="{ row }">
        <el-image :src="row.m_yyzz" lazy></el-image>
      </template>
    </el-table-column>
    <el-table-column label="社会信用代码" prop="m_shxydm"> </el-table-column>
    <el-table-column label="公司管理人" prop="m_creater"> </el-table-column>
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
      getRequest('/getPendingMe')
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => console.log(err))
      if (this.tableData != []) this.$emit('changeNum')
    },
    handlePass(row) {
      postRequest('/passMe', row)
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
      postRequest('/rejectMe', row)
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
        postRequest('/searchPendingMe', data)
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
