<template>
  <el-form
    class="login-from"
    label-width="80px"
    :rules="rules"
    :model="formLogin"
    status-icon
    ref="login"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" prop="loginName">
      <el-input
        v-model="formLogin.loginName"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="loginPwd">
      <el-input
        type="password"
        v-model="formLogin.loginPwd"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button @click="resetForm">重置</el-button>
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
        loginPwd: "",
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        loginPwd: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((v) => {
        if (v) {
            //调用登录验证网络请求
            userLogin(this.formLogin).then(res=>{
              console.log(res)
                //根据条件判断是否登录成功
                if(res.data.code==200){
                    //将mock传递过来的数据保存在cookie中 cookie只能保存字符串
                    //console.log(res.data.menus);
                    Cookie.set("menus",JSON.stringify(res.data.menus));
                    Cookie.set("token", res.data.token,{
                      sameSite:'none',
                      secure:true
                    });
                    //console.log(res.data.menus);

                    //设置"动态路由"
                    //根据菜单循环生成路由记录
                    res.data.menus.forEach(menu=>{
                      //console.log(menu);
                      if(menu.children&&menu.children.length>0){
                          //循环路由子菜单 生成子路由记录
                          menu.children.forEach(child=>{
                            let routeChild={
                              //导航路径
                              path:child.path,
                              component:()=>import(`../${child.url}`)
                            }
                            this.$router.addRoute("Main",routeChild);
                          })
                      }
                      else{
                        let routeItem={
                          //导航路径
                          path:menu.path,
                          component:()=>import(`../${menu.url}`)
                        }
                        this.$router.addRoute("Main",routeItem);
                      }
                    })

                    //打开首页
                    this.$router.replace({
                        path: "/home",
                    });
                }
                else{
                    //登录失败提示信息
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
