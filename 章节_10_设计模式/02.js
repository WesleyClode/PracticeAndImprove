/* 
  代理模式
  男孩和女孩：代理人代替男孩送花给女孩（可以在送花给女孩的过程中做一些自定义的事）
  代理对象可以代替本体对象被实例化，本体对象等到合适时机在实例化
*/
var girl = function(name){
  this.name = name
}
var boy = function(girl){
  this.sendGift = (gift)=>{
    console.log(`hi ${girl.name}, 有个小帅哥送你的${gift}`)
  }
}
var proxy = function(girl){
  this.girl = girl
  this.proxySendGift = (gift)=>{
    new boy(girl).sendGift(gift)
  }
}
let proxyMan = new proxy(new girl('小芳'))
proxyMan.proxySendGift('999朵玫瑰花')