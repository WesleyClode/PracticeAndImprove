<template>
  <div ref="chartContent" class="c-chart"></div>
</template>

<script>
import * as echarts from 'echarts'
// 默认按钮组件
export default {
  name: 'cChart',
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    const myChart = echarts.init(this.$refs.chartContent)

    // 绘制
    myChart.setOption({
      title: {
        text: 'zhaowa图'
      },
      tooltip: {},
      xAxis: {
        data: ['zhaowa1', 'zhaowa2', 'zhaowa3', 'zhaowa4']
      },
      yAxis: {},
      series: [{
        name: '班级',
        type: 'bar',
        data: [100, 35, 66, 28, 55]
      }]
    })
  }
}
</script>
<style scoped>
.c-chart {
  width: 100%;
  height: 300px;
  background-color: #fff;
}
</style>
