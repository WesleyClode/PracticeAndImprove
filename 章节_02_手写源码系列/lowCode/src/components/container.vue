<template>
  <!-- 区域组件 -->
  <div class="container" @dragover.prevent @drop.stop="handleDrop">
    <!-- 支持嵌套 -->
    <slot></slot>
  </div>
</template>

<script>
// 默认输入组件
export default {
  name: 'conTainer',
  props: {
    jsonSchema: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleDrop (e) {
      this.$emit('drop', e, this)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('viewMounted', this)
    })
  }
}
</script>

<style scoped>
  .container {
    border: 1px solid #ccc;
    background-color: #eee;
    min-height: 300px;
    width: 100%;
  }
</style>
