# 状态管理

## 20:05 正式开始。

redux -- flux (java flux)
mobx 

zustand
recoil

### 状态为什么要管理
### 状态如何管理
### 一个状态管理的库，应该具备哪些能力？


## 什么是状态？
- web 是一个状态机。
  - [  ]
  - fetch.then()  -> [ data ]  1 - 10 
  - fetch("del").then() -> [ newData ] 2 - 11

update placement delete 做了这些操作以后，状态发生了什么变化

- 我们不关系流程，我们关心的永远是，界面处于哪个状态。

- 状态管理，他是一种在 web 的生命周期变化时，数据 model 所呈现出来的 view.
  - 生命周期
  - 状态变化
  - 状态 model ，怎么样来触发 view 变化。
    - Provider 、 Consumer

全局状态管理
- 生命周期，是不是"你打开浏览器，输入地址，访问页面，一直到，到下一次界面刷新的时候"。
- 闭包。

### 我们在设计一个数据的时候，要考虑哪些事情？
软件的本质，其实就是数据的管理。
我们在设计一个状态的时候，实际上就是设计一个数据。设计它的生命周期和作用范围。
数据的生命周期
- DB，用户在，人就在。
- local / session 
- project runtime 
- page 
- component [state, props, data]

### 和 redux 生命周期一致的数据，还有哪些？

```js
(function(module, exports) {
const deps = {};

function create() {
    deps.value = 'hello';
}

module.exports = {
    create,
}

})()
```
### 器，术，道。
器：工具。
术：你用 redux 进行状态管理。
道：状态管理是啥？

以道驭术。

## redux 核心
