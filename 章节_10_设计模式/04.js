/* 
  单例模式
  系统中被唯一使用，一个类只有一个实例
*/
class store{
  action(){
    console.log('vue store.')
  }
}
//定义一个静态方法getInstance挂载在store类上,getInstance的值是这个类
store.getInstance = (function(){
  let instance
  return function(){
    if(!instance) {
      instance = new store()
    } 
    return instance
  }
})()
// getInstance里，store已经被实例化过了
let o1 = store.getInstance()
let o2 = store.getInstance()
// console.log(o1.action())
console.log(o1 === o2)
console.log(o1.action() === o2.action())