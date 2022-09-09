let fs = require('fs')
const { resolve } = require('path')
// fs.readFile(__dirname+'/data/index.txt', (err, data)=>{
//     console.log(data.toString())
//     fs.readFile(__dirname+data.toString(), (err, data)=>{
//         console.log(data.toString())
//         fs.readFile(__dirname+data.toString(), (err, data)=>{
//             console.log(data.toString())
//         })
//     })
// })

let Promise = require('./MyPromise')
let p = new Promise((resolve, reject)=>{
    fs.readFile(__dirname+'/data/index.txt', (err, data)=>{
        // console.log(data.toString())
        // reject("error")
        resolve(data.toString())
    })
})
// p.then(data=>{
//     console.log(data)
// })
let p1 = p.then(data=>{
    console.log(data)
    return new Promise((resolve, reject)=>{
        fs.readFile(__dirname+data.toString(), (err, data)=>{
            // console.log(data.toString())
            // resolve(data.toString())
            resolve(new Promise((resolve, reject)=>{
                fs.readFile(__dirname+data.toString(), (err, data)=>{
                    // console.log(data.toString())
                    resolve(data.toString())
                })
            }))
        })
    })
}, err=>{
    console.log("err:",err)
})
p1.then(data=>{  //普通值
    console.log(data)
})
// let p2 = p1.then(data=>{
//     console.log(data)
//     return new Promise((resolve, reject)=>{
//         fs.readFile(__dirname+data.toString(), (err, data)=>{
//             // console.log(data.toString())
//             resolve(data.toString())
//         })
//     })
// })
// p2.then(data=>{
//     console.log(data)
// })
