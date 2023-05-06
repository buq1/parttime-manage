<template>
  <div class="s-nav">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="输入简历ID" @input="toSearch" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" @change="searchSchool" placeholder="就读院校" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" @change="searchSchool" placeholder="所学专业" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <div class="c-bottom">
      <div class="bar-title"></div>
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="cv_id" label="简历ID" min-width="100"> </el-table-column>
        <el-table-column prop="user_id" label="归属人ID" min-width="100"> </el-table-column>
        <el-table-column prop="cv_name" label="真实名称" min-width="80"> </el-table-column>
        <el-table-column prop="cv_sex" label="性别" min-width="60"></el-table-column>
        <el-table-column prop="cv_birthday" label="出生日期" min-width="120"></el-table-column>
        <el-table-column prop="cv_school" label="就读学校" min-width="200"></el-table-column>
        <el-table-column prop="cv_major" label="所学专业" min-width="200"></el-table-column>
        <el-table-column prop="cv_phone" label="联系电话" min-width="120"></el-table-column>
        <el-table-column prop="cv_introduce" label="自我介绍" min-width="300"></el-table-column>
        <el-table-column prop="cv_status" label="简历状态" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.cv_status | formatStatus }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRequest, postRequest } from '@/request/api'
export default {
  data() {
    return {
      listQuery: {
        title: '',
        importance: '',
        type: '',
        sort: ''
      },
      importanceOptions: '',
      calendarTypeOptions: '',
      tableData1: []
    }
  },
  created() {
    this.initTable()
    this.initcalendarTypeOptions()
    this.initimportanceOptions()
  },
  methods: {
    initTable() {
      getRequest('/getpersonalinfor')
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.tableData1 = res.data.data
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    initimportanceOptions() {
      getRequest('/getschool')
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.importanceOptions = res.data.data
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    initcalendarTypeOptions() {
      getRequest('/getmajor')
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.calendarTypeOptions = res.data.data
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
      if (val == '') {
        this.initTable()
        return
      }

      postRequest('/searchpersonalinfor', { texString: val })
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.tableData1 = res.data.data
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchSchool(val) {
      getRequest('/searchschool?school=' + this.listQuery.importance + '&major=' + this.listQuery.type)
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.tableData1 = res.data.data
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  filters: {
    formatStatus(val) {
      return ['待审批', '正常', '驳回'][val]
    }
  }
}
</script>

<style scoped></style>
