<template>
  <div class="home">
    <el-row :gutter="20">
      <!-- 左侧 -->
      <el-col :span="8">
        <!-- 左侧登录信息 -->
        <el-card class="box-card">
          <div class="user">
            <img src="~assets/img/common/user.png" />
            <div class="user-info">
              <p class="name">Admin</p>
              <p class="role">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span>2022-08-12</span></p>
            <p>上次登录地点:<span>武汉</span></p>
          </div>
        </el-card>
        <!-- 左侧表格信息 -->
        <el-card style="margin-top: 20px">
          <el-table :data="products" style="width: 100%">
            <el-table-column
              v-for="(v, k) in productsKey"
              :key="k"
              :prop="k"
              :label="v"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16">
        <!-- 右侧订单 -->
        <div class="order">
          <el-card
            v-for="item in orderState"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="'el-icon-' + item.icon"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="text">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 右侧折线图 -->
        <el-card style="height:280px;">
          <div style="height:280px;" ref="eCharts1"></div>
        </el-card>
        <div class="order-eCharts">
          <!-- 右侧柱状图 -->
          <el-card style="height:280px;">
            <div style="height:280px;" ref="eCharts2"></div>
          </el-card>
          <!-- 右侧饼状图 -->
          <el-card style="height:280px;">
            <div style="height:260px;" ref="eCharts3"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as eCharts from "echarts"
import { productDate, orderDate,orderStaticLine,orderStaticBar,orderStaticPie } from "api/HomeDate.js";
export default {
  data() {
    return {
      products: [],
      orderState: [],
      productsKey: {
        name: "产品",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
    };
  },
  mounted() {
    this.products = productDate;
    this.orderState = orderDate;

    //初始化 折线图
    const eChartsLine = eCharts.init(this.$refs.eCharts1)
    //对图表对象进行配置
    var option1 = {
        tooltip: {trigger:"axis"},
        legend: {},//图例
        yAxis: {},//纵坐标
        series: []
      };
      //获取横坐标数据
      option1.xAxis={data:orderStaticLine.date};
      //获取对象的属性(键) Object.keys
      let keys=Object.keys(orderStaticLine.data[0]);
      //循环获取series数据
      keys.forEach(item=>{
        option1.series.push({
          name:item,
          type: 'line',
          //map()函数不会对空数组进行检测
          //map()函数不会改变原始数组，它形成的是 一个新的数组
          data:orderStaticLine.data.map(n=>n[item])
        })
      });
      // 使用刚指定的配置项和数据显示图表。
      eChartsLine.setOption(option1);

      //初始化 柱状图
      const eChartsBar = eCharts.init(this.$refs.eCharts2)
      //对图表对象进行配置
      var option2 = {
          tooltip: {trigger:"axis"},
          legend: {},//图例
          yAxis: {},//纵坐标
          series: []
      };
      option2.xAxis={data:orderStaticBar.map(m=>m["date"])};
      option2.series=[
        {name:"新增用户",type:"bar",data:orderStaticBar.map(m=>m["new"])},
        {name:"活跃用户",type:"bar",data:orderStaticBar.map(m=>m["active"])},
      ];
      eChartsBar.setOption(option2);

      //初始化 柱状图
      const eChartsPie = eCharts.init(this.$refs.eCharts3)
      //对图表对象进行配置
      var option3 = {
          tooltip: {trigger:"item"},
          series: []
      };
      option3.series=[
        {type:"pie",data:orderStaticPie},
      ];
      eChartsPie.setOption(option3);

  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.user {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .name {
    font-size: 32px;
    margin-bottom: 20px;
  }
  .role {
    color: #999;
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      margin-left: 60px;
      color: #666;
    }
  }
}
.order {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
    .icon {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      color: white;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .text {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
}
.order-eCharts{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card{
    width: 48%;
  }
}
</style>
