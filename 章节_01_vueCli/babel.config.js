const noDebuggerPlugin = require('./index.js')
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    [
      noDebuggerPlugin,
      {
        console:true,
        debugger:true
      }
    ]
  ]
}
