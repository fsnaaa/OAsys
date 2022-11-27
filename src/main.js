import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import "api/mock";

import {Button,Select,Container,Aside,
  Header,Main,Menu,Submenu,MenuItemGroup,
  MenuItem,Breadcrumb,BreadcrumbItem,
  Dropdown,DropdownMenu,DropdownItem,Tag,
  Row,Col,Card,Table,TableColumn,Dialog,Form,
  FormItem,Input,Option,DatePicker,TimePicker,
  Switch,CheckboxGroup,Checkbox,RadioGroup,
  Radio,Pagination,Message,DescriptionsItem,
  Descriptions,Upload
  // MessageBox
} from "element-ui";
Vue.use(Upload);
Vue.use(Descriptions);
Vue.use(DescriptionsItem);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Select);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
// Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$message=Message;

Vue.config.productionTip = false;

//导入Cookie插件
import Cookie from "js-cookie";

//设置全局路由守卫
router.beforeEach((to, from, next) => {
  //console.log("1  >> " + to.path + " " + from.path);
  const token = Cookie.get("token");
  if (!token && to.path != "/login") {
    next({
      path: "/login",
    });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
