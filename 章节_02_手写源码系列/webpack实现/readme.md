手写webpack

01 webpack如何工作
- 如何执行打包命令，如npx webpack
- 打包完输出到dist目录，通过html文件引入并在浏览器上运行
- npx 可以执行node_modules目录下的包
- npm init -y 自动生成一个package.json依赖包管理文件
- 分析打包生成的文件bundle.js，明白它的结构，以便自己生成一个这样的文件。
- 实现：执行xx命令，从webpack.config.js打包项目并生成bundle.js结构的文件。

- 分析bundle.js文件
- bundle.js文件结构：(fun(modules){处理模块加载})(indexfile:fun, jdfile:fun)
- 将引用的文件路径补全，如"./jd"转换后是"./jd.js"
- 将require替换成webpack自定义加载函数__webpack_require__
- 参数：{模块相对路径：代码内容}

02 创建打包命令jd-pack
- 创建命令的目录
- 生成package.json
- 生成命令，npm link(把本地目录创建全局快捷方式)
- npx jd-pack---全局---本地

03 查找所有的依赖模块
- 读取代码内容
- 读取模块文件相对路径 要与my.js相对应
- 读取模块文件中子依赖包，首先需要解析当前模块
- 解析结果：是否存在子依赖包dependcies, 解析的源码sourceCode
- 代码解析：vue--->html css js  es6-->es5

04 模块解析
- 使用ast语法树解析 https://astexplorer.net/
- 如const n = 1;--->const x = 1;
- 将代码中的require--->__webpack_require__
- 将require("./jd")--->require("./jd.js")
- 收集dependencies

05 打包输出
- 使用模板生成my.js, 传入的参数必须是动态
- 模板express ejs <%=xxx%> https://ejs.bootcss.com/#install
- 使用fs将生成的文件写入bundle.js, 使用index.html引入打开测试与之前webpack打包输出一致

06 手写loader
- less sass vue...
- 作用：转化，less-->css  vue--js html css
- 使用npx webpack打包less
- 使用自定义的loader less-loader style-loader
- 打包时必须使用自定义loader

07 手写plugin
- 代码加工：压缩，合并，混淆
- tapable--发布订阅处理plugin的事件流程
- 需要一个固定的apply方法，会在编译器中调用

