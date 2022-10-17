<template>
  <header class="header">
    <div class="l-content">
      <el-button @click="Collapse" size="small" icon="el-icon-menu"></el-button>
      <el-breadcrumb
        style="margin-left: 15px"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{
          item.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="~assets/img/common/user.png" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  methods: {
    ...mapMutations(["showCollapse"]),
    Collapse() {
      this.showCollapse();
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
