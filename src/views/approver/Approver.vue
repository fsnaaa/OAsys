<template>
  <div class="approver">
    <el-dialog
      :title="titleType=='look'?'查看请假申请':'审批请假'"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">

      <el-form
        ref="form"
        status-icon
        :model="from"
        :rules="rules1"
        label-width="80px"
      >
        <el-col :span="12">
          <el-form-item prop="ApproveID">
              请假单号：{{approveID}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="ApplyUser">
            申请人：{{ApplyUserName}}
          </el-form-item> 
        </el-col>
        <el-form-item label="标题" prop="Title">
          <el-input v-model="from.Title" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="起始时间" prop="BeginDate">
          <el-date-picker
            v-model="from.BeginDate"
            type="datetime"
            format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择起始时间"
            style="width:100%"
            :disabled="true"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="EndDate">
          <el-date-picker
            v-model="from.EndDate"
            type="datetime"
            format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择结束时间"
            style="width:100%"
            :disabled="true"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假原因" prop="Reason">
          <el-input :disabled="true" 
            :autosize="{ minRows: 2, maxRows: 6}" type="textarea" 
            v-model="from.Reason" clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 查看审批信息 -->
      <el-form
        status-icon
        :model="searchFrom"
        :rules="rules2"
        label-width="80px"
      >
        <h3>审批信息</h3>
        <el-form-item label="申请时间" prop="ApplyDate">
          <el-date-picker
            v-model="searchFrom.ApplyDate"
            type="datetime"
            format="yyyy-MM-dd  hh:mm"
            value-format="yyyy-MM-dd hh:mm"
            style="width:100%"
            :disabled="true"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批结果" prop="Result">
          <el-select placeholder="请选择" v-model="searchFrom.Result"  :disabled="isForbidden" style="width: 100%;">
            <el-option :value="0" label="不同意"></el-option>
            <el-option :value="1" label="同意"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批人" prop="ApproveUserName">
          <el-input v-model="from.ApproveUserName"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审批时间" prop="ApproveDate">
          <el-date-picker
            v-model="searchFrom.ApproveDate"
            type="datetime"
            style="width:100%"
            :disabled="true"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input :disabled="isForbidden" 
          :autosize="{ minRows: 2, maxRows: 6}" 
          type="textarea" v-model="from.Remark" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="titleType!='look'">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 头部搜索新增部分 -->
    <div class="search">
        <el-input clearable v-model="approveTitle" placeholder="请输入请假标题"></el-input>
        <div class="block">
            <el-date-picker
              v-model="searchDate"
              unlink-panels
              type="daterange"
              range-separator="至"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              start-placeholder="申请开始日期"
              end-placeholder="申请结束日期">
            </el-date-picker>
        </div>
        <el-select clearable v-model="approveStatus" placeholder="请选择请假状态">
          <el-option :value="0" label="待审批"></el-option>
          <el-option :value="1" label="归档"></el-option>
          <el-option value="" label="全部"></el-option>
        </el-select>
        <el-input clearable v-model="applyName" placeholder="请输入申请人名称"></el-input>
        <el-button class="btn" type="info" @click="searchInfo">查询</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table :data="approveList" style="width: 100%" height="90%">
        <el-table-column prop="ApproveID" label="申请单ID" width="90"></el-table-column>
        <el-table-column prop="ApplyUserName" label="申请人" width="100"></el-table-column>
        <el-table-column prop="Title" label="标题"></el-table-column>
        <el-table-column prop="BeginDate" label="起始时间">
          <template slot-scope="scope">
            {{date(scope.row.BeginDate,"")}}
          </template>
        </el-table-column>
        <el-table-column prop="EndDate" label="结束时间">
          <template slot-scope="scope">
            {{date(scope.row.EndDate,"")}}
          </template>
        </el-table-column>
        <el-table-column prop="ApplyDate" label="申请时间">
          <template slot-scope="scope">
            {{date(scope.row.ApplyDate,"")}}
          </template>
        </el-table-column> 
        <el-table-column prop="Status" label="请假单状态" width="90">
          <template slot-scope="scope">
           <span v-if="scope.row.Status==1" style="color:#0dbc79">归档</span>
           <span v-else style="color:#ff459d">待审批</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.Status==0">
              <el-button size="mini" type="warning"
              @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="success"
              @click="handleSearch(scope.$index, scope.row)"><i class="el-icon-search"></i></el-button>
            </div>
          </template>
        </el-table-column>  
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="recordCount">
    </el-pagination>
  </div>
</template>

<script>
import {searchApproveList,GetApproveInfo,updateApprove} from "api/approveData"
import { dateProcessing } from "utils/dateTool";
export default {
  data(){
    return{
      id:"",
      isForbidden:true,//是否禁用
      dialogVisible: false,
      centerDialogVisible:false,
      titleType:"look", //标题类型

      recordCount:0,
      approveList:[],
      approveID:"",
      ApplyUserName:"",
      from:{
        Title:"",
        BeginDate:"",
        EndDate:"",
        Reason:"",
        ApproveUser:"",//审批人
      },
      searchFrom:{
        ApplyDate:"",//申请时间
        Result:"",//审批结果
        ApproveUser:"",//审批人
        ApproveUserName:"",//审批人姓名
        ApproveDate:"",//审批时间
        Remark:"",//备注
      },
      rules1: {
        Title: [
          //非空 message提示信息
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
        BeginDate: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        EndDate: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        Reason: [
          { required: true, message: "请输入请假原因", trigger: "blur" },
        ],
        
        
      },
      rules2:{
        Result: [
          //非空 message提示信息
          { required: true, message: "请输入意见", trigger: "change" },
        ],
      },
      searchDate:"",//请假时间 查询
      approveTitle:"",//请假标题 查询
      approveStatus:"",//批审状态 查询
      applyName:"",//批审申请人 查询
    }
  },
  mounted(){
    this.queryApprove();
  },
  methods:{
      //确认按钮
      onSubmit(){
        this.$refs.form.validate((valid) => {
          if(valid){
            console.log(this.from);
            //修改请求
            updateApprove({approveData:JSON.stringify(this.searchFrom)}).then(res=>{
              this.handleClose();
              this.queryApprove();
            })
          }
        })
      },
      //查询
      searchInfo(){
        this.queryApprove();
      },
      //查询方法
      queryApprove(index=1){
        searchApproveList({
          Title:this.approveTitle,
          SearchDate:!this.searchDate?",":this.searchDate.join(","),
          Status:this.approveStatus,
          ApplyUserName:this.applyName,
          pageIndex:index,
        }).then(res=>{
          this.approveList=res.data.data;
          //console.log(res)
          this.recordCount=res.data.total||0
        })
      },
      //清除关闭弹窗
      handleClose() {
          this.$refs.form.resetFields();
          this.dialogVisible = false;
      },
      //取消
      cancel(){
          this.handleClose();
      },
       //编辑
      handleEdit(index, row) {
          this.titleType="update";
          this.dialogVisible=true;
          this.isForbidden=false;
          let id=row.ApproveID;
          this.approveID=id;
          this.ApplyUserName=row.ApplyUserName;
          GetApproveInfo({ApproveID:id}).then(res=>{
            console.log(res);
            this.from=res.data.data;
            this.searchFrom=res.data.data;
            console.log(this.from);
            console.log(this.searchFrom);
          })
          
      },
      //查看
      handleSearch(index, row) {
          this.titleType="look";
          this.dialogVisible=true;
          this.isForbidden=true;
          let id=row.ApproveID
          this.approveID=id;
          this.ApplyUserName=row.ApplyUserName;
          GetApproveInfo({ApproveID:id}).then(res=>{
            console.log(res);
            this.from=res.data.data;
            this.searchFrom=res.data.data;
        })    
      },
      //将序号传递到分页查询
      handleCurrentChange(index){
        this.queryApprove(index);
      },
      //日期处理
      date(time,type){
        return dateProcessing(time,type)
      },
      
  }
};
</script>

<style lang="less" scoped>
.approver{
  height: 90%;
}
.search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .el-input,.el-select,.el-date-picker{
        width: 18%;
      }
   
}
.el-pagination{
    margin-top: 15px;
    text-align: right;
  }
</style>
