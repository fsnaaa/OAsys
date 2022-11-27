<template>
  <div class="attManager">
    <UploadExcel/>
    <el-dialog
      title="查看考情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <!-- 导入考勤查看组件 -->
      <attendanceList :userId="userID"/>
    </el-dialog>
    <el-table :data="attManagerList" stripe style="width: 100%" height="90%">
      <el-table-column prop="UserID" label="用户ID"> </el-table-column>
      <el-table-column prop="UserName" label="用户名"> </el-table-column>
      <el-table-column prop="DeptName" label="部门"> </el-table-column>
      <el-table-column label="考勤信息">
        <template slot-scope="scope">
            <el-button size="mini" type="success"
            @click="handleSearch(scope.$index, scope.row)"><i class="el-icon-search"></i></el-button>
        </template>
        </el-table-column>  
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="recordCount">
    </el-pagination>
  </div>
</template>

<script>
import AttendanceList from "views/attendanceList/AttendanceList";
import UploadExcel from "./UploadExcel";

import { GetDeptUserAttendance } from "api/attManagerData";
export default {
  components:{
    AttendanceList,
    UploadExcel
  },
  data(){
    return {
      userID:"",
      attManagerList:[],
      recordCount:0,
      yearArr: [1986, 2020, 2021, 2022, 2023, 2024, 2025],
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      attendanceList: [],
      dialogVisible: false,
    }
  },
  mounted(){
    this.queryAttManager();
  },
  methods:{
    //查询部门员工
    queryAttManager(index=1){
      GetDeptUserAttendance({pageIndex:index}).then(res=>{
        //console.log(res);
       this.attManagerList=res.data.data;
        //获取表格total值
        this.recordCount=res.data.total||0
      })
    },
    handleCurrentChange(index){
        this.queryAttManager(index)
    },
    //查看
    handleSearch(index, row) {
      console.log(row);
      this.dialogVisible = true;
      this.userID=row.UserID
    },
    //关闭弹窗
    handleClose() {
        this.dialogVisible = false;
      },
  }
};
</script>

<style lang="less" scoped>
.attManager{
  height: 90%;
}
 .el-pagination{
    margin-top: 15px;
    text-align: right;
  }
  .el-button{
    margin-bottom: 10px;
  }
</style>
