/**
 * 手写call实现逻辑
 */
const o1 = {
  text: 'o1',
  fn: function(...rest) {
      console.log(this.text, ...rest)
  }
}
const o2 = {
  text: 'o2',
}
/**
 * 
 * @param {*} context 
 * @param  {...any} reset 
 */
function called(context, ...reset){
  // 因为fn.called, 所以this指向fn || this === fn
  context.fn = this
  if(context){
    let result = context.fn(...reset)
    delete context.fn
    return result
  }else{
    this(...reset)
  }
}
// 因为o1是普通对象，o1.fn.called这种写法等同于函数对象的xx.prototype.xxx
Object.prototype.called = called
o1.fn.called(o2, '今天是', '十月九号')