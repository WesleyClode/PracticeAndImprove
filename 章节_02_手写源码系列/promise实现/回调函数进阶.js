/**
 * 普通回调函数
 * 把一函数当做参数传给then函数，then函数里调用这一函数并传值，这一函数能收到值
 */

function then(cb){
  cb('回调值')
}
then((data)=>{
  console.log('接收:'+data)
})

/**
 * 带点业务的普通回调函数
 */
function source(){
  let des = ''
  then(item=>{
    des = item
  })
  console.log('source得到了:',des)
}
function then(cb){
  // 通过xxx逻辑得到了值100
  cb('then的100')
}
source()
/**
 * 特殊回调函数，回调函数里的参数也是回调函数
 */

let promise = function(cb){
  let resolve = function(value){
    console.log('resolve:', value)
    return 'resolve'
  }
  let reject = function(){
    console.log('reject')
    return 'reject'
  }
  cb(resolve,reject)
}
//promise里传一个函数，函数接收resolve,reject两个函数作为参数
//promise()后，开始走promise的函数体，开始走cb(resolve,reject)，走cb的函数体
//发现resolve('test')，调用函数resolve('test'), resolve函数体开始走，接收值

/**
 * 正常模式
 * 回调函数flag1: function flag1(data){}
 * 回调函数flag2: function flag2(data){}
 * promise(flag1)，申明:function promise(cb)，  赋值：cb('test')， flag1收到data
 * hard模式
 * promise(flag1)，申明:function promise(cb)，  赋值：cb(flag2)， flag1收到一个flag2，赋值：flag2('test')， flag2收到data
 */
promise((resolve,reject)=>{
  // console.log(resolve)
  resolve('test')
})