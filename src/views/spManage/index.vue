<template>
  <div class="s-nav">
    <div class="s-header">
      <div :class="currentTab==1?'h-tab':''" @click="switchTab(1)">简历审批
        <div class="bage">1</div>
      </div>
      <div :class="currentTab==2?'h-tab':''" @click="switchTab(2)">岗位审批
        <div class="bage">2</div>
      </div>
      <div :class="currentTab==3?'h-tab':''" @click="switchTab(3)">企业审批
        <div class="bage">3</div>
      </div>
      <div :class="currentTab==4?'h-tab':''" @click="switchTab(4)">招聘者审批
        <div class="bage">4</div>
      </div>
      <div :class="currentTab==5?'h-tab':''" @click="switchTab(5)">审批历史</div>
    </div>
    <div class="s-bar">
       <cvTable></cvTable>
    </div>
  </div>
</template>

<script>
import cvTable from '@/components/cvTable.vue'
export default {
  components:{
    cvTable
  },
  data(){
    return{
      currentTab:1
    }
  },
  
  methods:{
    switchTab(v){
this.currentTab = v
    }
  }
}
</script>

<style scoped>
.s-bar{
  width: 100%;
}
.h-tab{
 border-bottom: 2px solid #2e83d3;
  color: #aaa;
}
.s-nav{
  width: 100%;
  padding: 10px 15px;
box-sizing: border-box;
color: black;
}
.s-header{
  display: flex;
  width: 100%;border-bottom: 1px solid #aaa;
}
.s-header>div{
  padding: 5px 10px 10px 10px;
  position: relative;
  cursor: pointer;
}
.s-header>div:hover{
  border-bottom: 2px solid #2e83d3;
}
.bage{
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
