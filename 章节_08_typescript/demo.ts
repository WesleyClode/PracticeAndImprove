/*  

 场景：/bin/sh: ts-node: command not found
 解决：npm install -g ts-node

 1 npm install -g ts-node
   ts-node demo.ts
 2 npm install -g typescript
   tsc demo.ts 可转成 demo.js
 比较：ts-node是编译+执行,tsc是编译

 大纲
 定义变量
 定义数组
 元祖
 定义对象
  接口
  1 ?. 选填
  2 any 接口和继承接口的对象不用在一一对应
 定义函数
 泛型：定义的时候不指定类型，用的时候指定类型
 联合类型：arr3:Array<number|string> ，那么数组中任意位置可以是number可以是string
 函数检查类型
 类型断言
 定义类
 常用内置工具类型（基于接口，写法更方便）
*/

// 定义变量
let a:number = 1 //number小写
let b:number = 2
let c:String = '1'
let d:undefined = undefined
let e:null = null
let f:boolean = true
// console.log(a + b)

// 定义数组
//普通数组
let arr1: number[] = [1,1]
// 泛型数组
let arr2:Array<number> = [1,1]
// 泛型数组+联合类型
let arr3:Array<number|string> = [1,'1']

// 元祖
// 数组合并了相同类型的对象，元祖合并了不同类型的对象
let x: [number,string];
x = [5,'abc'];
let y: [number,string] = [5,'abc'];

//定义对象
interface Phone{
    name: string;//必填
    size: number;//必填
    color?: string;//选填
    action(): void;//必填
    [propName:string]: any;//任意属性
}
let obj:Phone = {
    name: '诺基亚',
    size: 100,
    action:function(){}
} 
let obj1:Phone = {
    name: '诺基亚',
    size: 100,
    action:function(){},
    color:'blue',
    other:'测试'
} 

// 定义函数+泛型
function fuc(a:string,b:string):string[]{
    return ['1','2']
}
fuc('1','2')
function fuc1(a:string,b:string):number[]{
    return [Number(a),Number(b)]
}
function fuc2(a:number|string,b:string|number):string{
    return a+''+b
}
//泛型约束
//泛型不支持number,因为number没有length
// function f4<T>(arg: T): T {
// console.log(arg.length); // 错误: T不存在length属性 比如数值等
// }
interface LengthN {
    length: number;
}
function myHello<T extends LengthN>(arg: T): T {//约束了传参必须包含length属性的类型
     console.log(arg.length);
     return arg;
}
myHello<string>('123');
//泛型变量T表示任意类型
function fuc3<T>(a:T, b:T):T[]{
    return [a,b]
}
fuc3<number>(1,2)
//不同类型的函数
function fuc4<T>(a:T, b:T, c:T):string{
    if(Object.prototype.toString.call(c) === '[object Object]'){
        return a+''+b+c['name']
    }
    return a+''+b+c
}
fuc4<number>(1,2,3)
fuc4<number|string|object>(1,'2',{name:1})
//可选参数的函数
function func5(a:number,b:number,c?:object):string{ //?:可选参数
 return a+b+''
}
//函数检查类型
// 场景：项目有一个公共函数传参类型（SearchFun），后续的函数继承这个接口后，都得按照这个规范来
interface SearchFun{
    (a:string, b:string):boolean
}
let fuc6:SearchFun = function(c:string, d:string):boolean{
    return c>d
}
let fuc7 = (type: 'chart' | 'board', dataStr: string):number => {
    if (type === 'board') {
        console.log(type)
      return 1
    } else {
        console.log(type)
      return 2
    }
}
//第一个参数只能输入'chart' 或 'board'
fuc7('board','1')

// 接口作为函数的返回值规范
interface MyParams8 {
    x: number;
    y: number;
}
function fuc8(): MyParams8 {
  return { x: 1, y: 2 }
}
fuc8();

// 接口作为函数的入参规范
interface MyParams9 {
    x: number;
    y: number;
}
function fuc9(params: MyParams9) {
    return 111;
}
fuc9({
    x: 1,
    y: 2,
});
// 或
// interface MyParams9 { // 定义 函数入参 + 返回类型
//     (x: number, y: number): number
// }
// const fuc9:MyParams9 = (x=1, y =2) =>{
//     return 111;
// }
// fuc9(1,2);

