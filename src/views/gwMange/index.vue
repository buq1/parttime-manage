<template>
  <div class="s-nav">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="输入岗位名称或者ID" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="行业" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.importance" placeholder="类别" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter"> 查询</el-button>
    </div>
    <div class="c-bottom">
      <div class="bar-title"></div>
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="job_id" label="岗位ID" min-width="80"> </el-table-column>
        <el-table-column prop="ri_id" label="招聘人ID" min-width="100"> </el-table-column>
        <el-table-column prop="job_name" label="岗位名称" min-width="300"> </el-table-column>
        <el-table-column prop="job_xs" label="薪资" min-width="120"></el-table-column>
        <el-table-column prop="job_lb" label="岗位类别" min-width="120"></el-table-column>
        <el-table-column prop="job_infor" label="岗位介绍" min-width="200"></el-table-column>
        <el-table-column prop="job_address" label="工作地址" min-width="120"></el-table-column>
        <el-table-column prop="job_time" label="日兼职时间区间" min-width="120"></el-table-column>
        <el-table-column prop="job_hy" label="兼职所属行业" min-width="120"></el-table-column>
        <el-table-column prop="job_date" label="发布时间" min-width="120"></el-table-column>
        <el-table-column props="job_status" label="岗位状态" min-width="60"></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template v-slot="scope">
            <el-button @click="onDelete(scope.row)" type="primary" size="small">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      listQuery:{
        title:'',
        importance:'',
        type:'',
        sort:'',

      }
    }
  }
}
</script>

<style scoped></style>
