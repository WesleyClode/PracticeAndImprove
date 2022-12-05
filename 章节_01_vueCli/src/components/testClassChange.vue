<template>
  <div class="el-test">
    测试class替换
    期望npm run serve 运行或者打包后 变成gp-test
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
