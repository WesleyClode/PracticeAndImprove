/**
 * 缓存算法
 * put 进行压栈
 * get 进行读取
 * 缓存达到上限时，调用put，先删除 最近少使用的数据
 * get读取时间，默认是常用的，移到 最近常使用的数据
 */

// let test = new Map([
//   ['name', 1],
//   ['age', 2]
// ])
// console.log(Array.from(test.keys()))
// console.log(Array.from(test.keys())[0])
// console.log(test.keys().next().value)
// let a = test.keys().next().value
// test.delete(a)
// console.log(test)

class LRUCache {
  constructor(n){
    this.size = n  //栈里存储数量
    this.data = new Map()
  }
  put(domain, info){
    //如果有重复的key，删除已有的，再新增
    if(this.data.has(domain)){
      this.data.delete(domain)
      this.data.set(domain, info) // set是于数组末尾新增
      return
    }
    if(this.data.size >= this.size){
      // 删除 最近少使用的数据
      let firstKey = this.data.keys().next().value
      this.data.delete(firstKey)
    }
    this.data.set(domain, info)
  }
  get(domain){
    // 查询当前数组是否有此key
    if(!this.data.has(domain)){
      return false
    }
    // 默认是常用的，移到 最近常使用的数据
    // 先删除 再新增即可
    let info = this.data.get(domain)
    this.data.delete(domain)
    this.data.set(domain, info) // set是于数组末尾新增
    return info
  }
}

let cache = new LRUCache(3) 
cache.put('baidu.com', '百度')
cache.put('sina.com', '新浪')
cache.put('ali.com', '阿里')
cache.put('tencent.com', '腾讯')
cache.get('sina.com')
console.log(cache)