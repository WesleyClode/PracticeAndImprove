import container from './container'

export default {
  name: 'Container',

  components: {
    container
  },

  render (h, section, children) {
    const _this = this
    // 传递参数
    const _props = {
      props: {
        jsonSchema: section
      }
    }
    const _propsOn = {
      nativeOn: {
        click: e => {
          console.log(e)
          _this.$emit('pickType', 'container')
        }
      },
      on: {
        dragover: _this.handleDragOver,
        drop: _this.handleDrop
      }
    }

    return (
      <container
        { ..._props }
        { ..._propsOn }
      > { children } </container>
    )
  }
}
