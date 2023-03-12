<template>
    <div class="home">
<div id="myChart" style="width: 100%;height:600px"></div>
    </div>
</template>

<script>
 
 export default {
    data(){
        return{
            option : {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
        }
    },
    mounted(){
        this.rawLine()
    },
    methods:{
        rawLine(){
      let myChart = this.$echarts.init(document.getElementById("myChart"))
      myChart.setOption(this.option)
        }
    }
 }
</script>

<style scoped>

</style>