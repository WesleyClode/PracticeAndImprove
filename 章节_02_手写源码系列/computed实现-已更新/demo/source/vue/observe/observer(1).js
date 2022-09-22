import {observer} from './index'
import Dep from './dep'
import {arrayMethods, observerArray, dependArray} from './array'

export function defineReactive(data, key, value) {
    //相同的属性用的是相同的dep
    //如果value仍是一个object 或 arr
    let childOb = observer(value);  //递归观察 {arr: [1,2]}
    let dep = new Dep(); //dep里可收集依赖，即watcher
    // vue不支持ie8及以下浏览器
    Object.defineProperty(data, key, {
        get(){
            if (Dep.target) {// 这次有值用的是渲染watcher
                debugger
                // 注意：希望存入的watcher不能重复，重复就会多次渲染
                // dep.addSub(Dep.target)
                // 更新：让dep中存watcher,同时让watcher也存入dep，多对多关系
                dep.depend();
                if (childOb) {
                    childOb.dep.depend(); //添加数组的依赖收集
                    //数据递归, 遍历每项，若是对象则再进行观察
                    // dependArray(value)
                }
            }
            console.log(">>get...")
            return value;
        },
        set(newValue){
            console.log(">>set...")
            if (newValue === value) return;
            // 如果新值是object则劫持
            observer(newValue);
            value = newValue;
            // 通知更新
            dep.notify();
        }
    })
    
}

class Observer {
    constructor(data) { //data === vm._data
        // console.log('observer', data)
        // 将用户的数据使用defineProperty重新定义
        this.dep = new Dep(); //仅为数组而设
        // 每个对象 包括数组都有一个__ob__属性即当前observer
        Object.defineProperty(data, "__ob__", {
            get: ()=>this
        })
        if (Array.isArray(data)) {
            //在data上赋于新的原型方法
            data.__proto__ = arrayMethods
            //如果data里有object则劫持数组中的每一项
            observerArray(data)
        }else{
            this.walk(data);
        }
    }
    walk(data) {
        let keys = Object.keys(data);
        for (let i=0; i< keys.length; i++) {
            let key = keys[i];
            let value = data[keys[i]];
            //对每一个属性都进行重新用defineProperty, 每一个属性用闭包引用了Dep
            defineReactive(data, key, value);
        }
    }
}

export default Observer