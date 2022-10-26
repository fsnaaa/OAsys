<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3 v-if="!isCollapse">协同办公系统</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.label"
      :index="item.index"
      @click="menuClick(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="child in item.children"
        :key="child.label"
        :index="child.index"
        style="cursor: pointer"
        @click.native="menuClick(child)"
      >
        <span slot="title">{{ child.label }}</span>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
//导入vueX的辅助函数
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      menus: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          index: "1",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          index: "2",
        },
        {
          path: "/dept",
          name: "dept",
          label: "部门管理",
          icon: "tickets",
          index: "3",
        },
        {
          path: "/setting",
          name: "setting",
          label: "考勤设置",
          icon: "setting",
          index: "33",
        },
        {
          path: "/approver",
          name: "approver",
          label: "请假审批",
          icon: "edit",
          index: "11",
        },
        {
          path: "/attManager",
          name: "attManager",
          label: "考勤管理",
          icon: "time",
          index: "44",
        },
        {
          path: "/apply",
          name: "apply",
          label: "请假申请",
          icon: "message",
          index: "7",
        },
        {
          label: "我的考勤",
          icon: "star-on",
          name: "myAttendance",
          path: "/other",
          index: "4",
          children: [
            {
              path: "/attendanceList",
              name: "attendanceList",
              label: "考勤列表",
              index: "5",
            },
            {
              path: "/calender",
              name: "calender",
              label: "考勤日历",
              index: "6",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menus.filter((m) => !m.children);
    },
    hasChildren() {
      return this.menus.filter((m) => m.children);
    },
    ...mapState(["isCollapse"]),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    ...mapMutations(["tabChange"]),
    menuClick(item) {
      this.$router.replace({
        path: item.path,
      });
      this.tabChange(item);
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  h3 {
    color: white;
    line-height: 40px;
    text-align: center;
  }
}
</style>
