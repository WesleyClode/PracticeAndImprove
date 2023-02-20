<template>
  <div id="app">
    <!-- <testA /> -->
    <main-page />
  </div>
</template>

<script>
import mainPage from './pages/mainPage.vue'
// import testA from './pages/testA.vue'

export default {
  name: 'App',
  components: {
    mainPage,
    // testA
  }
}
</script>

<style>
@import './assets/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
