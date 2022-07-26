/* 
  观察者模式
*/
class Subject{
  constructor(){
    this.subs = []
  }
  addSub(customer){
    this.subs.push(customer)
  }
  notify(food){
    this.subs.map(customer=>{
      customer.update(food)
    })
    let hasFood = this.subs.some(item=>item.food === food)
    if(!hasFood){
      console.log(`${food}做好了,没有人点这个菜吗`)
    }
  }
}
class Observe{
  constructor(name,food){
    this.name = name
    this.food = food
  }
  update(food){
    if(food === this.food){
      console.log(`${this.name}老铁，你的${this.food}做好了`)
    }
  }
}
// 1 多个观察者对象监听一个主对象
let tom = new Observe('tom', '宫保鸡丁')
let kevin = new Observe('kevin', '糖醋排骨')
let subject = new Subject()
subject.addSub(tom)
subject.addSub(kevin)
// 2 主对象状态改变通知订阅者，让其自己更新数据
subject.notify('宫保鸡丁')
subject.notify('糖醋排骨')
subject.notify('糖醋排骨2')