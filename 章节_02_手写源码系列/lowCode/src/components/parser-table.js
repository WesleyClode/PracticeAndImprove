import cTable from './cTable'

export default {
  name: 'CTable',

  components: {
    cTable
  },

  render (h, section, children) {
    console.log(h, section, children)
    const _this = this
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
