<template>
  <div class="dept">
    
    <el-dialog
      :title="deptType=='add'?'新建部门':'修改部门'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">

      <el-form
        ref="deptForm"
        status-icon
        :model="deptForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="部门名称" prop="DeptName">
          <el-input v-model="deptForm.DeptName" clearable></el-input>
        </el-form-item>
        <el-form-item label="主管" prop="ManagerID">
          <el-select clearable v-model="deptForm.ManagerID" placeholder="请选择主管">
            <el-option 
            v-for="item in deptOptions" 
            :key="item.UserID" 
            :value="item.UserID"
            :label="item.UserName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门说明" prop="DeptInfo">
          <el-input :autosize="{ minRows: 2, maxRows: 6}" type="textarea" v-model="deptForm.DeptInfo" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 头部搜索新增部分 -->
    <div class="search">
      <el-button type="primary" @click="addNewDept">+ 新增部门</el-button>
      <div class="select-dept">
        <el-input clearable v-model="deptName" placeholder="请输入部门名称"></el-input>
        <el-select clearable v-model="ManagerName" placeholder="请选择主管">
          <el-option 
            v-for="item in deptOptions" 
            :key="item.UserID" 
            :value="item.UserID"
            :label="item.UserName"
          ></el-option>
        </el-select>
        <el-button class="btn" type="info" @click="searchClick">查询</el-button>
      </div>
    </div>
    <template>
      <el-table :data="deptList" style="width: 100%" height="90%">
        <el-table-column prop="DeptID" label="序号" width="180px"> </el-table-column>
        <el-table-column prop="DeptName" label="部门名称"> </el-table-column>
        <el-table-column prop="ManagerName" label="主管"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button size="mini" type="warning"
             @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
             <!-- 删除 -->
            <el-button size="mini" type="danger"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定需要删除该部门吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isOk">确 定</el-button>
      </span>
    </el-dialog>   
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="recordCount">
    </el-pagination>
  </div>
</template>

<script>
import { searchDept,addDept,updateDept,removeDept,GetDeptInfo } from "api/deptData";
import { GetAllManager} from "api/userData";

export default {
  data() {
      return {
        id:"",
        deptName:"",
        ManagerName:"",
        
        dialogVisible: false,
        centerDialogVisible:false,
        deptType:"add",
        deptList:[],
        deptOptions: [],
        recordCount:0,
        deptForm: {
          DeptName: "",
          ManagerID: "",
          DeptInfo:""
        },
        rules:{
          DeptName:[
            { required: true, message: "请输入用户名称", trigger: "blur" },
          ]
        }
      };
      
    },
    methods: {
      queryDept(index=1){
        searchDept({DeptName:this.deptName,UserName:this.ManagerName,pageIndex:index}).then(res=>{
          //console.log(res);
          //获取表格数据
          this.deptList=res.data.data;
          //console.log(this.deptList)
          //获取表格total值
          this.recordCount=res.data.total||0
        
        })
      },
      handleCurrentChange(index){
        this.queryDept(index)
      },
      //新增
      addNewDept(){
        this.dialogVisible = true;
        this.deptType="add"
      },
      //确认按钮
      onSubmit() {
        console.log(this.deptForm);
        this.$refs.deptForm.validate((v) => {
          if(v){
            if(this.deptType=="add"){
              addDept({deptData:JSON.stringify(this.deptForm)}).then(res=>{
                this.queryDept();
                this.handleClose();
              })
            }
            else{
              updateDept({deptData:JSON.stringify(this.deptForm)}).then(res=>{
                this.queryDept();
                this.handleClose();
              })
            }
            
          }
        })
      },
      handleClose() {
        this.$refs.deptForm.resetFields();
        this.dialogVisible = false;
      },
      cancel(){
        this.handleClose();
      },
      //编辑
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.deptType="update"
        
        let id=row.DeptID;
        GetDeptInfo({DeptID:id}).then(res=>{
          console.log(res)
          this.deptForm=res.data.data
        })

      },
      //删除
      handleDelete(index, row) {
        this.id=row.DeptID;
        this.centerDialogVisible=true;
      },
      //确定删除
      isOk(){
        removeDept({DeptID:this.id}).then(res=>{
            this.queryDept();
          })
        this.centerDialogVisible=false;
      },
      //查询
      searchClick(){
        this.queryDept();
      },
      
    },
    mounted(){
      this.queryDept();

      GetAllManager().then(res=>{
        console.log(res)
        this.deptOptions=res.data.data;
      })
    }
};
</script>

<style lang="less" scoped>
  .dept{
    height: 90%;
  }
  .search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .select-dept{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-input{
        margin-right: 15px;
        width: 40%;
      }
      .btn{
        margin-left: 15px;
      }
    }
  }
  .el-pagination{
    margin-top: 15px;
    text-align: right;
  }
</style>
