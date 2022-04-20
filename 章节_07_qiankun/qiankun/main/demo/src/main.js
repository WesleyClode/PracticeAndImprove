import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import microApps from "./micro-apps";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入nprogress的css 加载动画区域
import 'nprogress/nprogress.css'
/*进阶部分开始 主子通信*/
import { initGlobalState } from 'qiankun';

// 初始化 state
const initialState = {
  user: {} // 用户信息
};
const actions = initGlobalState(initialState);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('主应用打印的参数:',state, prev);
});
actions.setGlobalState({user:{name:'张三'}});
actions.offGlobalStateChange();
/*进阶部分结束 主子通信*/
Vue.config.productionTip = false;
Vue.use(ElementUI);

const instance = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 加载动画区域开始
// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading
    console.log(instance.$children)
  }
}
// 给子应用配置加上loader方法
let apps = microApps.map(item => {
  return {
    ...item,
    loader
  }
})
registerMicroApps(apps);
// 加载动画区域结束
setDefaultMountApp('/sub-vue')
// 启动 qiankun
start();
