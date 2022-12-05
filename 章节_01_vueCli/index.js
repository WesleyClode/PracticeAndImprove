const chainGet = require('chain-get')
const defaultOptions = {
  debugger: true,
  console: true
}

const visitor = {
  ObjectExpression(path, state) {
    if (state) {
      if (path.node.properties) {
        // console.log(path.node.properties)
        if (Array.isArray(path.node.properties) && path.node.properties.length > 0 && path.node.properties[0].value) {
          console.log(path.node.properties[0].value)
          if (path.node.properties[0].value.value) {
            if (typeof path.node.properties[0].value.value === 'string' && path.node.properties[0].value.value.includes('el-')) {
              let str = path.node.properties[0].value.value
              path.node.properties[0].value.value = str.replace(/(el-)/g, 'gp-')
              console.log(path.node.properties[0].value.value)
            }
          }
        }
      }
    }
  }
}

module.exports = function () {
  return {
    visitor
  }
}
