<template>
  <div class="apply">
    <el-dialog
      :title="titleType"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
      <el-form
        ref="form"
        status-icon
        :model="from"
        :rules="rules"
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
          <el-input v-model="from.Title" clearable></el-input>
        </el-form-item>
        <el-form-item label="起始时间" prop="BeginDate">
          <el-date-picker
            v-model="from.BeginDate"
            type="datetime"
            format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择起始时间"
            style="width:100%"
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
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假原因" prop="Reason">
          <el-input :autosize="{ minRows: 2, maxRows: 6}" type="textarea" v-model="from.Reason" clearable></el-input>
        </el-form-item>
      </el-form>
      <!-- 查看审批信息 -->
      <el-form
        status-icon
        :model="searchFrom"
        :rules="rules"
        label-width="80px"
        v-if="titleType=='查看请假申请'"
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
          <el-select v-model="searchFrom.Result"  :disabled="true" style="width: 100%;">
            <el-option :value="0" label="不同意"></el-option>
            <el-option :value="1" label="同意"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批人" prop="ApproveUserName">
          <el-input v-model="from.ApproveUserName"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审批时间" prop="EndDate">
          <el-date-picker
            v-model="searchFrom.EndDate"
            type="datetime"
            format="yyyy-MM-dd  hh:mm"
            value-format="yyyy-MM-dd hh:mm"
            style="width:100%"
            :disabled="true"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input :disabled="true" :autosize="{ minRows: 2, maxRows: 6}" type="textarea" v-model="from.Remark" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="titleType!='查看请假申请'">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 头部搜索新增部分 -->
    <div class="search">
      <el-button type="primary" @click="addApprove">请假</el-button>
      <div class="select-apply">
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
        <el-button class="btn" type="info" @click="searchInfo">查询</el-button>
      </div>
    </div>
    <!-- 数据表格 -->
    <el-table :data="applyList" style="width: 100%" height="90%">
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
              <el-button size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="success"
              @click="handleSearch(scope.$index, scope.row)"><i class="el-icon-search"></i></el-button>
            </div>
          </template>
        </el-table-column>  
    </el-table>
    <!-- 确认删除弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定需要删除该请假申请</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isOk">确 定</el-button>
      </span>
    </el-dialog>
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
// import Cookie from "js-cookie";
import {searchApproveList,addApprove,GetApproveInfo,updateApprove,removeApprove} from "api/applyData"
import { dateProcessing } from "utils/dateTool";
export default {
  data(){
    return{
      id:"",
      dialogVisible: false,
      centerDialogVisible:false,
      titleType:"",
      recordCount:0,
      applyList:[],
      approveID:"",
      ApplyUserName:"",
      from:{
        Title:"",
        BeginDate:"",
        EndDate:"",
        Reason:"",
      },
      searchFrom:{
        ApplyDate:"",//申请时间
        Result:"",//审批结果
        ApproveUserName:"",//审批人
        ApproveDate:"",//审批时间
        Remark:"",//备注
      },
      rules: {
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
      searchDate:"",//请假时间 查询
      approveTitle:"",//请假标题 查询
      approveStatus:"",//批审状态 查询
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
            //判断新增还是删除
            if(this.titleType=="请假申请"){
              console.log(this.from);
              addApprove({approveData:JSON.stringify(this.from)}).then(res=>{
                console.log(res);
                this.handleClose();
                this.queryApprove();
                //判断当前时间是否可以请假
                if(res.data.data==false){
                  this.$message({
                    message: res.data.message,
                    type: 'warning'
                  });
                }
              })
            }
            else{
              console.log(this.from);
              //修改请求
              updateApprove({approveData:JSON.stringify(this.from)}).then(res=>{
                this.handleClose();
                this.queryApprove();
              })
            }
            
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
          pageIndex:index,
          // token:Cookie.get("token")
        }).then(res=>{
          this.applyList=res.data.data;
          console.log(res)
          this.recordCount=res.data.total||0
        })
      },
      //清除关闭弹窗
      handleClose() {
          this.$refs.form.resetFields();
          this.dialogVisible = false;
      },
      //新增请假
      addApprove(){
          this.approveID="";
          this.titleType="请假申请";
          this.dialogVisible=true;
      },
      //取消
      cancel(){
          this.handleClose();
      },
       //编辑
      handleEdit(index, row) {
          this.titleType="修改请假申请";
          this.dialogVisible=true;
          let id=row.ApproveID;
          this.approveID=id;
          this.ApplyUserName=row.ApplyUserName;
          GetApproveInfo({ApproveID:id}).then(res=>{
            this.from=res.data.data;
          })
          
      },
      //查看
      handleSearch(index, row) {
          this.titleType="查看请假申请";
          this.dialogVisible=true;
          let id=row.ApproveID
          this.approveID=id;
          this.ApplyUserName=row.ApplyUserName;
          GetApproveInfo({ApproveID:id}).then(res=>{
            this.from=res.data.data;
            this.searchFrom=res.data.data;
        })    
      },
      //删除
      handleDelete(index, row) {
        this.id=row.ApproveID;
        this.centerDialogVisible=true;
      },
      //确定删除
      isOk(){
        //给删除的网络请求传递参数
        removeApprove({ApproveID:this.id}).then(res=>{
            if(res.data.code){
              //成功 刷新页面
              this.queryApprove();
               //删除成功 提示信息
               this.$message(res.data.message);
            }
            else{
              //删除失败 提示信息
              this.$message.error(res.data.message);
            }
          })
        this.centerDialogVisible=false;
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
.apply{
  height: 90%;
}
.search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .select-apply{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      // border: 1px solid red;
      
      .el-input,.el-select{
        width: 20%;
      }
    }
   
}
.el-pagination{
    margin-top: 15px;
    text-align: right;
  }
</style>
