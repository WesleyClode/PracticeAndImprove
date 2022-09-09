import Observer from "./observer";
import Watcher from "./watcher";
import Dep from "./dep";

// 各种初始化工作
export function initState(vm) {
    // console.log('initState')
    let opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm, opts.computed);
    }
    if (opts.watch) {
        initWatch(vm);
    }
}

//此方法可能初外部使用则导出
export function observer(data) {
    if (typeof data !== 'object' || data == null) {
        return;
    }
    if (data.__ob__) { // 已经被监控过了
        return data.__ob__
    }
    //若是object,则交给Observer对象处理，使用defineProperty
    return new Observer(data);
}

// 代理数据访问 vm.msg == vm._data.msg
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

function initData(vm) {
    let data = vm.$options.data;//用户数据
    //若用户数据是fun则处理成数据
    data = vm._data = typeof data === 'function'? data.call(vm): data || {}
    
    //将vm.msg代理到vm._data.msg上
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    observer(vm._data) //观察数据
}

function initComputed(vm,computed) {
    //将计算属性的配置 放到vm上
    //创建存储计算属性的watcher的对象
    //创建空对象并赋给2个变量
    let watchers = vm._watchersComputed = Object.create(null);
    for (let key in computed) {
        let fn = computed[key]
        //计算属性watcher 默认刚开始这个方法不会执行
        //注意这里传的是一个空函数，而不是一个cb
        watchers[key] = new Watcher(vm, fn, ()=>{}, {lazy: true});
        //为了能让计算属性与data类似 需要重新definedProperty
        Object.defineProperty(vm,key,{
            get: createComputedGetter(vm,key)
        })
    }
}

function createComputedGetter(vm, key){
    let watcher = vm._watchersComputed[key]; //即计算属性watcher
    return function(){
        if (watcher){
            // 为true即页面取值，即调用watcher的get方法
            if(watcher.dirty){
                watcher.evaluate();
            }
            debugger
            if (Dep.target) { //是计算属性watcher,添加dep关联[name.dep age.dep]
                watcher.depend();
            }
            return watcher.value;
        }
    }
}

function initWatch(vm) {
    let watch = vm.$options.watch;
    for(let key in watch){
        let objOrFn = watch[key];
        let handler = objOrFn;
        if (objOrFn.handler) {
            handler = objOrFn.handler;
            createWatcher(vm,key,handler,{immediate: objOrFn.immediate});
        } else {
            createWatcher(vm,key,handler);
        }
    }
}

function createWatcher(vm,key,handler,opts){
    return vm.$watch(key, handler, opts);
}