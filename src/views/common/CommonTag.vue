<template>
  <div class="tag">
    <el-tag
      v-for="(tag, index) in list"
      :key="tag.name"
      :closable="tag.name != 'home'"
      :type="tag.type"
      :effect="$route.path == tag.path ? 'dark' : 'plain'"
      @close="closeTagItem(tag, index)"
      @click="changeMenu(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["list"]),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    closeTagItem(item, index) {
      //关闭对应的tag
      this.closeTag(item);
      //判断关闭路由是否与点前路由一致
      if (this.$route.path == item.path) {
        //前移路由
        this.$router.replace({
          path: this.list[index - 1].path,
        });
      }
    },
    //点击跳转对应路由
    changeMenu(item) {
      this.$router.replace({
        path: item.path,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tag {
  padding: 20px;
  .el-tag {
    margin-right: 10px;
  }
}
</style>
