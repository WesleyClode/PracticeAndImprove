import Observer from "./observer";

// 各种初始化工作
export function initState(vm) {
    // console.log('initState')
    let opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed();
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

function initComputed() {

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