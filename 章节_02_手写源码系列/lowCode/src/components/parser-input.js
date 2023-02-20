import cInput from './cInput.vue'
// import store from '../store'

export default {
  name: 'CInput',

  components: {
    cInput
  },

  render (h, section, children) {
    console.log(h, section, children)
    const _this = this
    // 传递参数
    const _propsOn = {
      nativeOn: { // 作用于组件，可以直接触发
        click: e => {
          e.stopPropagation()
          _this.$emit('pickType', 'cInput')
        }
      },
      on: { // 给组件绑定事件，通过cInput里的emit触发
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
      <cInput
        { ..._propsOn }
      ></cInput>
    )
  }
}
