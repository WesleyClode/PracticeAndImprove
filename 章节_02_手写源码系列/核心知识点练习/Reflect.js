let obj = {
  name: '李四',
  age: '12',
  get info(){ // 等于 getter方法，this会绑定receiver，调用info会直接返回方法return的值
    return this.name + this.age
  },
  set info(val){ // 等于setter方法，this会绑定receiver, 修改的是receiver里的属性
    return this.age = val
  }
}

/** Reflect.get 取值 */ 
// let receiver = {
//   name: 'kevin',
//   age: '18',
// }
// console.log(obj.info)  // 李四12
// console.log(Reflect.get(obj, 'info')) // 李四12
// console.log(Reflect.get(obj, 'info', receiver)) // kevin18

/** Reflect.set 存值*/ 
// let receiver1 = {
//   age: 18
// }
// Reflect.set(obj, 'age', 25)
// console.log(obj.age) // 25
// Reflect.set(obj, 'info', 26, receiver1)
// console.log(receiver1.age) // 26

/** Reflect.has 查看属性是不是目标对象里的或者原型里的 xx in xx的函数化*/
// let exam = {
//   name: "Tom",
//   age: 24
// }
// exam.__proto__.test = function(){
//   return '原型里的方法'
// }
// console.log(Reflect.has(exam, 'name')) // true
// console.log(Reflect.has(exam, 'test')) // true
// hasOwnProperty不能判断是否在原型中
// console.log(exam.hasOwnProperty('name')) //true
// console.log(exam.hasOwnProperty('test')) //false

/** Reflect.getPrototypeOf 获取obj的原型*/
// obj.__proto__.test = function(){
//   return 'cscs'
// }
// console.log(Reflect.getPrototypeOf(obj))

/** Reflect.setPrototypeOf 设置obj的原型*/
// let obj2 = {}
// console.log(Reflect.setPrototypeOf(obj2, Array.prototype)) // Array {}

/** Reflect.ownKeys 返回目标对象所有属性*/
// console.log(Reflect.ownKeys(obj)) // [ 'name', 'age', 'info' ]

/** Reflect和proxy 混合使用*/

let exam = {
  name: "Tom",
  age: 24
}
let handler = {
  get: function(target, key){
      console.log(target,"getting "+key);
      return Reflect.get(target,key);
  },
  set: function(target, key, value){
      console.log(target,"setting "+key+" to "+value)
      Reflect.set(target, key, value);
  }
}
let proxy = new Proxy(exam, handler)
proxy.name = "Jerry"
proxy.name
// setting name to Jerry
// getting name
// "Jerry"