let arr = [1,2,3,4,5]
// let _arr = arr.map((item,index)=>{
//   item = item*2
//   return item
// })
// console.log(_arr)
/**
 * 手写map流程
 * 数组的原型里自定义个名字testMap
 * 某某.testMap时，通过slice得到一个新值，为了不修改老值
 * for遍历新值，arr[i]是item, i是index, 
 * 执行回调，传入item和i，值push到data中
 * 返回最后的data
 */

Array.prototype.testMap = function(fn){
  // 此处Array.prototype.slice.call等于是为了用数组里的slice，因为slice不会修改数组，而是返回一个子数组
  // 某某.testMap，this就是这个某某的值
  let arr = Array.prototype.slice.call(this)
  let data = []
  for (let i = 0; i < arr.length; i++) {
    data.push(fn.call(this,arr[i],i))
  }
  return data
}

let _arr = arr.testMap((item,index)=>{
  item = item*2
  return item
})
console.log(_arr)