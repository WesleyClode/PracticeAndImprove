import store from "./store";
/*
  routerBase设定/或者不设，子应用的根路由是/，这时，子路由再定义个sub-vue，那么/sub-vue就是子应用的sub-vue路由对应模块
  routerBase设定/sub-vue，子应用的根路由是/sub-vue，那么/sub-vue就是子应用的首页
*/
const microApps = [
  {
    name: "子应用-Vue",
    entry: "http://localhost:8081",
    container: "#subApp",
    activeRule: "/sub-vue",
    props: {
      routerBase: "/sub-vue", // 下发路由给子应用，指定子应用根路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
    },
  },
];

export default microApps;
