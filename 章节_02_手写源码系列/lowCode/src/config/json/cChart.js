const defaultJson = {
  type: 'cChart',
  placeholder: '请输入',
  sections: []
}

const json = {
  key: 'cChart',
  name: 'cChart',
  default () {
    return Object.assign({
      // 个性化加入的
    }, defaultJson)
  },
  panelCore: {
    model: [{
      field: 'placeholder',
      title: 'placeholder',
      type: 'el-input'
    }]
  }
}

export default json
