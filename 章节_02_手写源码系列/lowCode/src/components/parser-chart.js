import cChart from './cChart.vue'
// import store from '../store'
// import HOC from './hoc.vue' // 装饰器模式 - vue 高阶组件 或者 wrapper
// 进阶 - HOC高阶组件包裹所有组件，套一个逻辑外壳，给其提供基础的通用功能。

export default {
  name: 'CChart',

  components: {
    cChart
  },

  render (h, section, children) {
    console.log(h, section, children)
    const _this = this
    // 传递参数
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          _this.$emit('pickType', 'cChart')
        }
      },
      on: {
        // 视图渲染后
        viewMounted: e => {
          console.log(e)
          // store.dispatch('props/addWhere', {
          //   id: e._uid,
          //   where: e.value
          // })
        }
      }
    }

    return (
      <cChart
        { ..._propsOn }
      ></cChart>
    )
  }
}