// 函数+接口+泛型
interface MyParams10 {
    x: number;
    y: number;
}
// 接口+泛型+函数入参
function fuc10<T>(params:T) {
    return params;
}
fuc10<MyParams10>({
    x:1,
    y:2
});

// 接口+泛型+函数返回值 待定
interface MyParams11 {
    x: number;
    y: number
}
interface MyParams111 {
    b: number
}
function fuc11<T, B>(params:T, BParams:B):B {
    return BParams
}
fuc11<MyParams11, MyParams111>({
    x:1,
    y:2
},{b:2});


// 类型断言
/**
 * 通常发生在你比TS更知道某个值的类型
 * 尖括号写法
 * let someValue:any = 'this is a string'；
   let strLength:number = (<string>someValue).length；
 * as写法
   let someValue:any = 'this is a string'；
   let strLength:number = (someValue as string).length；
 */

//定义类
//修饰符  static  public  private
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的；
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问；
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的；
//static 不需要实例化  调用类，直接调用
class Cat2{
    name:string;
    color:string;
    constructor(name,color){
        this.name = name;
        this.color= color;
    }
    static eat(){   //
        return '吃'
    }
};
var c2 = new Cat2('黑猫','黑');
Cat2.eat();
c2.name;
// 泛型在类的应用
class A2<T>{
    n:T;
    constructor(num:T){
        this.n = num;
    }
    add(x:T):T{
return x ; }
}
var a2 = new A2<number>(1);
a2.add(3)

// 常用内置工具类型
/**
 * Record<key type, value type> 
 * 定义一个对象的 key 和 value 类型
 *  export type EventType = 'hashchange' | 'popstate'
    const capturedListeners: Record<EventType, Function[]> = {
        hashchange: [],
        popstate: [],
    }
    属性“hashxx”在类型“Record<EventType, Function[]>”上不存在。你是否指的是“hashchange”?
    capturedListeners['hashxx'] = [function a(){},function b(){}]   //错 
    capturedListeners['hashchange'] = [function a(){},function b(){}]  //对
 */

/**
 * Partial
 * 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为可选项
 * interface Foo {
        name: string
        age: number
    }
    type Bar = Partial<Foo>
    相当于
    type Bar = {
        name?: string
        age?: number
    }
 */


/**
 * Required
 * 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项
 * interface Foo {
        name: string
        age?: number
    }
    type Bar = Required<Foo>
    相当于
    type Bar = {
        name: string
        age: string
    }
 */

/**
 * Readonly
 * 生成一个新类型，T 中的 K 属性是只读的，K 属性是不可修改的。
 * interface Foo {
        name: string
        age: number
    }
    type Bar = Readonly<Foo>
    相当于
    type Bar = {
        readonly name: string
        readonly age: string
    }
 */

/**
 * Pick
 * 生成一个新类型，该类型拥有 T 中的 K 属性集 ; 新类型 相当于 T 与 K 的交集
 * 白话：借别人家的粮食吃
 * interface Foo {
        name: string;
        age?: number;
        gender: string;
    }
    type Bar = Pick<Foo, 'age' | 'gender'>
    // 相当于
    type Bar = {
        age?: number
        gender: string
    }
 */

/**
 * Omit
 * 生成一个新类型，该类型拥有 T 中除了 K 属性以外的所有属性
 * type Foo = {
        name: string
        age: number
    }

    type Bar = Omit<Foo, 'age'>
    相当于
    type Bar = {
        name: string
    }
 */


/**
 * Exclude
 * 如果 T 是 U 的子类型则返回 never 不是则返回 T
 * type A = number | string | boolean
   type B = number | boolean

    type Foo = Exclude<A, B>
    // 相当于
    type Foo = string
 */

/**
 * Extract
 * 和 Exclude 相反
 * type A = number | string | boolean
   type B = number | boolean

    type Foo = Extract<A, B>
    // 相当于
    type Foo = number | boolean
 */

/**
 * NonNullable
 * 从泛型 T 中排除掉 null 和 undefined
 * type t = NonNullable<'name' | undefined | null>;
   type t = 'name'
 */