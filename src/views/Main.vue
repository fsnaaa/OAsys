<template>
  <el-container>
    <el-aside width="auto">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header>
        <common-header />
      </el-header>
      <common-tag />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "views/common/CommonAside";
import CommonHeader from "views/common/CommonHeader";
import CommonTag from "views/common/CommonTag";
export default {
  name: "App",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
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

body > .el-container {
  margin-bottom: 40px;
}
</style>
