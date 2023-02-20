// 组件自动加载
// require.context - 组件库中指定文件的读取
// 1、加载初始组件
let req = require.context('./', false , /[^.]+\.vue/)
// 2. 加载初始化配置
let reqParser = require.context('./', false , /parser-[^.]+\.js/)
/**
 * components和parsers通常来说是一起处理的，但是有时候parsers文件比components文件多，index索引不匹配，所以此处分开
 * componentsName: 当前目录下所有的.vue文件名字汇总成对象
 * req(module): 当前vue文件
 */
// 3. 模块分配
const componentsName = req.keys()
const components = componentsName.reduce((components,module)=>{
  const mod = req(module)
  components[mod.default.name] = mod.default
  return components
},{})
/**
 * parsersName: 当前目录下所有的parser-xxx.js文件名字汇总成对象
 * reqParser(module): parser-xxx.js文件
 */
// 4. 配置分配
const parsersName = reqParser.keys()
const parsers = parsersName.reduce((parsers,module)=>{
  const mod = reqParser(module)
  console.log(mod)
  parsers[mod.default.name] = mod.default
  return parsers
},{})



export {
  components,
  parsers
}