<template>
  <header class="header">
    <div class="l-content">
      <el-button @click="Collapse" size="small" icon="el-icon-menu"></el-button>
      <el-breadcrumb
        style="margin-left: 15px"
        separator-class="el-icon-arrow-right"
      >
        <!-- 面包屑 -->
        <el-breadcrumb-item v-for="(item, index) in list" :key="index">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="outLogin">
        <span class="el-dropdown-link" >
          <img src="~assets/img/common/user.png" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="30%"
      :before-close="handleClose"
      center>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="新密码">
          <el-input type="password" v-model="form.Password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定 修 改</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
import Cookie from "js-cookie";
import { mapMutations, mapState } from "vuex";
import { updatePsw} from "api/userData";
export default {
  data(){
    return{
      centerDialogVisible:false,
      form:{
        Password:"",
      },
    }
  },
  methods: {
    ...mapMutations(["showCollapse","closeAllTag"]),
    Collapse() {
      this.showCollapse();
    },
    outLogin(e){
      //console.log(e)
      //判断是否点击退出选项
      if(e=="out"){
        //清除cookie
        Cookie.remove("token");
        //跳转到登录页面
        this.$router.replace({
          path:"/login"
        })
        //清除所有tag
        this.closeAllTag();
      }
      //弹出个人信息界面
      else if(e=="info"){
        this.centerDialogVisible=true;
      }
    },
    //清除关闭弹窗
    handleClose() {
      this.cancel();
    },
    //取消
    cancel(){
      this.centerDialogVisible=false;
      this.form={
          Password:""
      };
    },
    //确认修改
    update(){
      updatePsw({password:this.form.Password}).then(res=>{
        this.cancel();
        if(res.data.code){
          this.$message(res.data.message);
        }
        else{
          this.$message.error(res.data.message);
        }
      })
    },
    
  },
  computed: {
    ...mapState(["list"]),
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  /deep/ .l-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-breadcrumb__item {
      &:last-child {
        .el-breadcrumb__inner {
          color: white;
        }
      }
    }
  }
}
.r-content img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
</style>
