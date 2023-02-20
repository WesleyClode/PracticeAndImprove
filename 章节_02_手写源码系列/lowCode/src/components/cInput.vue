<template>
  <el-input placeholder="请输入"></el-input>
</template>

<script>
// 默认输入组件
export default {
  name: 'cInput',
  data () {
    return {
      value: '我是input'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('viewMounted', this)
    })
  }
}
</script>
