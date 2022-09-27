import { initState } from "./observe";
import Watcher from "./observe/watcher";
import {compiler, util} from './util'

// console.log('vue')
function Vue(options) {
    // console.log(options)
    this._init(options);
}

Vue.prototype._init = function (options) {
    //初始化，将options存在vm实例中
    let vm = this;
    vm.$options = options;

    //MVVM 重新初始化options中的属性，如data,methods
    // vm.$options.watch存在，流程是初始化数据->数据劫持->数据观察+注册数据监听（里面Dep+wactcher依赖）->watcher接收vm.$options.watch->取$options里的data->走监听里的Dep+wactcher依赖
    // vm.$options.watch不存在，流程是初始化数据->数据劫持->数据观察+注册数据监听（里面Dep+wactcher依赖）->vm.$mount()->watcher接收vm._update()->取$options里的data->走监听里的Dep+wactcher依赖
    initState(vm);

    if (vm.$options.el) {
        vm.$mount();
    }
}

function query(el) {
    if (typeof el === 'string') {
        return document.querySelector(el);
    }
    return el;
}

Vue.prototype._update = function() {
    console.log("_update")
    // 传入的数据，更新视图
    let vm = this;
    let el = vm.$el;

    // 以下逻辑，会用虚拟dom重写的
    // 要循环这个元素，将里面的内容换成我们的数据
    let node = document.createDocumentFragment();
    let firstChild;
    //每次拿到第一个元素就将这个元素放入到文档碎片中
    while(firstChild = el.firstChild){
        node.appendChild(firstChild);
    }
    //此时打开页面会闪一下变成空白，因为appendChild把它移到文档碎片中了
    console.log(node);//打印内存碎片

    // todo 对文本进行替换 匹配{{}}来进行替换
    compiler(node,vm);

    //将内存碎片输出到dom
    el.appendChild(node);

    // 依赖收集，属性变化了，需要重新渲染watcher和dep
}

Vue.prototype.$mount = function() {
    let vm = this;
    let el = vm.$options.el;
    el = vm.$el = query(el); // 当前挂载dom

    //渲染时通过watcher来渲染
    let updateComponent = ()=>{ //可能是更新组件或渲染逻辑
        console.log('watcher run')
        vm._update(); // 更新组件
    }
    new Watcher(vm, updateComponent); //渲染watcher
    // 需要数据修改后自动重新渲染
    
}
Vue.prototype.$watch = function (expr, handler, opts){
    // 创建一个watcher
    // expr--msg  handler--fn  user--用户自定义watcher
    new Watcher(this, expr, handler, {user:true, ...opts});
}

export default Vue

//1.默认会创建一个渲染watcher 这个watcher默认会被执行

//2.pushTarget(this); Dep.target = watcher
// this.getter(); 调用当前属性的get方法，给当前的属性加了一个dep dep.addSub(watcher)
// popTarget();

//3. 当用户修改了属性后，会调用set方法
// dep.notify 会循环所有watcher并调用update方法
