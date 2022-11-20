<br />
<h1 align="center">remove-debugger-plugin</h1>
<p align="center">
<a href="https://github.com/xianzao/remove-debugger-plugin/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/xianzao/remove-debugger-plugin"></a>
<a href="https://github.com/xianzao/remove-debugger-plugin/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/xianzao/remove-debugger-plugin"></a>
</p>

## 目标

移除上线前 debug 代码的 plugins

## 本地vue cli项目中使用方式
案例在仓库中的路径：PracticeAndImprove/章节_01_vueCli/
常用的引入babel的方式
* babel.config.js
* .babelrc
案例使用的是babel.config.js

## 线上安装使用方式

局部安装

```BASH
# 1. 项目中执行
npm install -D remove-debugger-plugin

# 2. babelrc中添加
{
  plugins: ["no-debugging"]
}

这个插件默认会移除 debugger; 和 console 调用。

这个插件可以移除 debugger 、 console 、 alert 和 自定义的调试函数调用和定义。

为保证在开发阶段不转换代码，记得将这个插件只配置在发布阶段：

# babelrc
{
 {
  "env": {
    "publish": {
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": ["no-debugging"]
    }
  }
}

# package.json script
{
  "scripts": {
    "build": "cross-env BABEL_ENV=publish webpack", # 类似
  },
}
```

### options

| Property | Type    | Default | Description                                        |
| -------- | ------- | ------- | -------------------------------------------------- |
| debugger | Boolean | true    | 移除断点调试 debugger 代码                         |
| console  | Boolean | true    | 函数调用                                           |
| alert    | Boolean | null    | 函数调用                                           |
| debugFn  | String  | null    | 指定的自定义调试代码函数（包括调试函数声明和调用） |

## 使用

### 例子

1. 使用默认配置

```js
.babelrc

{
  plugins: [
    [
      "no-debugging"
    ]
  ]
}
```

转换前：

```js
const a = 12
const b = 13

function add(m, n) {
  debugger
  return m + n
}

const result = add(a, b)

console.log(result)
```

转换后：

```js
const a = 12
const b = 13

function add(m, n) {
  return m + n
}

const result = add(a, b)
```

2. 自定义配置
   移除 alert

```js
.babelrc

{
  plugins: [
    [
      "no-debugging",
      {
        alert: true,
        console: false
      }
    ]
  ]
}
```

转换前：

```js
const a = 12
const b = 13

function add(m, n) {
  debugger
  return m + n
}

alert(result)

const result = add(a, b)

console.log(result)
```

转换后：

```js
const a = 12
const b = 13

function add(m, n) {
  return m + n
}

const result = add(a, b)

console.log(result)
```

## NPM

项目更新至 NPM[remove-debugger-plugin](https://www.npmjs.com/package/remove-debugger-plugin)


### 常用概念
## visitor
是一个对象，里面定义了很多方法，用来获取AST中的节点信息
```js
const MyVisitor = {
 Identifier() {
 console.log("Called!");
 }
}
//它⽤于遍历中时，每当在树中遇⻅⼀个 Identifier 的时候会调⽤Identifier() ⽅法
function square(n) {
 return n * n;
}
// 以上⽅法会调⽤四次Identifier
// Identifier是 转换 时生成的标识
path.traverse(MyVisitor);
Called!
Called!
Called!
Called!
// 像这样
- FunctionDeclaration
 - Identifier (id)
 - Identifier (params[0])
 - BlockStatement (body)
 - ReturnStatement (body)
 - BinaryExpression (argument)
 - Identifier (left)
 - Identifier (right)

```

## path
是一个对象，包含了父节点和子节点的信息和在AST树中的位置，因为存在节点之间的关系，所以说是节点间的路径


## scope
js中分为全局作用域和局部作用域

坑点：编写AST或者跨端时候要注意作用域结构，不要破坏原有的作用域
```js
// 规范的作用域结构
{
 path: path,                 // 当前路径
 block: path.node,           // 当前作用域块
 parentBlock: path.parent,   // 父级作用域块
 parent: parentScope,        // 父级作用域
 bindings: [...]             // 绑定关系
}
```


### babel常用模块
## babylon
```js
import * as babylon from "babylon";
const code = `function square(n) {
 return n * n;
}`;
babylon.parse(code);
// Node {
// type: "File",
// start: 0,
// end: 38,
// loc: SourceLocation {...},
// program: Node {...},
// comments: [],
// tokens: [...]
// }
```

## babel-traverse
```js
import * as babylon from "babylon";
import traverse from "babel-traverse";
const code = `function square(n) {
 return n * n;
}`;
const ast = babylon.parse(code); //解析code
// 遍历ast节点
traverse(ast, {
 enter(path) {
 if (
 path.node.type === "Identifier" &&
 path.node.name === "n"
 ) {
 path.node.name = "x"; //把code里的n换成x
 }
 }
});
```

## babel-types
基于AST的一个工具库
```js
import traverse from "babel-traverse";
import * as t from "babel-types";
traverse(ast, {
 enter(path) {
 if (t.isIdentifier(path.node, { name: "n" })) {
 path.node.name = "x";
 }
 }
});
```

## babel-generator
把AST生成代码，同时保留sourcemap(项目中代码报错可以定位到具体行，就是通过AST，因其有具体代码行信息)
```js
import * as babylon from "babylon";
import generate from "babel-generator";
const code = `function square(n) {
 return n * n;
}`;
const ast = babylon.parse(code);
generate(ast, {}, code);
// {
// code: "...",
// map: "..."
// }
```


## AST编译三步走
解析 babylon.parse
转换 babel-traverse 遍历后转后
生成 babel-generator
