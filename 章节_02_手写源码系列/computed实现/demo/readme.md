## vue两大核心MVVM和DOM-DIFF
- 如何实现数据劫持
- 数组的劫持
- 观察者模式
- 计算属性和watch的区别
- 数据批量更新
- nexttick原理
- 虚拟dom及其作用
- diff实现

## 安装依赖包
cnpm i webpack webpack-cli webpack-dev-server html-webpack-plugin -S

## 配置webpack目录
- npm run build 编译
- npm run start 启动
启动完了，在index.js写代码可自动加载运行

## 本地创建source目录并改变模块查找方式
- 在index.js使用import Vue from 'vue'就可以找到source/vue中模块

## vue核心==数据劫持
## 劫持数据
- vue/index.js主文件
- vue/observe/index.js各种初始化工作
- vue/observe/observer.js数据劫持--观察者
- 当执行console.log(vm._data.msg)可以看到数据拦截日志
- 使用proxy简化数据访问，如vm.msg

## 劫持原生方法
- vue/observe/array.js劫持array中的原生方法
- vue/observe/observer.js构造器中添加数组的判断
- 再使用push方法则可以看到劫持日志了
- 问题：push对象再访问却不会劫持？
- 在array.js中添加observerArray函数处理push对象劫持
- 问题：push对象再修改对象，如vm.arr[3].a=100不触发set
- 需要在Observer对象构造器中添加数组项的递归劫持
- 缺点：不能直接改变索引不会被检测到；[1,2].length--不能改变数组长度
- args.slice(2); //获取新增的内容
- let arr = [1,2,3];
- arr.splice(0,1,{a:1}); //把第0项目删除并添加{a:1}
- console.log(arr)
1:34

## 模板编译
- 模板编译，数据替换
- 使用正则匹配模板中{{xxx}}内容并替换
- 添加watcher.js文件以及index.js中的compier编译方法
2:26

## 数据驱动更新-发布订阅模式
- 初始化时会给data中每个响应式属性生成一个dep和一个watcher(vue2中是一个组件对应一个wathcer)
- 一个属性有多个vm.xxx=xxx则会生成多个watcher?
- 每个响应式属性只有一个dep，一个dep可包括多个watcher(渲染watcher和watch方法).
- 一个watcher中也可包括多个dep(对a,b,c等属性的取值的dep)
- 一个组件中可包括多个{{xxx}},当其中一个修改了就需要用diff算法判断哪些需要修改。
- 添加dep.js用于收集渲染watcher, 主要作用是发布和订阅
- 一个{{msg}}可能对应多个watcher
- index.js默认执行一个watcher,而watcher里默认执行传入的fn,即渲染页面
- 渲染过程：index.js--new Watcher--get--wathcer.pushTarget--watcher.getter--
  observer.get--把Dep.target添加到dep--watcher.popTarget
- 更新过程：observer.set--dep.notify--所有watcher.update--wathcer.pushTarget--
  watcher.getter--observer.get--把Dep.target添加到dep--watcher.popTarget
- defineReactive对每一个属性都进行重新用defineProperty, 每一个属性用闭包引用了Dep
- data初始化劫持及dep实例化过程：
  observer遍历data，msg-id0, school-id1,school.name-id2,school.age-id3,arr-id4,arr[3]-id5
0:39

## 模板异步批量更新
- 问题：使用vm.msg=''修改属性并不会更新模板？
- util添加一个自定义属性expr，用于多次更新模板
- 若多次vm.msg修改，则会导致多次update, 同时也会有多个watcher
- 因每个msg的dep相同，所以多个watcher也是相同的，那可以使用queueWatcher异步处理，过滤相同watcher.id
- 这样就只有一个watcher，也只会有一次update执行，由于vm.msg已经更新了data中数据，所以update是更新最后一次msg的修改

## 数组更新
- 问题：数组push后，页面上并没有更新？若修改数组中的{}是可以更新的
- 因为push方法在array.js中有拦截，若push数据会触发observerArray
- 可以在observerArray手动调用notify更新数据，但push还是不行，还要再收集依赖
- 即在data初始化时，判断若是数组或对象，则再在返回数组的dep上收集依赖，对象已经收集了，若再收集会在addDep中忽略
- 问题：observer第22行不递归也可以vm.arr[1].push(2)？？？
2：07

## watch实现
- 也是通过Watcher实现，并且还添加私有属性，如user，标识是用户自定的watcher.
- 原理：在Watcher中先存一个值，当数据修改后再次get时，与先存的值进行比较，若不等则执行cb

## computed实现
- 原理是把函数当属性用，即把函数名取出来重新defineProperty成属性，当取值时触发该函数执行
- 计算属性函数默认不执行，此时该属性与渲染watcher无关，与计算属性watcher关联有关
- 问题：修改它引用属性时不更新？
- 解决：需要在取计算属性值时再关联到渲染watcher上
- watcher三类：渲染watcher、用户watcher、计算属性watcher
3:00