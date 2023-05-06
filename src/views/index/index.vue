<template>
  <div class="home">
    <div class="top">
      <div class="top-title">
        <span>简历数据</span>
      </div>
      <div class="top-list">
        <div class="top-item">
          <div class="left odd-bar">
            <i class="el-icon-tickets"></i>
            <!-- <img src="../../assets/img/1.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>今日新增简历数</span>
            </div>
            <div class="count">
              <span>{{ cvCount.todayNum }}</span>
            </div>
          </div>
        </div>
        <div class="top-item">
          <div class="left even-bar">
            <i class="el-icon-s-check"></i>
            <!-- <img src="../../assets/img/2.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>待审批简历数</span>
            </div>
            <div class="count">
              <span>{{ cvCount.pendingNum }}</span>
            </div>
          </div>
        </div>
        <div class="top-item">
          <div class="left odd-bar">
            <i class="el-icon-s-promotion"></i>
            <!-- <img src="../../assets/img/1.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>投递简历数</span>
            </div>
            <div class="count">
              <span>{{ cumulativeOrder }}</span>
            </div>
          </div>
        </div>
        <div class="top-item">
          <div class="left even-bar">
            <i class="el-icon-notebook-1"></i>
            <!-- <img src="../../assets/img/2.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>累计简历数</span>
            </div>
            <div class="count">
              <span>{{ cvCount.total }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="center">
      <div class="center-title">
        <span>招聘概况</span>
      </div>
      <div class="center-list">
        <div class="center-item">
          <div class="left odd-bar-other">
            <i class="el-icon-suitcase"></i>
            <!-- <img src="../../assets/img/3.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>今日新增岗位</span>
            </div>
            <div class="count">
              <span>{{ awaitpaid }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left odd-bar-other">
            <i class="el-icon-suitcase-1"></i>
            <!-- <img src="../../assets/img/4.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>待审批岗位</span>
            </div>
            <div class="count">
              <span>{{ awaitSendOut }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left odd-bar-other">
            <i class="el-icon-s-cooperation"></i>
            <!-- <img src="../../assets/img/4.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>累计岗位数</span>
            </div>
            <div class="count">
              <span>{{ alreadyReceiving }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left odd-bar-other">
            <i class="el-icon-user-solid"></i>
            <!-- <img src="../../assets/img/5.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>今日招聘人数</span>
            </div>
            <div class="count">
              <span>{{ awaitRefund }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="left odd-bar-other">
            <i class="el-icon-user-solid"></i>
            <!-- <img src="../../assets/img/5.png" alt="" /> -->
          </div>
          <div class="right">
            <div class="txt">
              <span>累计招聘人数</span>
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
          <span>近7天审批情况</span>
        </div>
        <div class="number-content">
          <!-- <div class="left">
            
          </div> -->
          <div id="ChartBox" ref="ChartBox"></div>
        </div>
      </div>
      <div class="number-item">
        <div class="number-title">
          <span>近7天招聘情况</span>
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
            <!-- <div class="show" v-if="userCount.subtract !== 0"> -->
            <!-- 较上周
              <i class="el-icon-caret-top" style="color: green" v-if="userCount.discrepancy == 1"></i>
              <i class="el-icon-caret-bottom" style="color: red" v-if="userCount.discrepancy == 2"></i> -->
            <!-- <img src="../../assets/img/6.png" v-if="userCount.discrepancy == 1" alt="" /> -->
            <!-- <img src="../../assets/img/7.png" v-if="userCount.discrepancy == 2" alt="" /> -->
            <!-- <span>{{ userCount.subtract }}</span> -->
            <!-- </div> -->
          </div>
        </div>
        <div class="bottom-item">
          <div class="txt">
            <span>待审批招聘方用户数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ userCount.pendingNum }}</span>
            </div>
            <!-- <div class="show" v-if="teacherCount.subtract !== 0"> -->
            <!-- 较昨日
              <i class="el-icon-caret-top" style="color: green" v-if="userCount.discrepancy == 1"></i>
              <i class="el-icon-caret-bottom" style="color: red" v-if="userCount.discrepancy == 2"></i> -->

            <!-- <img src="../../assets/img/6.png" v-if="teacherCount.discrepancy == 1" alt="" /> -->
            <!-- <img src="../../assets/img/7.png" v-if="teacherCount.discrepancy == 2" alt="" /> -->
            <!-- <span>{{ teacherCount.subtract }}</span> -->
            <!-- </div> -->
          </div>
        </div>
        <div class="bottom-item">
          <div class="txt">
            <span>累计招聘方用户数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ userCount.recruiterNum }}</span>
            </div>
            <!-- <div class="show" v-if="parentCount.subtract !== 0"> -->
            <!-- 较上周
              <i class="el-icon-caret-top" style="color: green" v-if="userCount.discrepancy == 1"></i>
              <i class="el-icon-caret-bottom" style="color: red" v-if="userCount.discrepancy == 2"></i> -->

            <!-- <img src="../../assets/img/6.png" v-if="parentCount.discrepancy == 1" alt="" /> -->
            <!-- <img src="../../assets/img/7.png" v-if="parentCount.discrepancy == 2" alt="" /> -->
            <!-- <span>{{ parentCount.subtract }}</span> -->
            <!-- </div> -->
          </div>
        </div>
        <div class="bottom-item">
          <div class="txt">
            <span>今日新增招聘方用户数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ userCount.todayNum }}</span>
            </div>
            <!-- <div class="show" v-if="newUserCount.subtract !== 0"> -->
            <!-- 较昨日
              <i class="el-icon-caret-top" style="color: green" v-if="userCount.discrepancy == 1"></i>
              <i class="el-icon-caret-bottom" style="color: red" v-if="userCount.discrepancy == 2"></i> -->

            <!-- <img src="../../assets/img/6.png" v-if="newUserCount.discrepancy == 1" alt="" /> -->
            <!-- <img src="../../assets/img/7.png" v-if="newUserCount.discrepancy == 2" alt="" /> -->
            <!-- <span>{{ newUserCount.subtract }}</span> -->
            <!-- </div> -->
          </div>
        </div>
      </div>

      <div style="margin-top: 10px" class="bottom-title">
        <span>入驻企业情况</span>
      </div>
      <div class="bottom-list">
        <div class="bottom-item">
          <div class="txt">
            <span>今日新增企业数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ companyCount.todayNum }}</span>
            </div>
            <!-- <div class="show" v-if="userCount.subtract !== 0"> -->
            <!-- 较昨日
              <i class="el-icon-caret-top" style="color: green" v-if="userCount.discrepancy == 1"></i>
              <i class="el-icon-caret-bottom" style="color: red" v-if="userCount.discrepancy == 2"></i> -->

            <!-- <img src="../../assets/img/6.png" v-if="userCount.discrepancy == 1" alt="" /> -->
            <!-- <img src="../../assets/img/7.png" v-if="userCount.discrepancy == 2" alt="" /> -->
            <!-- <span>{{ userCount.subtract }}</span> -->
            <!-- </div> -->
          </div>
        </div>
        <div class="bottom-item">
          <div class="txt">
            <span>累计企业数</span>
          </div>
          <div class="count">
            <div class="num">
              <span>{{ companyCount.total }}</span>
            </div>
            <!-- <div class="show" v-if="teacherCount.subtract !== 0"> -->
            <!-- 较上周 -->
            <!-- <img src="../../assets/img/6.png" v-if="teacherCount.discrepancy == 1" alt="" /> -->
            <!-- <img src="../../assets/img/7.png" v-if="teacherCount.discrepancy == 2" alt="" /> -->
            <!-- <span>{{ teacherCount.subtract }}</span> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest } from '@/request/api'
