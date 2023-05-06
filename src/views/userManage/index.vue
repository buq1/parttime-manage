<template>
  <div class="goods">
    <div class="header">
      <el-input v-model="keyword" @input="initTable" placeholder="请输入用户名或用户ID"></el-input>
      <el-button type="primary" @click="toSearch">搜索</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>

    <div class="wrapper">
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" max-height="1000" @selection-change="handleSelectionChange">
        <el-table-column fixedID prop="user_id" label="用户ID" min-width="60"> </el-table-column>
        <el-table-column prop="user_role" label="用户类型" min-width="100">
          <template v-slot="{ row }">
            <span>{{ row.user_role | formatRole }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="账户名" min-width="100"> </el-table-column>
        <el-table-column prop="user_avator" label="用户头像" min-width="200">
          <template v-slot="{ row }">
            <el-avatar size="large" shape="circle" :src="row.user_avator"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="user_status" label="用户状态" min-width="100">
          <template v-slot="{ row }">
            <span>{{ row.user_status | formatStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_star" label="用户评级" min-width="100">
          <template v-slot="{ row }">
            <el-rate :value="Number(row.user_star)" disabled show-score text-color="#ff9900"></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.user_status == 0" @click="handleBan(scope.row)" size="mini" type="danger">封禁</el-button>
            <el-button v-else size="mini" @click="handleUnban(scope.row)" type="primary">解禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <GoodsDialog ref="dialog" @successSubmit="getGoodsList()" title="用户添加" />
  </div>
</template>

<script>
import GoodsDialog from './GoodsDialog.vue'
import { getRequest, postRequest } from '@/request/api'
export default {
  components: {
    GoodsDialog
  },
  data() {
    return {
      keyword: '',
      tableData: [],
      multipleSelection: [],
      showDialogVal: false
    }
  },
  created() {
    this.getGoodsList()
  },
  filters: {
    formatRole(value) {
      return ['普通用户', '招聘用户'][value]
    },
    formatStatus(value) {
      return ['正常', '封禁中'][value]
    }
  },
  methods: {
    getGoodsList() {
      getRequest('/getusers')
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    initTable(val) {
      if (val == '') this.getGoodsList()
    },
    handleBan(row) {
      postRequest('/banuser', row)
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.$message.success('封禁成功')
              this.getGoodsList()
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleUnban(row) {
      postRequest('/unbanuser', row)
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data.code == 400) {
              this.$message.error(res.data.message)
              return
            } else {
              this.$message.success('解禁成功')
              this.getGoodsList()
            }
          } else {
            this.$message.error('网络或服务器错误！')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async toSearch() {
      try {
        const res = await getRequest(`/searchusers?searchtext=${this.keyword}`)
        this.tableData = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    toAddGoods() {
      this.$router.push('/add-goods')
    },
    showDialog() {
      this.$refs.dialog.a = true
    }
  }
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
