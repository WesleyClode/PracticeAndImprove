<template>
  <el-table
    :data="tableData">
    <el-table-column
      prop="data"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="class"
      label="班级"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
// 默认输入组件
export default {
  name: 'cTable',
  data () {
    return {
      tableData: [{
        date: '2022-07-03',
        class: 'zhaowa',
        address: 'BJC'
      }, {
        date: '2022-07-03',
        class: 'zhaowa',
        address: 'BJC'
      }, {
        date: '2022-07-03',
        class: 'zhaowa',
        address: 'BJC'
      }, {
        date: '2022-07-03',
        class: 'zhaowa',
        address: 'BJC'
      }, {
        date: '2022-07-03',
        class: 'zhaowa',
        address: 'BJC'
      }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('viewMounted', this)
    })
  }
}
</script>
