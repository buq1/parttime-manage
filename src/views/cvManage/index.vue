<template>
  <div class="s-nav">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="输入简历ID" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="就读院校" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="所学专业" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'" :value="item.key" />
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter"> 查询 </el-button>
    </div>
    <div class="c-bottom">
      <div class="bar-title"></div>
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="cv_id" label="简历ID" min-width="80"> </el-table-column>
        <el-table-column prop="user_id" label="归属人ID" min-width="100"> </el-table-column>
        <el-table-column prop="cv_name" label="真实名称" min-width="300"> </el-table-column>
        <el-table-column prop="cv_sex" label="性别" min-width="120"></el-table-column>
        <el-table-column prop="cv_birthday" label="出生日期" min-width="120"></el-table-column>
        <el-table-column prop="cv_school" label="就读学校" min-width="200"></el-table-column>
        <el-table-column prop="cv_major" label="所学专业" min-width="120"></el-table-column>
        <el-table-column prop="cv_phone" label="联系电话" min-width="120"></el-table-column>
        <el-table-column prop="cv_introduce" label="自我介绍" min-width="120"></el-table-column>
        <el-table-column prop="cv_status" label="简历状态" min-width="120"></el-table-column>
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
