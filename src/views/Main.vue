<template>
  <el-container>
    <el-aside width="auto">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header>
        <common-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "views/common/CommonAside";
import CommonHeader from "views/common/CommonHeader";
export default {
  name: "App",
  components: {
    CommonAside,
    CommonHeader,
  },
};
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #333;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
