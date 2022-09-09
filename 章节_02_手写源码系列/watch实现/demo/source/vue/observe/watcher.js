import {pushTarget, popTarget} from "./dep"
import {nextTick} from "./nextTick"
import { util } from "../util";

let id = 0;
class Watcher{ // 每次产生一个watcher，都需要一个唯一标识
    /**
     * 
     * @param {*} vm 当前组件的实例
     * @param {*} exprOrFn 表达式或函数
     * @param {*} cb 传入的回调函数vm.$watch('msg', cb)
     * @param {*} opts 其它参数
     */
    constructor(vm, exprOrFn, cb=()=>{}, opts={}) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn; // getter就是new Watcher传入的第二个参数
        } else {
            //若不是fn(msg)，则变为fn
            this.getter = function(){ //相当于从data中取msg
                return util.getValue(vm, exprOrFn);
            }
        }
        if (opts.user) { //标识用户watcher
            this.user = true;
        }
        this.cb = cb;
        this.deps = [];
        this.depsId = new Set();
        this.opts = opts;
        this.id = id++;
        this.immediate = opts && opts.immediate
        //为了得以oldValue，所以加上返回值
        this.value = this.get(); //默认创建一个watcher 会调用自身的get方法
        //第一次立即执行，没有Old值就不传了
        if (this.immediate) {
            console.log(1111111)
            this.cb(this.value)
        }
    }
    get(){
        pushTarget(this); //存入当前watcher，当msg变化时处理
        //为了得以oldValue，所以加上返回值
        let value = this.getter(); //让当前传入的函数执行,即执行渲染
        popTarget(); //移除当前的watcher

        return value;
    }
    addDep(dep){// 同一个watcher不应重复引用
        let id = dep.id;// msg的dep
        if(!this.depsId.has(id)){
            this.depsId.add(id);
            this.deps.push(dep); //让watcher引用当前的dep
            dep.addSub(this);
        }
    }
    update(){ //如果立即调用get会导致页面刷新 需要异步更新
        // this.get();
        console.log(this.id); //查看watcher.id看是否是同一个watcher
        queueWatcher(this);
    }
    run(){ //直接更新
        //此时拿到的是更新后的值 即newValue
        let value = this.get();
        //触发watch
        if (this.value !== value) {
            console.log(2222222)
            this.cb(value, this.value);
        }
    }
}
let has = {}
let queue = []
function flushQueue(){
    // 等待当前
    queue.forEach(watcher => watcher.run())
    // 清空
    has = {}
    queue = []
}
function queueWatcher(watcher){ //对重复的watcher进行过滤
    // debugger
    let id = watcher.id;
    if (!has[id]){
        has[id] = true;
        queue.push(watcher);

        // 延迟清空队列
        // setTimeout(flushQueue,0) //简单点就用此方式
        // 源码是这样
        nextTick(flushQueue);
    }
}


// 渲染、计算属性及watch都要使用Watcher
export default Watcher