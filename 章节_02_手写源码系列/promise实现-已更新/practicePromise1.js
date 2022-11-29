// 当then里返回Promise时处理

const SUCCESS = "fulfilled"
const FAILURE = "rejected"
const PENDING = "pending"

function resolvePromise(v, resolve, reject){
  if(typeof v === 'function' || typeof v === 'object'){ // promise | func | object
    try {
      let then = v.then // v是使用then里返回的promise
      if(typeof then === 'function'){ // promise.then
        then.call(v, x=>{ //通过promise里then来取到resolve里的值，存构造函数中，用于后面的then取
          resolve(x)
        }, err=>{
          reject(err)
        })
      } else {
        resolve(v)
      }
    } catch (error) {
      reject(error)
    }
  } else { // 针对then里 return string | number | bool 
    resolve(v) //resolve的作用是值存构造函数，下次then去取，上面都是
  }
}

class Promise{
  constructor(executor){
    this.value = undefined
    this.reason = undefined
    this.status = PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    try {
      let resolve = (val)=>{
        if(this.status === PENDING){//只能从PENDING变为xxx(状态一旦修改，不可再改)
          this.value = val
          this.status = SUCCESS
          this.onFulfilledCallbacks.map(item=>item())
        }
      }
      let reject = (reason)=>{
        if(this.status === PENDING){//只能从PENDING变为xxx(状态一旦修改，不可再改)
          this.reason = reason
          this.status = FAILURE
          this.onRejectedCallbacks.map(item=>item())
        }
      }
      executor(resolve, reject)
    } catch (error) {
      console.log(error)
    }
  }
  then(onFulfilled, onRejected){
    let p = new Promise((resolve,reject)=>{
      if(this.status === SUCCESS){
        let v = onFulfilled(this.value) // v是使用区then里return的promise
        resolvePromise(v, resolve, reject) //处理使用区then里return的promise，promise.then得到使用区resolve的值，然后通过源码区的resolve把值存构造函数，下次then去取
      }
      if(this.status === FAILURE){
        onRejected(this.reason)
      }
      if(this.status === PENDING){
        this.onFulfilledCallbacks.push(()=>{
          let v = onFulfilled(this.value)
          resolvePromise(v, resolve, reject)
        })
        this.onRejectedCallbacks.push(()=>{
          onRejected(this.reason)
        })
      }
    })
    return p
  }
}
module.exports = Promise