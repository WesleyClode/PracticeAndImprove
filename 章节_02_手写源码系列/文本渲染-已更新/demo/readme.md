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
- 添加watcher.js文件以及index.js中的compier编译方法
2:26

