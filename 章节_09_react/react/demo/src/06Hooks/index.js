import React, { useState } from 'react'
import HookUseEffect from './useEffect'
/* 
useState本身是一个函数,来自于react,有参数和返回值
调用useState返回的是一个数组
第一个元素是：当前的状态state
第二个元素：是一个函数，这个函数的作用就是去修改和设置我们的状态
*/
function HookFile(){
    //设置一个当前的状态也就是初始值为1
    // const arr = useState(1)
    // const state = arr[0]
    // const setState = arr[1]
    // console.log(arr)
    //解构写法
    const [state,setState] = useState(1) 
    const [star, setStar] = useState(['刘亦菲', '迪丽热巴', '古力娜扎', '杨幂'])
    const [money, setMoney] = useState(() => 100)
    //useState(() => 100) === useState(100)
    return (
        <div>
            <h1>Hooks</h1>
            <p>{state}</p>
            <button onClick={()=>setState(state+1)}>点击</button>
            <button onClick={()=>setStar([...star,'吕树'+Math.random()])}>增加明星</button>
            <button onClick={()=>setMoney((pre)=>pre+10)}>增加金钱</button>
            <button onClick={()=>setMoney(money+10)}>增加金钱</button>
            <p>请明星们亮相</p>
            {
                star.map(item=>{
                    return <li key={item}>{item}</li>
                })
            }
            <p>金钱：{money}</p>
            <h3>HookUseEffect</h3>
            <HookUseEffect/>
        </div>
    )
}
export default HookFile