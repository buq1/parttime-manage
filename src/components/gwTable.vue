<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="岗位ID" prop="job_id"> </el-table-column>
    <el-table-column label="招聘方ID" prop="ri_id"> </el-table-column>
    <el-table-column label="岗位名" prop="job_name"> </el-table-column>
    <el-table-column label="薪水" prop="job_xs"> </el-table-column>
    <el-table-column label="类别" prop="job_lb">
      <template v-slot="{ row }">
        <span>{{ row.job_lb | formatLb }}</span>
      </template>
    </el-table-column>
    <el-table-column label="岗位介绍" prop="job_infor">
      <template v-slot="{ row }">
        <div v-html="row.job_infor"></div>
      </template>
    </el-table-column>
    <el-table-column label="工作地址" prop="job_address"> </el-table-column>
    <el-table-column label="结算方式" prop="job_js">
      <template v-slot="{ row }">
        <span>{{ row.job_js | formatJs }}</span>
      </template>
    </el-table-column>
    <el-table-column label="工作时间" prop="job_time"> </el-table-column>
    <el-table-column label="岗位行业" prop="job_hy">
      <template v-slot="{ row }">
        <span>{{ row.job_hy | formatHy }}</span>
      </template>
    </el-table-column>
    <el-table-column label="发布时间" prop="job_date"> </el-table-column>
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
      getRequest('/getPendingJob')
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => console.log(err))
      if (this.tableData != []) this.$emit('changeNum')
    },
    handlePass(row) {
      postRequest('/passJob', row)
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
      postRequest('/rejectJob', row)
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
        postRequest('/searchPendingJob', data)
          .then(res => {
            this.tableData = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  filters: {
    formatStatus(val) {
      return ['正在招聘', '待审批', '驳回', '下线'][val]
    },
    formatLb(val) {
      return ['短期', '长期', '假期', '网络'][val]
    },
    formatJs(val) {
      return ['日结', '月结', '即结', '其它'][val]
    },
    formatHy(val) {
      return [
        {
          cid: 'jzzl001',
          cname: '装卸搬运'
        },
        {
          cid: 'jzzl002',
          cname: '礼仪'
        },
        {
          cid: 'jzzl003',
          cname: '模特'
        },
        {
          cid: 'jzzl004',
          cname: '快递配送'
        },
        {
          cid: 'jzzl005',
          cname: '仓库管理'
        },
        {
          cid: 'jzzl006',
          cname: '助教'
        },
        {
          cid: 'jzzl007',
          cname: '机构教师'
        },
        {
          cid: 'jzzl008',
          cname: '才艺教师'
        },
        {
          cid: 'jzzl009',
          cname: '课程顾问'
        },
        {
          cid: 'jzzl010',
          cname: '运营'
        },
        {
          cid: 'jzzl011',
          cname: '资料录入'
        },
        {
          cid: 'jzzl012',
          cname: '司机'
        },
        {
          cid: 'jzzl013',
          cname: '录音配音'
        },
        {
          cid: 'jzzl014',
          cname: '演员'
        },
        {
          cid: 'jzzl015',
          cname: '店员'
        },
        {
          cid: 'jzzl016',
          cname: '厨师'
        },
        {
          cid: 'jzzl017',
          cname: '美容美甲'
        },
        {
          cid: 'jzzl018',
          cname: '网店'
        },
        {
          cid: 'jzzl019',
          cname: '短视频'
        },
        {
          cid: 'jzzl020',
          cname: '电商'
        },
        { cid: 'jzzl021', cname: '地推' },
        {
          cid: 'jzzl022',
          cname: '广告监测'
        },
        {
          cid: 'jzzl023',
          cname: '家政'
        },
        {
          cid: 'jzzl024',
          cname: '代理'
        },
        {
          cid: 'jzzl025',
          cname: '主播'
        },
        {
          cid: 'jzzl026',
          cname: '摄影剪辑'
        },
        {
          cid: 'jzzl027',
          cname: '客服'
        },
        {
          cid: 'jzzl028',
          cname: '线上教师'
        },
        {
          cid: 'jzzl029',
          cname: '信息标注'
        },
        {
          cid: 'jzzl030',
          cname: '会展活动'
        },
        {
          cid: 'jzzl031',
          cname: '手机任务'
        },
        {
          cid: 'jzzl032',
          cname: '快递分拣'
        },
        {
          cid: 'jzzl033',
          cname: '文案编辑'
        },
        {
          cid: 'jzzl034',
          cname: '送餐员'
        },
        {
          cid: 'jzzl035',
          cname: '调研'
        },
        {
          cid: 'jzzl036',
          cname: '实习'
        },
        {
          cid: 'jzzl037',
          cname: '服务员'
        },
        {
          cid: 'jzzl038',
          cname: '厂工'
        },
        {
          cid: 'jzzl039',
          cname: '设计'
        },
        {
          cid: 'jzzl040',
          cname: '文员'
        },
        {
          cid: 'jzzl041',
          cname: '派单'
        },
        {
          cid: 'jzzl042',
          cname: '家教'
        },
        {
          cid: 'jzzl043',
          cname: '演出'
        },
        {
          cid: 'jzzl044',
          cname: '翻译'
        },
        {
          cid: 'jzzl045',
          cname: '促销'
        },
        {
          cid: 'jzzl046',
          cname: '安保'
        },
        {
          cid: 'jzzl047',
          cname: '销售导购'
        },
        {
          cid: 'jzzl048',
          cname: '其他'
        }
      ].find(item => {
        console.log(item.cid == val)
        if (item.cid == val) return item
        return
      }).cname
    }
  }
}
</script>
