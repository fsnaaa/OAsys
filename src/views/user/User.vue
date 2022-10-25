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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age" @blur="getBirth"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="form.birth"
              :default-value="timeDefaultShow"
              style="width: 100%"
            ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
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
        <el-input v-model="key" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="searchClick">查询</el-button>
      </div>
    </div>
    <template>
      <el-table :data="userList" style="width: 100%" height="94%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="recordCount">
    </el-pagination>
  </div>
</template>

<script>
import { searchUser,addUser,updateUser,removeUser } from "api/userData";
export default {
  data() {
    const verifyAge = (rule, v, callback) => {
      //判断年龄 超过十八岁
      if (v < 18) {
        callback(new Error("年龄必须>=18"));
      } else {
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
      key:"",
      dialogVisible: false,
      userList: [],
      titleType:"add",
      timeDefaultShow:"",
      recordCount:0,
      form: {
        id:"",
        name: "",
        age: "",
        sex: "1",
        birth: "",
        address: "",
      },
      rules: {
        name: [
          //非空 message提示信息
          { required: true, message: "请输入用户名称", trigger: "blur" },
          //长度验证
          { validator: verifyName,trigger: "change",},
        ],
        age: [
          { required: true, message: "请输入用户年龄", trigger: "blur" },
          //数字类型验证
          { type: "number", message: "年龄必须是数字", trigger: "blur" },
          //自定义验证
          { validator: verifyAge, trigger: "blur" },
        ],
      },
      
    };
  },
  methods: {
    getBirth(){
      const nowYear=new Date().getFullYear();
      this.timeDefaultShow=(nowYear-this.form.age).toString();
    },
    addNewUser(){
      this.dialogVisible = true;
      this.titleType="add";
      this.form= {
        id:"",
        name: "",
        age: "",
        sex: "1",
        birth: "",
        address: "",
      };
      
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleEdit(index, row) {
        this.dialogVisible = true;
        //将对象结构
        const {id,name,age,sex,birth,address}=row;
        //将数据赋给页面
        this.form.id=id;
        this.form.name=name;
        this.form.age=age;
        this.form.sex=sex;
        this.form.birth=birth;
        this.form.address=address;
        
        this.titleType="update";
    },
    handleDelete(index, row) {
      removeUser(row.id).then(res=>{
          this.queryUser();
      }) 
    },
    searchClick(){
      //查询用户
      this.queryUser();
    },
    queryUser(index=1){
      searchUser({pageIndex:index,key:this.key}).then((res) => {
        this.userList = res.data.data;
        this.recordCount=res.data.total||0
      });
    },
    handleCurrentChange(index){
      this.queryUser(index);
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form)
          //判断新增还是修改
          if(this.titleType=="add"){
            addUser(this.form).then(res=>{
              this.handleClose();
              //刷新表格
              this.queryUser();
            })  
          }
          else{
            updateUser(this.form).then(res=>{
              this.handleClose();
              //刷新表格
              this.queryUser();
            })  
          }       
        }
      });
      
    },
    cancel() {
      this.handleClose();
    }
  },
  mounted() {
    this.queryUser();
    
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
    .search-bar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-input{
        margin-right: 15px;
      }
    }
  }
  .el-pagination{
    margin-top: 15px;
    text-align: right;
  }
</style>
