<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        ><div style="width: 190px; font-size: 18px">
          乾坤DEMO~
        </div></el-menu-item
      >
      <template v-for="item in microApps">
        <el-menu-item
          v-if="!item.children"
          @click="goto(item)"
          :index="item.activeRule"
          :key="item.activeRule"
          >{{ item.name }}</el-menu-item
        >
        <el-submenu v-else index="2" :key="item.activeRule">
          <template slot="title">{{ item.name }}</template>
          <el-menu-item index="2-1" disabled>选项1</el-menu-item>
          <el-menu-item index="2-2" disabled>选项2</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1" disabled>选项1</el-menu-item>
            <el-menu-item index="2-4-2" disabled>选项2</el-menu-item>
          </el-submenu>
        </el-submenu>
      </template>
      <div class="userinfo">主应用的state：{{ JSON.stringify(state) }}</div>
    </el-menu>
  </div>
</template>
<script>
import store from "@/store";
import microApps from "../micro-apps";
export default {
  data() {
    return {
      activeIndex: "/sub-vue",
      microApps,
    };
  },
  computed: {
    state() {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')
      // 返回所有的state则不需添加参数
      return store.getGlobalState();
    },
  },
  created() {
    //切换子路由不会加载这里，这里只有页面刷新后，才会走 一次
    console.log("created开始");
    this.bindCurrent();
  },
  mounted() {
    console.log("mounted开始");
    this.listenRouterChange(); //用于子应用间互相跳转
  },
  methods: {
    bindCurrent() {
      const path = window.location.pathname;
      console.log(path);
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.activeIndex = path;
        console.log(path);
      }
    },
    goto(item) {
      history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.name
    },
    listenRouterChange() {
      //子应用互相跳转，目前看好像不需要这
      const _wr = function (type) {
        const orig = history[type];
        return function () {
          const rv = orig.apply(this, arguments);
          const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _wr("pushState");
      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popstate", this.bindCurrent);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("pushState", this.bindCurrent);
        window.removeEventListener("popstate", this.bindCurrent);
      });
    },
  },
};
</script>
