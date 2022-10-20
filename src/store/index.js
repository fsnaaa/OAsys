import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isCollapse: false,
    list: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
      },
    ],
  },
  getters: {},
  mutations: {
    showCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    tabChange(state, item) {
      //判断该tag菜单是否被点击
      let index = state.list.findIndex((m) => m.name == item.name);
      //未点击就添加
      if (index < 0) {
        state.list.push(item);
      }
    },
    //移除tag
    closeTag(state, item) {
      //获取tag序号
      let tagIndex = state.list.findIndex((m) => m.name == item.name);
      //根据序号移除对应tag
      state.list.splice(tagIndex, 1);
    },
  },
  actions: {},
});

export default store;
