const defaultJson = {
  type: 'cTable',
  disabled: false,
  placeholder: '请输入',
  sections: []
}

const json = {
  key: 'cTable',
  name: 'cTable',
  default () {
    return Object.assign({
      // 个性化加入的
    }, defaultJson)
  },
  panelCore: {
    model: [{
      field: 'disabled',
      title: '是否禁用',
      type: 'el-checkbox'
    }, {
      field: 'placeholder',
      title: 'placeholder',
      type: 'el-input'
    }]
  }
}

export default json
