import {observer} from './index'
import {arrayMethods, observerArray} from './array'

export function defineReactive(data, key, value) {
    // vue不支持ie8及以下浏览器
    Object.defineProperty(data, key, {
        get(){
            console.log(">>get...")
            return value;
        },
        set(newValue){
            console.log(">>set...")
            if (newValue === value) return;
            // 如果新值是object则劫持
            observer(newValue);
            value = newValue;
        }
    })
	//如果value仍是一个object
    observer(value);  //递归观察
}

class Observer {
    constructor(data) { //data === vm._data
        // console.log('observer', data)
        // 将用户的数据使用defineProperty重新定义
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
            defineReactive(data, key, value);
        }
    }
}

export default Observer