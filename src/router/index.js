import Vue from "vue";
import VueRouter from "vue-router";

// 解决 vue-router 升级导致的 Uncaught(in promise)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

//注册路由
Vue.use(VueRouter);

const Main = () => import("views/Main");
const Home = () => import("views/home/Home");
const User = () => import("views/user/User");
const Dept = () => import("views/dept/Dept");
const Apply = () => import("views/apply/Apply");
const AttManager = () => import("views/attManager/AttManager");
const Approver = () => import("views/approver/Approver");
const Setting = () => import("views/setting/Setting");
const AttendanceList = () => import("views/attendanceList/AttendanceList");
const Calender = () => import("views/calender/Calender");
const Login = () => import("views/login/Login");
//配置路由映射
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/main",
    redirect: "/home",
    component: Main,
    children: [
      {
        path: "/home",
        component: Home,
      },
      {
        path: "/user",
        component: User,
      },
      {
        path: "/dept",
        component: Dept,
      },
      {
        path: "/attManager",
        component: AttManager,
      },
      {
        path: "/apply",
        component: Apply,
      },
      {
        path: "/approver",
        component: Approver,
      },
      {
        path: "/setting",
        component: Setting,
      },
      {
        path: "/attendanceList",
        component: AttendanceList,
      },
      {
        path: "/calender",
        component: Calender,
      },
    ],
  },
];

//实例化路由对象
const router = new VueRouter({
  routes,
  mode: "history",
});

//导出路由对象
export default router;
