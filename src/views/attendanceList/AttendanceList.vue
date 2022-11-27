<template>
  <div class="search">
    <div class="search-attendanceList">
      <el-select v-model="year" placeholder="请选择年份">
        <el-option
          v-for="y in yearArr"
          :key="y"
          :value="y"
          :label="y + '年'"
        ></el-option>
      </el-select>
      <el-select v-model="month" placeholder="请选择月份">
        <el-option
          v-for="m in 12"
          :key="m"
          :value="m"
          :label="m + '月'"
        ></el-option>
      </el-select>
      <el-button class="btn" type="success" @click="searchClick">查看</el-button>
    </div>
    <el-table :data="attendanceList" stripe style="width: 100%">
      <el-table-column prop="Date" label="日期">
        <template slot-scope="scope">
          {{date(scope.row.Date,"yyyy-mm-dd")}}
        </template>
      </el-table-column>
      <el-table-column label="星期" prop="Week"></el-table-column>
      <el-table-column prop="MinTime" label="首次打卡时间">
        <template slot-scope="scope">
          {{date(scope.row.MinTime,"")}}
        </template>
      </el-table-column>
      <el-table-column prop="MaxTime" label="最后打卡时间">
        <template slot-scope="scope">
          {{date(scope.row.MaxTime,"")}}
        </template>
      </el-table-column>
      <!-- 旷工：红 正常：灰 休假：蓝 迟到：粉红 请假：绿-->
      <el-table-column prop="Status" label="考勤状态">
        <template slot-scope="scope">
          <div :style="styleColor(scope.row.Status)">
            {{scope.row.Status}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetAttendanceList } from "api/attendanceData";
import { dateProcessing } from "utils/dateTool";
export default {
  props:{
    userId:{
      type:String,
      default:"",
    }
  },
  data() {
    return {
      yearArr: [1986, 2020, 2021, 2022, 2023, 2024, 2025],
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      attendanceList: [],
    };
  },
  mounted() {
    //加载时查询当前时间数据
    this.queryAttendanceList();
  },
  methods: {
    styleColor(s){
      if(s=="旷工"){
       return "color:#f15213"
      }
      else if(s=="休假"){
        return "color:#007acc"
      }
      else if(s=="迟到"){
        return "color:#ff459d"
      }
      else if(s=="请假"){
        return "color:#0dbc79"
      }
      else{
        return "color:#c2c3c9"
      }
    },
    //显示
    searchClick() {
      this.queryAttendanceList();
    },
    //查询
    queryAttendanceList() {
      GetAttendanceList({userID:this.userId, year: this.year, month: this.month }).then((res) => {
        console.log(res);
        this.attendanceList = res.data.data;
      });
    },
    //日期处理
    date(time,type){
      if(time!=null)
        return dateProcessing(time,type)
    }
  },
};
</script>

<style lang="less" scoped>
.search-attendanceList{
  width: 60%;
  margin: 0px auto;
  margin-bottom: 20px;
  .el-select{
    margin-right: 15px;
    width: 30%;
  }
}
</style>
