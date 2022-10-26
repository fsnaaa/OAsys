<template>
  <el-form
    class="login-from"
    label-width="80px"
    :rules="rules"
    :model="formLogin"
    ref="login"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" prop="loginName">
      <el-input
        v-model="formLogin.loginName"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="loginPws">
      <el-input
        type="password"
        v-model="formLogin.loginPws"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from "js-cookie";
import { userLogin } from "api/userData";
export default {
  data() {
    return {
      formLogin: {
        loginName: "",
        loginPws: "",
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        loginPws: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((v) => {
        if (v) {
            userLogin(this.formLogin).then(res=>{
                if(res.data.code){
                    Cookie.set("token", res.data.token);
                    //打开首页
                    this.$router.replace({
                        path: "/home",
                    });
                }
                else{
                    this.$message.error(res.data.message);
                }
            })
        }
      });
    },
    resetForm() {
      this.$refs.login.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-from {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #e0dfdf;
  padding: 35px 35px 15px 35px;
  background-color: white;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 5%;
  .login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
