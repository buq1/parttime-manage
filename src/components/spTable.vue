<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="审批单ID" prop="sp_id"> </el-table-column>
    <el-table-column label="审批类型" prop="sp_type"> </el-table-column>
    <el-table-column label="审批提交人ID" prop="sp_user"> </el-table-column>
    <el-table-column label="审批内容ID" prop="sp_apid"> </el-table-column>
    <el-table-column label="审批提交时间" prop="sp_adtime"> </el-table-column>
    <el-table-column label="审批结束时间" prop="sp_endtime"> </el-table-column>
    <el-table-column label="审批结论" prop="sp_result"> </el-table-column>
  </el-table>
</template>

<script>
import { getRequest, postRequest } from '@/request/api'
export default {
  props: {
    searchText: ''
  },
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
      getRequest('/getSphistoryAll')
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => console.log(err))
    },
    toSearch(val) {
      if (val == '') this.initTable()
      else {
        let data = { texString: val }
        postRequest('/searchSP', data)
          .then(res => {
            this.tableData = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  watch: {
    searchText(newValue, oldValue) {
      if (newValue == '') {
        this.initTable()
        return
      }
      this.toSearch(newValue)
    }
  }
}
</script>
