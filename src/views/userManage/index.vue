<template>
  <div class="goods">
    <div class="header">
      <el-input v-model="keyword" @change="toSearch" placeholder="请输入内容"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>

    <div class="wrapper">
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" max-height="1000"
        @selection-change="handleSelectionChange">
        <el-table-column fixedID prop="user_id" label="用户ID" min-width="60">
        </el-table-column>
        <el-table-column prop="user_role" label="用户类型" min-width="100">
        </el-table-column>
        <el-table-column prop="user_name" label="账户名" min-width="100">
        </el-table-column>
        <el-table-column prop="user_avator" label="用户头像" min-width="200">
        </el-table-column>
        <el-table-column prop="user_status" label="用户状态" min-width="100">
        </el-table-column>
        <el-table-column prop="user_star" label="用户评级" min-width="100">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <GoodsDialog ref="dialog" title="商品添加" />
  </div>
</template>

<script>

import GoodsDialog from './GoodsDialog.vue'

export default {
  components: {
    GoodsDialog
  },
  data() {
    return {
      keyword: "",
      tableData: [],
      multipleSelection: [],
      total: 10,
      pageSize: 1,
      currentPage: 1,
      showDialogVal: false,
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList(pageNum = 1, psize = 30) {
      try {
        this.currentPage = pageNum;
        this.pageSize = psize;
        const res = await getGoodsList(pageNum, psize);
        this.tableData = res.customers;
        try {
          this.total = res.total.total;
        } catch (error) { }
      } catch (error) {
        console.log(error)
      }
    },
    dataformat(row, column, cellValue) {
      return new Date(cellValue).toLocaleDateString();
    },

    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async toSearch(val) {
      console.log(val);
      try {
        const res = await toSearchList({ search: val });
        console.log(res.search.length);
        this.tableData = res.search;
        this.total = res.search.length;
        this.pageSize = res.search.length;
      } catch (error) {
        console.log(error)
      }
    },
    toAddGoods() {
      this.$router.push('/add-goods');
    },
    showDialog() {
      this.$refs.dialog.a = true;
    }
  },

}
</script>

<style lang="scss" scoped>
.goods {
  padding: 20px;

  .header {
    display: flex;

    button {
      margin-left: 20px;
    }
  }

  .wrapper {
    padding: 20px 0;
  }
}
</style>