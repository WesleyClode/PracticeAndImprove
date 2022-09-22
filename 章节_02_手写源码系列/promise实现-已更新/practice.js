// 普调写法
let fs = require('fs')
// fs.readFile(__dirname+'/data/index.txt', (err, data)=>{
//   console.log(data.toString())
//   fs.readFile(__dirname+data.toString(), (err, data)=>{
//     console.log(data.toString())
//     fs.readFile(__dirname+data.toString(), (err, data)=>{
//       console.log(data.toString())
//     })
//   })
// })


// 更优雅的写法,promise
// let p = new Promise((resolve, reject)=>{
//   fs.readFile(__dirname+'/data/index.txt', (err, data)=>{
//     // console.log(data.toString())
//     resolve(data.toString())
//   })
// })
// let p1 = p.then((data)=>{
//   console.log(data)
//   return new Promise((resolve, reject)=>{
//     fs.readFile(__dirname+data, (err, data)=>{
//       // console.log(data.toString())
//       resolve(data.toString())
//     })
//   })
// })
// let p2 = p1.then((data)=>{
//   console.log(data)
//   return new Promise((resolve, reject)=>{
//     fs.readFile(__dirname+data, (err, data)=>{
//       // console.log(data.toString())
//       resolve(data.toString())
//     })
//   })
// })
// p2.then((data)=>{
//   console.log(data)
// })


// let Promise = require('./practicePromise') // 初始版
let Promise = require('./practicePromise2')   // 当then里返回Promise时处理
let p = new Promise((resolve, reject)=>{
  fs.readFile(__dirname+'/data/index.txt', (err, data)=>{
    // console.log(data.toString())
    resolve(data.toString())
  })
})
let p1 = p.then((data)=>{
    console.log(data,'then')
    return new Promise((resolve,reject)=>{
      resolve('test')
    })
})
p1.then(data=>{
  console.log(data)
})

let n = 0
let requestFn = (url) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务${url}完成`)
    }, 1000 * n++) // 因为http 1.2 tcp中的网络请求是同步的，一个执行完才能走另一个，所以1000 * n++
  }).then(res => {
    console.log('外部逻辑', res)
  })
}


let n1 = 0
let requestFn1 = (url) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务${url}完成`)
    }, 1000 * n1++) // 因为http 1.2 tcp中的网络请求是同步的，一个执行完才能走另一个，所以1000 * n++
  })
}
let raceTest = p1.race([requestFn1('baidu.com'),requestFn1('ali.com'),requestFn1('tencen.com')])
raceTest.then((data)=>{
  console.log(data)
})