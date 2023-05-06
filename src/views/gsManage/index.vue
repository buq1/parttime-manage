<template>
  <div class="goods">
    <div class="header">
      <el-input v-model="keyword" @input="initTable" placeholder="请输入公司ID或公司名称"></el-input>
      <el-button @click="toSearch()" type="primary">搜索</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>

    <div class="wrapper">
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" max-height="1000" @selection-change="handleSelectionChange">
        <el-table-column fixedID prop="m_id" label="公司ID" min-width="80"> </el-table-column>
        <el-table-column prop="m_name" label="公司名称" min-width="100"> </el-table-column>
        <el-table-column prop="m_logo" label="公司LOGO" min-width="100">
          <template v-slot="{ row }">
            <el-avatar size="large" shape="circle" :src="row.m_logo"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="m_infor" label="公司简介" min-width="200"> </el-table-column>
        <el-table-column prop="m_shxydm" label="社会统一信用代码" min-width="200"> </el-table-column>
        <el-table-column prop="m_yyzz" label="营业执照" min-width="200">
          <template v-slot="{ row }">
            <el-image :src="row.m_yyzz" lazy></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="m_creater" label="公司管理员ID" min-width="80"> </el-table-column>
        <el-table-column prop="m_photo" label="公司工作环境" min-width="200">
          <template v-slot="{ row }">
            <div style="display: flex; overflow-x: auto; flex-direction: row">
              <el-image :src="row.m_photo[0]"></el-image>
              <!-- <el-image v-for="(item, index) in row.m_photo" :key="index" :src="item" lazy></el-image> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="m_star" label="公司评分" min-width="200">
          <template v-slot="{ row }">
            <el-rate :value="Number(row.m_star)" disabled show-score text-color="#ff9900"></el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="m_status" label="公司状态" min-width="100">
          <template v-slot="{ row }">
            <span>{{ row.m_status | formatStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.m_status == 0" @click="handleDelete(scope.row)" size="mini" type="danger">封禁</el-button>
            <el-button v-if="scope.row.m_status == 3" @click="handleUnban(scope.row)" size="mini" type="primary">解禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <GoodsDialog ref="dialog" @successsubmit="getGoodsList()" title="公司添加" />
  </div>
</template>

<script>
import { getRequest, postRequest } from '@/request/api'
import GoodsDialog from './GoodsDialog.vue'

export default {
  components: {
    GoodsDialog
  },
  data() {
    return {
      keyword: '',
      tableData: [],
      multipleSelection: [],
      total: 10,
      pageSize: 1,
      currentPage: 1,
      showDialogVal: false
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      try {
        const res = await getRequest('/getAllMechanism')
        this.tableData = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    initTable(val) {
      if (val == '') {
        this.getGoodsList()
      }
    },
    handleDelete(row) {
      postRequest('/banmechanism', row)
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
      postRequest('/unbanmechanism', row)
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
    async toSearch(val) {
      try {
        const res = await postRequest('/searchMe', { texString: this.keyword })
        this.tableData = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    showDialog() {
      this.$refs.dialog.a = true
    }
  },
  filters: {
    formatStatus(val) {
      return ['正常', '待管理员审批', '驳回', '封禁'][val]
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
