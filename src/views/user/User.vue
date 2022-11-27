<template>
  <div class="user">
    <el-dialog
      :title="titleType=='add'?'新增用户':'修改用户'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 表单部分 -->
      <el-form
        ref="form"
        status-icon
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户ID" prop="UserID">
          <el-input :disabled="titleType!='add'" v-model="form.UserID" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="UserName">
          <el-input v-model="form.UserName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="UserType">
          <el-select clearable v-model="form.UserType" placeholder="请选择用户类型">
            <el-option label="普通员工" :value="0"></el-option>
            <el-option label="部门经理" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="DeptID">
          <el-select clearable v-model="form.DeptID" placeholder="请选择部门">
            <el-option v-for="(item,index) in allDeptList" 
            :key="index" :label="item.DeptName" 
            :value="item.DeptID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="Cellphone">
          <el-input v-model="form.Cellphone" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="search">
      <el-button type="primary" @click="addNewUser">+ 新增用户</el-button>
      <div class="search-bar">
        <el-input v-model="userId" placeholder="请输入用户编号" clearable></el-input>
        <el-input v-model="userName" placeholder="请输入用户名称" clearable></el-input>
        <el-select clearable v-model="dept" multiple
            collapse-tags
            style="margin-right: 20px;"
            placeholder="请选择部门">
            <el-option
              v-for="item in allDeptList"
              :key="item.DeptID"
              :label="item.DeptName"
              :value="item.DeptID">
            </el-option>
          </el-select>
        <el-button type="info" @click="searchClick">查询</el-button>
      </div>
    </div>
    <template>
      <el-table :data="userList" style="width: 100%" height="90%">
        <el-table-column prop="UserID" label="用户ID"></el-table-column>
        <el-table-column prop="UserName" label="用户姓名"></el-table-column>
        <el-table-column prop="DeptName" label="所属部门"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
             @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
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
      <span>确定需要删除该用户</span>
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
import { searchUser,addUser,updateUser,removeUser,GetUserInfo } from "api/userData";
import { searchDeptAllList } from "api/deptData";
export default {
  data() {
    const verifyPhone = (rule, v, callback) => {
      var p=/^1[3-9]\d{9}$/g;
				if(!p.test(v)){
					callback(new Error("请输入正确手机号格式"));
				}
				else{
					callback();
				}
    };
    const verifyName = (rule, v, callback) => {
      let p=/^[\u4e00-\u9fa5]{2,4}$/;
      if(!p.test(v)){
        callback(new Error("姓名必须是2到4个字"));
      }
      else{
        callback();
      }
    };
    return {
      id:"",
      userId:"",//查询条件 用户id
      userName:"",//查询条件 用户名称
      dept:[], //查询条件 用户部门

      dialogVisible: false,
      centerDialogVisible:false,
      userList: [],
      allDeptList:[],
      titleType:"add",
      timeDefaultShow:"",
      recordCount:0,
      form: {
        UserID:"",
        UserName: "",
        DeptID: "",
        Cellphone:"",
        UserType: "",
      },
      rules: {
        UserName: [
          //非空 message提示信息
          { required: true, message: "请输入用户名称", trigger: "blur" },
          //长度验证
          { validator: verifyName,trigger: "change"},
        ],
        UserID: [
          { required: true, message: "请输入用户编号", trigger: "blur" },
        ],
        UserType: [
          { required: true, message: "请选择用户类型", trigger: "blur" },
        ],
        Cellphone:[
          //长度验证
          { validator: verifyPhone,trigger: "change"},
        ]
      },
      
    };
  },
  methods: {
    //出生日期设置
    getBirth(){
      const nowYear=new Date().getFullYear();
      this.timeDefaultShow=(nowYear-this.form.age).toString();
    },
    //新增用户
    addNewUser(){
      this.dialogVisible = true;
      this.titleType="add";
    },
    //清除关闭弹窗
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //编辑
    handleEdit(index, row) {
        console.log(row)
        this.titleType="update";
        this.dialogVisible = true;

        let id=row.UserID
        GetUserInfo({UserID:id}).then(res=>{
            this.form=res.data.data;
        })

    },
    //删除
    handleDelete(index, row) {
      this.centerDialogVisible=true;
      this.id=row.UserID;
      
    },
    //确定删除
    isOk(){
      removeUser({UserID:this.id}).then(res=>{
          if(res.data.code){
            this.queryUser();
          }
          else{
            //登录失败提示信息
            this.$message.error(res.data.message);
          }
      }) 
      this.centerDialogVisible=false;
    },
    //用户查询
    searchClick(){
      //查询用户
      this.queryUser();
    },
    //分页查询
    queryUser(index=1){
      let deptArr=this.dept.join(",");
      searchUser(
        {userID:this.userId,
          userName:this.userName,
          deptId:deptArr,
          pageIndex:index
        }).then((res) => {
        console.log(res);
        this.userList = res.data.data;
        this.recordCount=res.data.total||0
      });
    },
    //将序号传递到分页查询
    handleCurrentChange(index){
      this.queryUser(index);
    },
    //新建确认
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //console.log(this.form)
          //判断新增还是修改
          if(this.titleType=="add"){
            addUser({userData:JSON.stringify(this.form)}).then(res=>{
              this.handleClose();
              //刷新表格
              this.queryUser();
            })  
          }
          else{

            updateUser({userData:JSON.stringify(this.form)}).then(res=>{
              console.log(res);
              this.handleClose();
              //刷新表格
              this.queryUser();
            })  
          }       
        }
      });
      
    },
    //取消按钮
    cancel() {
      this.handleClose();
    }
  },
  mounted() {
    //挂载查询
    this.queryUser();
    //查询所有部门信息
    searchDeptAllList().then(res=>{
        this.allDeptList=res.data.data;
        console.log(this.allDeptList);
      })
  }
};
</script>

<style lang="less" scoped>
.user{
  height: 90%;
}
  .search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .search-bar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-input{
        margin-right: 15px;
        width: 40%;
      }
    }
  }
  .el-pagination{
    margin-top: 15px;
    text-align: right;
  }
</style>
