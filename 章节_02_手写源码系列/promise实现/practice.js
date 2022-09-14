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
let Promise = require('./practicePromise1')   // 当then里返回Promise时处理
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