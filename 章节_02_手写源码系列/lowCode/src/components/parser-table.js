import cTable from './cTable'

export default {
  name: 'CTable',

  components: {
    cTable
  },

  render (h, section, children) {
    console.log(h, section, children)
    const _this = this
    _this.$on('inpuChange',(v)=>{
      console.log('表格组件配置器：',v)
    })
    // 传递参数
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          _this.$emit('pickType', 'cTable')
        }
      }
    }

    return (
      <cTable
        { ..._propsOn }
      ></cTable>
    )
  }
}
