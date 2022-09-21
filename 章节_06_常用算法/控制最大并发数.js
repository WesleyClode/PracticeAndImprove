/**
 * 控制最大并发数: 异步数组池和并发池交互，异步数组不停减，并发池不停加+并发池执行完的要减，直到异步数组无，并发池无，程序结束
 * 接收最大并发数量，异步方法数组
 * start方法，并发池数量和接收的最大数量比较
 *    小于就while循环，核心逻辑：删除异步数组的头部数据，并且setTask方法把头部数据加到并发池, 执行头部数据方法，执行成功后删除并发池的头部数据
 *    promise.race并发池，发现一个方法执行完，就执行run方法，走上文核心逻辑，run方法递归
 */

 const URLs = [
  'bytedance.com',
  'tencent.com',
  'alibaba.com',
  'microsoft.com',
  'apple.com',
  'hulu.com',
  'amazon.com'
];


class PromisePool {
  constructor(max, fn) {
    this.max = max // 最大并发数
    this.fn = fn // 自定义的请求函数
    this.pool = [] // 并发池
    this.urls = [] // 剩余的请求地址
  }
  start(urls){
    this.urls = urls
    //  只是循环把并发池塞满，没有异步变同步
    while(this.pool.length < this.max){
      let url = this.urls.shift()
      this.setTask(url)
    }
    // 利用Promise.race 方法来获得并发池中某个任务完成的信号
    this.run(Promise.race(this.pool))
  }
  run(race){
    // 每当并发池中完成一个任务，就在塞入一个任务
    race.then(()=>{
      let url = this.urls.shift()
      if(!url){
        console.log('异步数组已经没有方法要执行啦')
        return
      }
      this.setTask(url)
      this.run(Promise.race(this.pool))
    })
    
  }
  setTask(url){
    let task  = this.fn(url)
    // 将任务推入pool并发池中
    this.pool.push(task)
    console.log(url,'加到并发池了，目前并发池长这样', this.pool.length)
    task.then(()=>{
      // 请求结束将该promise任务从并发池中移除
      this.pool.splice(this.pool.indexOf(task),1)
      console.log(url,'执行完了，目前并发池长这样', this.pool.length)
    })
  }
}
// 模拟异步请求函数
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

let test = new PromisePool(3, requestFn)
test.start(URLs)