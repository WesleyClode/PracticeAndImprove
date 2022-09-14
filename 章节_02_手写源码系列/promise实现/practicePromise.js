// 初始版
const SUCCESS = "fulfilled"
const FAILURE = "rejected"
const PENDING = "pending"

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
    if(this.status === SUCCESS){
      onFulfilled(this.value)
    }
    if(this.status === FAILURE){
      onRejected(this.reason)
    }
    if(this.status === PENDING){
      this.onFulfilledCallbacks.push(()=>{
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason)
      })
    }
  }
}
module.exports = Promise