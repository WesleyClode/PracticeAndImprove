<template>
  <div id="app">
    <div id="nav">
      <div class="main">
          <div class="left">
              <Nav/>
          </div>
          <div class="right">
              <h3>右侧内容</h3>
              <!-- 面包屑区域 -->
              <Breadcumb />

              <!-- TrendComponent.vue组件的衍生内容，缓存组件 -->
              <!-- 刷新页面就没有保存组件高亮的状态了 -->
              <!-- 想刷新页面也保持高亮，用本地存储=>localstorage, sessionstorage -->
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './components/Nav'
import Breadcumb from "./components/Breadcumb";
export default {
  components:{
      Nav,
      Breadcumb
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.main{
    display: flex;
    justify-content: flex-start;
}
.left{
  text-align: left;
  min-width: 150px;
}
.right{
  text-align: left;
  padding-left: 50px;
  flex: 1;
}
.flex{
  display: flex;
}
.jcs{
  justify-content: start;
}
</style>
