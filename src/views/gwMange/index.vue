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
        <el-table-column prop="job_id" label="岗位ID" min-width="100"> </el-table-column>
        <el-table-column prop="ri_id" label="招聘人ID" min-width="100"> </el-table-column>
        <el-table-column prop="job_name" label="岗位名称" min-width="200"> </el-table-column>
        <el-table-column prop="job_xs" label="薪资" min-width="120"></el-table-column>
        <el-table-column prop="job_js" label="结算方式" min-width="80">
          <template v-slot="{ row }">
            <span>{{ row.job_js | formatJs }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="job_lb" label="岗位类别" min-width="120">
          <template v-slot="{ row }">
            <span>{{ row.job_lb | formatLb }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="job_infor" label="岗位介绍" min-width="300">
          <template v-slot="{ row }">
            <div v-html="row.job_infor"></div>
          </template>
        </el-table-column>
        <el-table-column prop="job_address" label="工作地址" min-width="200"></el-table-column>
        <el-table-column prop="job_time" label="日兼职时间区间" min-width="200"></el-table-column>
        <el-table-column prop="job_hy" label="兼职所属行业" min-width="120">
          <template v-slot="{ row }">
            <span>{{ row.job_hy | formatHy }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="job_date" label="发布时间" min-width="200"></el-table-column>
        <el-table-column props="job_status" label="岗位状态" min-width="100">
          <template v-slot="{ row }">
            <span>{{ row.job_status | formatStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="150">
          <template v-slot="scope">
            <el-button @click="onDelete(scope.row)" type="error" size="small">删除</el-button>
            <el-button v-if="scope.row.job_status == 0" @click="onUnline(scope.row)" type="primary" size="small">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRequest } from '@/request/api'

export default {
  data() {
    return {
      listQuery: {
        title: '',
        importance: '',
        type: '',
        sort: ''
      },
      tableData1: [],
      category: [
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
      ]
    }
  },
  created() {
    this.initTable()
  },
  methods: {
    initTable() {
      getRequest('/getJobAll')
        .then(res => {
          this.tableData1 = res.data.data
        })
        .catch(err => console.log(err))
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

<style scoped></style>
