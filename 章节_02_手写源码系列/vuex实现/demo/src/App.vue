<template>
  <div id="app">
    <div>num: {{this.$store.state.num}}</div>
    <div>getNum: {{this.$store.getters.getNum}}</div>
    <button @click="add">同步增加Num</button>
    <button @click="minus">同步减少Num</button>
    <button @click="asyncAdd">异步增加Num</button>
    <button @click="syncItAdd">it同步增加</button>
    <div>it-count: {{this.$store.state.it.count}}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    add(){
      this.$store.commit("syncAdd", 10);
    },
    minus(){
      this.$store.commit("syncMinus", 5);
    },
    asyncAdd(){
      this.$store.dispatch("asyncAdd", 15);
    },
    syncItAdd(){
      this.$store.commit("syncAdd", 15);
    }
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
  margin-top: 60px;
}
</style>
