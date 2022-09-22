const { on } = require("events");
const { resolve } = require("path");

const SUCCESS = "fulfilled"
const FAILURE = "rejected"
const PENDING = "pending"

function resolvePromise(value, resolve, reject){
    if (typeof value === 'function' || typeof value === "object") {
        try {
            let then = value.then;
            if (typeof then === 'function') {
                then.call(value, x=>{
                    // resolve(x)
                    resolvePromise(x, resolve, reject); //递归
                }, err=>{
                    reject(err)
                })
            }else{
                resolve(value)
            }
        }catch(e){
            reject(e)
        }
    }else{
        resolve(value); //返回普通值
    }
}

class Promise {
    constructor(executor) { //
        this.status = PENDING; //初始状态
        this.value = undefined;  //保存成功态数据
        this.reason = undefined; //保存失败态数据
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if (this.status === PENDING) {
                this.status = SUCCESS;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn=>fn())
            }
        }
        let reject = reason => {
            if (this.status === PENDING) {
                this.status = FAILURE;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        try {
            executor(resolve, reject);
        }catch(e){
            reject(e)
        }
    }
    then(onFulfilled, onRejected){ //成功回调  失败回调
        let p = new Promise((resolve, reject)=>{
            if (this.status === SUCCESS) {
                let v = onFulfilled(this.value)
                resolvePromise(v, resolve, reject)
            }
            if (this.status === FAILURE) {
                let v = onRejected(this.reason)
                resolvePromise(v, resolve, reject)
            }
            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(()=>{
                    let v = onFulfilled(this.value)
                    resolvePromise(v, resolve, reject)
                })
                this.onRejectedCallbacks.push(()=>{
                    let v = onRejected(this.reason)
                    resolvePromise(v, resolve, reject)
                })
            }
        })
        return p;
    }
}

module.exports = Promise