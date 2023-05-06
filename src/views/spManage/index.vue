<template>
  <div class="s-nav">
    <div class="s-header">
      <div :class="currentTab == 1 ? 'h-tab' : ''" @click="switchTab(1)">
        简历审批
        <div class="bage">{{ cvNum }}</div>
      </div>
      <div :class="currentTab == 2 ? 'h-tab' : ''" @click="switchTab(2)">
        岗位审批
        <div class="bage">{{ gwNum }}</div>
      </div>
      <div :class="currentTab == 3 ? 'h-tab' : ''" @click="switchTab(3)">
        企业审批
        <div class="bage">{{ meNum }}</div>
      </div>
      <div :class="currentTab == 4 ? 'h-tab' : ''" @click="switchTab(4)">
        招聘者审批
        <div class="bage">{{ riNum }}</div>
      </div>
      <div :class="currentTab == 5 ? 'h-tab' : ''" @click="switchTab(5)">审批历史</div>
    </div>
    <div class="s-bar">
      <el-input v-show="currentTab == 5" v-model="search" @input="toSearch" placeholder="输入搜索内容"></el-input>
      <cvTable @changeNum="getBageNum" v-show="currentTab == 1"></cvTable>
      <gwTable v-show="currentTab == 2"></gwTable>
      <meTable v-show="currentTab == 3"></meTable>
      <riTable v-show="currentTab == 4"></riTable>
      <spTable :searchText="sText" v-show="currentTab == 5"></spTable>
    </div>
  </div>
</template>

<script>
import cvTable from '@/components/cvTable.vue'
import gwTable from '@/components/gwTable.vue'
import meTable from '@/components/meTable.vue'
import riTable from '@/components/riTable.vue'
import spTable from '@/components/spTable.vue'
import { getRequest } from '@/request/api'
export default {
  components: {
    cvTable,
    gwTable,
    meTable,
    riTable,
    spTable
  },
  data() {
    return {
      currentTab: 1,
      cvNum: 0,
      gwNum: 0,
      meNum: 0,
      riNum: 0,
      sText: '',
      search: ''
    }
  },
  created() {
    this.getBageNum()
  },
  methods: {
    toSearch(val) {
      this.sText = val
    },
    switchTab(v) {
      this.currentTab = v
    },
    getBageNum() {
      getRequest('/getPendingCVNum')
        .then(res => {
          this.cvNum = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      getRequest('/getpendingJobNum')
        .then(res => {
          this.gwNum = res.data.data
        })
        .catch(err => console.log(err))

      getRequest('/getPendingMeNum')
        .then(res => {
          this.meNum = res.data.data
        })
        .catch(err => console.log(err))

      getRequest('/getPendingRiNum')
        .then(res => {
          this.riNum = res.data.data
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.s-bar {
  width: 100%;
}
.h-tab {
  border-bottom: 2px solid #2e83d3;
  color: #aaa;
}
.s-nav {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  color: black;
}
.s-header {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #aaa;
}
.s-header > div {
  padding: 5px 10px 10px 10px;
  position: relative;
  cursor: pointer;
}
.s-header > div:hover {
  border-bottom: 2px solid #2e83d3;
}
.bage {
  background-color: red;
  color: white;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
