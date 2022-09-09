/**
 * 用数据劫持修改数据原型
 * 1 拷贝一个干净的原型
 *   Object.create创建的对象是一个干净的对象，括号里的值会挂载到干净对象的原型中
 *   new Object()继承内置对象Object，而Object.create()继承是括号中的对象
 * 2 罗列数组的方法，继承原数组的原型方法
 * 3 自定义数组方法，生成新的原型
 */
let oldArrPrototype = Array.prototype
let newArrPrototype = Object.create(oldArrPrototype)
let methods = ['splice','push']
methods.map(item=>{
  newArrPrototype[item] = function(...agrs){
    // 继承原数据的方法得到值
    let res = oldArrPrototype[item].apply(this,agrs)
    switch (item) {
      case 'push':
        // 自定义push方法的逻辑，额外多添加一个数据'kevin'
        console.log(res,'打印一下')
        test = [...test, 'kevin']
        break;
    
      default:
        break;
    }
    return res
  }
})
let test = ['a','b']
// 把自定义的原型放到目标数组的原型上
test.__proto__ = newArrPrototype
test.push('c')
console.log(test)