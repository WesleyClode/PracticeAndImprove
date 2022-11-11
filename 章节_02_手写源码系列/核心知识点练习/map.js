let arr = [1,2,3,4,5]
// let _arr = arr.map((item,index)=>{
//   item = item*2
//   return item
// })
// console.log(_arr)
// 听说每个人的一生都会遇到一个惊艳了时光 一个温柔了岁月 
Array.prototype.testMap = function(fn){
  // slice不会修改数组，而是返回一个子数组
  let arr = Array.prototype.slice.call(this)
  let data = []
  for (let i = 0; i < arr.length; i++) {
    // fn.call()写法会立即执行fn
    data.push(fn.call(this,arr[i],i))
  }
  return data
}

let _arr = arr.testMap((item,index)=>{
  item = item*2
  return item
})
console.log(_arr)