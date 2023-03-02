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
    /**
     * 因为渲染引擎（renderEngine文件）的startRender里用了call调用对应组件的render,
     * 所以此处 _this 是渲染引擎的实例
     * 所有直接_this.$emit，渲染引擎可以直接接收
     */ 
    // 传递参数
    const _propsOn = {
      nativeOn: { // 作用于组件，可以直接触发, 等于@click.native
        click: e => {
          e.stopPropagation()
          console.log(e)
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
        },
        testEvent(e){
          // 此处可正常打印cInput.vue文件给parser-input.js的数据
          console.log(e)
          _this.$emit('inpuChange', e)
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
