/* 
  装饰器模式
  向一个对象添加新的功能，并且不改变其原有结构
  例子：有一个蛋糕，加一点奶油就是奶油蛋糕，
        再加点草莓就是草莓奶油蛋糕，再插一点蜡烛就是生日蛋糕
  奶油，草莓等都是基于蛋糕的装饰
*/
class Circle{
  draw(){
    console.log('画一个圆')
  }
}
class Decorator{
  constructor(circle){
    this.circle = circle
  }
  draw(){
    this.circle.draw()
    this.setBorder()
  }
  setBorder(){
    console.log('给这个圆画线')
  }
}
let circle = new Circle()
circle.draw()
console.log('+++++')
let test = new Decorator(circle)
test.draw()