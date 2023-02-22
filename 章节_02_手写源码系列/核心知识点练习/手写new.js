/**
 * 
 * @param {function} ctor 
 * @param  {...any} args 
 * 创建一个空对象，将ctor的原型 指向 新对象的原型上
 * apply 绑定自身属性
 */
function newFactory(ctor, ...args) {
    if (typeof ctor !== 'function') {    
        throw Exception('构造函数必须为函数'); 
    }
    // Object.create: 把现有的对象作为新对象的原型
    // var obj = Object.create({name: 'johan', age: 23}) 
    // obj.__proto__ 是 {name: 'johan', age: 23}

    // prototypeObj的原型 是 ctor.prototype
    let prototypeObj = Object.create(ctor.prototype)
    // res是test函数的返回值
    let res = ctor.apply(prototypeObj, args); // 把ctor的自身属性也继承过来 
    // 显示ctor的原型和自身属性都在prototypeObj里了
    console.log(prototypeObj)
    return (typeof res === 'object'  && res !== null) ? res : prototypeObj;
}
newFactory(test, 222)

function test() {
    this.type = 'type88'
    return 888
}