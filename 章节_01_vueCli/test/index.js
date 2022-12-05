const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')
const noDebuggerPlugin = require('../index')

const code = fs.readFileSync(path.resolve(__dirname, './chunktest.js'), 'utf-8')

const result = babel.transform(code, {
  plugins: [
    [
      noDebuggerPlugin
    ]
  ]
})

console.log(result.code)
