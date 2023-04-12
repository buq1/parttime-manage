<template>
  <div class="s-nav">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter"> Search </el-button>
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
