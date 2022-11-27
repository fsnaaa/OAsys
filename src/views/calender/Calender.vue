<template>
  <div class="search">
    <div class="search-attendanceList">
      <el-select clearable v-model="year" placeholder="请选择年份">
        <el-option
          v-for="y in yearArr"
          :key="y"
          :value="y"
          :label="y + '年'"
        ></el-option>
      </el-select>
      <el-select clearable v-model="month" placeholder="请选择月份">
        <el-option
          v-for="m in 12"
          :key="m"
          :value="m"
          :label="m + '月'"
        ></el-option>
      </el-select>
      <el-button class="btn" type="success" @click="searchClick">查看</el-button>
    </div>
    <!-- .Status -->
    <el-table  :data="attendanceCalender" 
    :border="true" 
    :cell-class-name="clearPadding"
    style="width: 100%">
      <el-table-column prop="Week1" label="星期一">
        <template slot-scope="scope">
          <calender-item :item="scope.row.Week1"/>
        </template>
      </el-table-column>
      <el-table-column prop="Week2" label="星期二">
        <template slot-scope="scope">
          <calender-item :item="scope.row.Week2"/>
        </template>
      </el-table-column>
      <el-table-column prop="Week3" label="星期三">
        <template slot-scope="scope">
          <calender-item :item="scope.row.Week3"/>
        </template>
      </el-table-column>
      <el-table-column prop="Week4" label="星期四">
        <template slot-scope="scope">
          <calender-item :item="scope.row.Week4"/>
        </template>
      </el-table-column>
      <el-table-column prop="Week5" label="星期五">
        <template slot-scope="scope">
          <calender-item :item="scope.row.Week5"/>
        </template>
      </el-table-column>
      <el-table-column prop="Week6" label="星期六">
        <template slot-scope="scope">
          <calender-item :item="scope.row.Week6"/>
        </template>
      </el-table-column>
      <el-table-column prop="Week0" label="星期日">
        <template slot-scope="scope">
          <calender-item :item="scope.row.Week0"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CalenderItem from "./CalenderItem"

import { GetAttendanceCalendar } from "api/attendanceData";
import { dateProcessing } from "utils/dateTool";
export default {
  components:{
    CalenderItem
  },
  data() {
    return {
      yearArr: [1986, 2020, 2021, 2022, 2023, 2024, 2025],
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      attendanceCalender: [],
    };
  },
  mounted() {
    //加载时查询当前时间数据
    this.queryAttendanceList();
  },
  methods: {
    //清除边距
    clearPadding(row) {
      if (
        row.columnIndex === 0 ||
        row.columnIndex === 1 ||
        row.columnIndex === 2 ||
        row.columnIndex === 3 ||
        row.columnIndex === 4 ||
        row.columnIndex === 5 ||
        row.columnIndex === 6
      ) {
        return 'clearPadding'
      }
    },
    //显示
    searchClick() {
      this.queryAttendanceList();
    },
    //查询
    queryAttendanceList() {
      GetAttendanceCalendar({ year: this.year, month: this.month }).then((res) => {
        console.log(res);
        this.attendanceCalender = res.data.data;
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
  }
}
/deep/.el-table {
  .clearPadding {
    .cell {
      padding: 0px !important;
    }
  }
}
// table表格高度控制在34px
/deep/ .el-table__row td {
  height: 34px !important;
  line-height: 34px !important;
  padding: 0 !important;
}
</style>
