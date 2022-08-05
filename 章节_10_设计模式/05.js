/* 
  适配器模式
  把原本不适合的数据转换为适合的数据
  例子：将原本不适合的手机接口转为适合的手机接口
*/
class IphoneX{
  constructor(){
    this.interface = '平接口'
  }
}
class Adapter{
  constructor(oldInter, newInter){
    this.iphone = new IphoneX() //初始化实例
    this.oldInter = oldInter
    this.newInter = newInter
  }
  getOldInter(){
    return this.oldInter
  }
  getInter(){
    this.translate(this.iphone, this.newInter) //模拟转接口，进行转换逻辑的代码写在这个方法里
    return this.newInter
  }
  translate(iphone, newInter){
    console.log(`${iphone.interface}---->${newInter} `)
  }
}
let test = new Adapter('圆接口','平接口')
console.log(test.getOldInter())
console.log(test.getInter())