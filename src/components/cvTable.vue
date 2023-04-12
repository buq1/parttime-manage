<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="简历ID"
        prop="date">
      </el-table-column>
      <el-table-column
        label="创建人ID"
        prop="name">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="name">
      </el-table-column>
      <el-table-column
        label="联系电话"
        prop="name">
      </el-table-column>
      <el-table-column
        label="出生日期"
        prop="name">
      </el-table-column>
      <el-table-column
        label="就读院校"
        prop="name">
      </el-table-column>
      <el-table-column
        label="就读专业"
        prop="name">
      </el-table-column>
      <el-table-column
        label="个人介绍"
        prop="name">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
    export default {
      data() {
        return {
          tableData: [],
          search: ''
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      },
    }
  </script>