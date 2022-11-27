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
      @click.native="menuClick(item)"
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
import Cookie from "js-cookie";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    noChildren() {
      return this.dynamicMenus.filter((m) => !m.children||m.children.length<=0);
    },
    hasChildren() {
      return this.dynamicMenus.filter((m) => m.children&&m.children.length>0);
    },
    dynamicMenus(){
      //读取保存的菜单
      const menus= Cookie.get("menus");
      if(!menus){
        return []
      }
      return JSON.parse(menus);
   
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
