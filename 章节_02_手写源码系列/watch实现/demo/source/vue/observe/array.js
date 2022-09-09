import { observer } from "./index";  //等价于 from "."

// 原生方法劫持
// 先获取老数组的方法，只改写7个方法
let oldArrayProtoMethods = Array.prototype

// 拷贝一个新对象， 可以查找到老的方法
export let arrayMethods = Object.create(oldArrayProtoMethods);

let methods = [
    'push',
    'shift',
    'pop',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

export function observerArray(inserted) {
    for(let i=0; i<inserted.length; i++) {
        observer(inserted[i])
    }
}

export function dependArray(value) {
    for(let i=0; i<value.length; i++) {
        let currentItem = value[i];
        currentItem.__ob__ && currentItem.__ob__.dep.depend();
        if (Array.isArray(currentItem)){
            dependArray(currentItem); //数组递归
        }
    }
}

methods.forEach(method => {
    arrayMethods[method] = function(...args) {
        console.log('>>调用劫持的原生方法：'+method)
        let res = oldArrayProtoMethods[method].apply(this, args);

        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args; break;
            case 'splice':
                inserted = args.slice(2); //获取新增的内容
            default:
                break;
        }
        // 若有数据添加就劫持
        if (inserted) observerArray(inserted);

        // 通知数据更新
        this.__ob__.dep.notify();

        return res;
    }

})