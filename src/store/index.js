import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isCollapse: false,
    list: [
      {
        path: "/",
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
      let index = state.list.findIndex((m) => m.name == item.name);
      if (index < 0) {
        state.list.push(item);
      }
    },
  },
  actions: {},
});

export default store;
