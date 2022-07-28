/* 
  工厂模式
  一个厂子，一条生产线，开动生产线得到产出
*/
// 类写法
class Product{
  constructor(name,model){
    this.name = name
    this.model = model
  }
  play(){
    console.log("Mobile:"+this.name+"-"+this.model)
  }
}
class FactoryCreator{
  create(name,model) {
    return new Product(name,model)
  }
}
let factory = new FactoryCreator()
let p = factory.create('iphone',"6")
let p7 = factory.create('iphone',"7")
p.play();
p7.play();

// 函数式写法

var MobileFactory = (function(){
  var Mobile = function(name,model){
    this.name = name
    this.model = model
  }
  Mobile.prototype.play = function(){
    console.log("Mobile:"+this.name+"-"+this.model)
  }
  return function(name,model){
    return new Mobile(name,model)
  }
})()
let p12 = new MobileFactory('iphone',"12")
p12.play()