export default {
  data() {
    return {
      userCount: {},
      cvCount: {},
      companyCount: {},
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
  created() {
    this.getUserNum()
    this.getCVNum()
    this.getMeNum()
  },
  mounted() {},
  methods: {
    getUserNum() {
      getRequest('/usersinfor')
        .then(res => {
          this.userCount = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCVNum() {
      getRequest('/getCVNum')
        .then(res => {
          this.cvCount = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMeNum() {
      getRequest('/getMeNum')
        .then(res => {
          this.companyCount = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.odd-bar {
  font-size: 2rem;
  line-height: 3rem;
  text-align: center;
  background-color: rgb(237, 245, 241);
  border-radius: 5px;
  color: rgb(116, 190, 140);
  font-weight: bolder;
}
.even-bar {
  font-size: 3rem;
  color: rgb(67, 101, 220);
}
.odd-bar-other {
  font-size: 2rem;
  line-height: 3rem;
  text-align: center;
  background-color: rgb(237, 245, 241);
  border-radius: 50%;
  color: rgb(116, 190, 140);
  font-weight: bolder;
}
.home {
  background-color: rgb(241, 244, 245);
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
      justify-content: flex-start;
      margin-top: 0.8rem;
      .bottom-item {
        width: 24%;
        margin: 0px 0.5rem;
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
