<template>
  <el-input v-model="value" placeholder="请输入" @input="inputSomething"></el-input>
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
  },
  methods:{
    inputSomething(){
      this.$emit('testEvent','vue文件给parser-vue.js的数据:' + this.value)
    }
  }
}
</script>
