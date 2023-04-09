<template>
  <div class="home">
    <div class="top">
      <div class="top-title">
        <span>销售数据</span>
      </div>
      <div class="top-list">
        <div class="top-item">
          <div class="left">
            <img src="../../assets/img/1.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>今日订单数</span>
            </div>
            <div class="count">
              <span>{{ todayOrderNumber }}</span>
            </div>
          </div>
        </div>
        <div class="top-item">
          <div class="left">
            <img src="../../assets/img/2.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>今日销售额</span>
            </div>
            <div class="count">
              <span>{{ todaySaleroom }}</span>
            </div>
          </div>
        </div>
        <div class="top-item">
          <div class="left">
            <img src="../../assets/img/1.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>累计订单数</span>
            </div>
            <div class="count">
              <span>{{ cumulativeOrder }}</span>
            </div>
          </div>
        </div>
        <div class="top-item">
          <div class="left">
            <img src="../../assets/img/2.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>累计销售额</span>
            </div>
            <div class="count">
              <span>{{ cumulativeSaleroom }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="center">
      <div class="center-title">
        <span>累计订单概况</span>
      </div>
      <div class="center-list">
        <div class="center-item">
          <div class="left">
            <img src="../../assets/img/3.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>待支付订单</span>
            </div>
            <div class="count">
              <span>{{ awaitpaid }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left">
            <img src="../../assets/img/4.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>待发货订单</span>
            </div>
            <div class="count">
              <span>{{ awaitSendOut }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left">
            <img src="../../assets/img/4.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>已收货订单</span>
            </div>
            <div class="count">
              <span>{{ alreadyReceiving }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left">
            <img src="../../assets/img/5.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>待退款订单</span>
            </div>
            <div class="count">
              <span>{{ awaitRefund }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left">
            <img src="../../assets/img/5.png" alt="" />
          </div>
          <div class="right">
            <div class="txt">
              <span>已退款订单</span>
            </div>
            <div class="count">
              <span>{{ alreadyRefund }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="number">
      <div class="number-item">
        <div class="number-title">
          <span>近7天订单数</span>
        </div>
        <div class="number-content">
          <!-- <div class="left">
            
          </div> -->
          <div id="ChartBox" ref="ChartBox"></div>
        </div>
      </div>
      <div class="number-item">
        <div class="number-title">
          <span>近7天销售额</span>
        </div>
        <div class="number-content">
          <div id="ChartBox" ref="ChartBox1"></div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom-title">
        <span>用户情况</span>
      </div>
      <div class="bottom-list">
        <div class="bottom-item">
          <div class="txt">
            <span>累计用户数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ userCount.total }}</span>
            </div>
            <div class="show" v-if="userCount.subtract !== 0">
              较上周
              <img src="../../assets/img/6.png" v-if="userCount.discrepancy == 1" alt="" />
              <img src="../../assets/img/7.png" v-if="userCount.discrepancy == 2" alt="" />
              <span>{{ userCount.subtract }}</span>
            </div>
          </div>
        </div>
        <div class="bottom-item">
          <div class="txt">
            <span>累计教师用户数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ teacherCount.total }}</span>
            </div>
            <div class="show" v-if="teacherCount.subtract !== 0">
              较上周
              <img src="../../assets/img/6.png" v-if="teacherCount.discrepancy == 1" alt="" />
              <img src="../../assets/img/7.png" v-if="teacherCount.discrepancy == 2" alt="" />
              <span>{{ teacherCount.subtract }}</span>
            </div>
          </div>
        </div>
        <div class="bottom-item">
          <div class="txt">
            <span>累计家长用户数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ parentCount.total }}</span>
            </div>
            <div class="show" v-if="parentCount.subtract !== 0">
              较上周
              <img src="../../assets/img/6.png" v-if="parentCount.discrepancy == 1" alt="" />
              <img src="../../assets/img/7.png" v-if="parentCount.discrepancy == 2" alt="" />
              <span>{{ parentCount.subtract }}</span>
            </div>
          </div>
        </div>
        <div class="bottom-item">
          <div class="txt">
            <span>今日新增用户数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ newUserCount.total }}</span>
            </div>
            <div class="show" v-if="newUserCount.subtract !== 0">
              较昨日
              <img src="../../assets/img/6.png" v-if="newUserCount.discrepancy == 1" alt="" />
              <img src="../../assets/img/7.png" v-if="newUserCount.discrepancy == 2" alt="" />
              <span>{{ newUserCount.subtract }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
// import { EleResize } from "../../../public/js/esresize";
export default {
  data() {
    return {
      todaySaleroom: 0,
      todayOrderNumber: 0,
      cumulativeSaleroom: 0,
      cumulativeOrder: 0,
      alreadyReceiving: 0,
      alreadyRefund: 0,
      awaitRefund: 0,
      awaitSendOut: 0,
      awaitpaid: 0,
      userCount: {
        discrepancy: 0,
        subtract: 0,
        total: 0
      },
      teacherCount: {
        discrepancy: 0,
        subtract: 0,
        total: 0
      },
      parentCount: {
        discrepancy: 0,
        subtract: 0,
        total: 0
      },
      newUserCount: {
        discrepancy: 0,
        subtract: 0,
        total: 0
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.getSellData()
      this.getOrderData()
      this.getUser()
      this.getTeacher()
      this.getParent()
      this.getTodayUser()

      this.sevenOrderData()
      this.sevenSellData()
    })
  },
  methods: {
    //获取七天订单数
    sevenOrderData() {
      this.$http.get('sys/home/getThreeRow1').then(res => {
        let dataArr = []
        dataArr = res.data.data.map(item => {
          return item.activeDate
        })
        let orderNum = []
        orderNum = res.data.data.map(item => {
          return item.num
        })
        this.getChart(dataArr, orderNum)
        window.onresize = () => {
          this.getChart(dataArr, orderNum)
        }
      })
    },
    //获取七天销售记录
    sevenSellData() {
      this.$http.get('sys/home/getThreeRow2').then(res => {
        let dataArr = []
        dataArr = res.data.data.map(item => {
          return item.activeDate
        })
        let orderNum = []
        orderNum = res.data.data.map(item => {
          return item.num
        })
        this.getChart1(dataArr, orderNum)
        window.onresize = () => {
          this.getChart1(dataArr, orderNum)
        }
      })
    },
    //获取销售数据
    getSellData() {
      this.$http.get('sys/home/getFirstRow').then(res => {
        this.cumulativeOrder = res.data.data.cumulativeOrder
        this.cumulativeSaleroom = res.data.data.cumulativeSaleroom
        this.todayOrderNumber = res.data.data.todayOrderNumber
        this.todaySaleroom = res.data.data.todaySaleroom
      })
    },
    //获取订单数据
    getOrderData() {
      this.$http.get('sys/home/getTwoRow').then(res => {
        this.alreadyReceiving = res.data.data.alreadyReceiving
        this.alreadyRefund = res.data.data.alreadyRefund
        this.awaitRefund = res.data.data.awaitRefund
        this.awaitSendOut = res.data.data.awaitSendOut
        this.awaitpaid = res.data.data.awaitpaid
      })
    },
    //获取累计用户
    getUser() {
      this.$http.get('sys/home/getEndRow1').then(res => {
        this.userCount = res.data.data
      })
    },
    //获取教师用户
    getTeacher() {
      this.$http.get('sys/home/getEndRow2').then(res => {
        this.teacherCount = res.data.data
      })
    },
    //获取家长
    getParent() {
      this.$http.get('sys/home/getEndRow3').then(res => {
        this.parentCount = res.data.data
      })
    },
    //获取今日新增用户
    getTodayUser() {
      this.$http.get('sys/home/getEndRow4').then(res => {
        this.newUserCount = res.data.data
      })
    },
    getChart(key, value) {
      var myChart = echarts.init(this.$refs.ChartBox)
      var option
      option = {
        // 鼠标移入的气泡提示框 item或axis
        tooltip: {
          trigger: 'item'
        },
        grid: {
          left: '1%',
          right: '3%',
          bottom: '1%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: key
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            //smooth是否为曲线
            smooth: true,
            type: 'line',
            // symbol: "none",
            areaStyle: {
              normal: {
                //LinearGradient线性渐变，可以设置挡位颜色达到渐变的效果
                color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#99e6ac' },
                  { offset: 0.5, color: '#d2f1de' },
                  { offset: 1, color: '#f5faf7' }
                ])
              }
            },
            data: value,
            color: '#068132'
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => myChart.resize())
    },
    getChart1(key, value) {
      var myChart = echarts.init(this.$refs.ChartBox1)
      var option
      option = {
        // 鼠标移入的气泡提示框 item或axis
        tooltip: {
          trigger: 'item'
        },
        grid: {
          left: '1%',
          right: '3%',
          bottom: '1%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: key
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            //smooth是否为曲线
            smooth: true,
            type: 'line',
            // symbol: "none",
            areaStyle: {
              normal: {
                //LinearGradient线性渐变，可以设置挡位颜色达到渐变的效果
                color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#D7EBFE' },
                  { offset: 0.5, color: '#E7F2FD' },
                  { offset: 1, color: '#F7FAFE' }
                ])
              }
            },
            data: value
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => myChart.resize())
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .top {
    .top-title {
      font-size: 1rem;
      font-weight: 700;
      color: rgba(76, 92, 130, 1);
    }
    .top-list {
      display: flex;
      justify-content: space-between;
      margin-top: 0.8rem;
      .top-item {
        width: 24%;
        background-color: #fff;
        border-radius: 0.7rem;
        display: flex;
        align-items: center;
        padding: 1rem;
        box-sizing: border-box;
        .left {
          width: 3rem;
          height: 3rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          margin-left: 1rem;
          .txt {
            font-size: 0.1rem;
            font-weight: 500;
            color: rgba(148, 174, 217, 1);
          }
          .count {
            font-size: 1.4rem;
            font-weight: 700;
            color: rgba(76, 92, 130, 1);
          }
        }
      }
    }
  }

  .center {
    margin-top: 0.8rem;
    .center-title {
      font-size: 1rem;
      font-weight: 700;
      color: rgba(76, 92, 130, 1);
    }
    .center-list {
      display: flex;
      justify-content: space-between;
      margin-top: 0.8rem;
      .center-item {
        width: 19%;
        background-color: #fff;
        border-radius: 0.7rem;
        display: flex;
        align-items: center;
        padding: 1rem;
        box-sizing: border-box;
        .left {
          width: 3rem;
          height: 3rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          margin-left: 1rem;
          .txt {
            font-size: 0.1rem;
            font-weight: 500;
            color: rgba(148, 174, 217, 1);
          }
          .count {
            font-size: 1.4rem;
            font-weight: 700;
            color: rgba(76, 92, 130, 1);
          }
        }
      }
    }
  }

  .number {
    margin-top: 0.8rem;
    display: flex;
    justify-content: space-between;
    .number-item {
      width: 49%;
      .number-title {
        font-size: 1rem;
        font-weight: 700;
        color: rgba(76, 92, 130, 1);
      }
      .number-content {
        display: flex;
        justify-content: space-between;
        margin-top: 0.8rem;
        background-color: #fff;
        border-radius: 0.7rem;
        display: flex;
        align-items: center;
        padding: 1rem;
        box-sizing: border-box;
        height: 15rem;
        #ChartBox {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .bottom {
    margin-top: 0.8rem;
    .bottom-title {
      font-size: 1rem;
      font-weight: 700;
      color: rgba(76, 92, 130, 1);
    }
    .bottom-list {
      display: flex;
      justify-content: space-between;
      margin-top: 0.8rem;
      .bottom-item {
        width: 24%;
        background-color: #fff;
        border-radius: 0.7rem;
        padding: 1rem;
        box-sizing: border-box;

        .txt {
          font-size: 0.1rem;
          font-weight: 500;
          color: rgba(148, 174, 217, 1);
        }
        .count {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .num {
            font-size: 1.4rem;
            font-weight: 700;
            color: rgba(76, 92, 130, 1);
            // flex: 2;
          }
          .show {
            font-size: 0.8rem;
            font-weight: 500;
            color: #333;
            // flex: 1;
            img {
              width: 0.5rem;
              height: 0.5rem;
              margin-left: 0.1rem;
            }
            span {
              margin-left: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
