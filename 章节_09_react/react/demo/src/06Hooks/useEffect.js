import React, { useState, useEffect } from 'react'
/* 
1 useEffect可以看作是组件加载+组件更新+组件卸载
2 可依赖属性（当属性状态更新，useEffect就会执行）
3 如果依赖一个空数组，状态更新，useEffect不会执行
*/
function HookUseEffect(){
    const [state,setState] = useState(1)
    const [star, setStar] = useState(['刘亦菲', '迪丽热巴', '古力娜扎', '杨幂'])
    useEffect(()=>{
        document.title = `你点击了${state}次`
    })
    useEffect(() => {
        console.log('我被执行了')
    }, [star])
    return (
        <div>
            <h1>useEffect</h1>
            <p>{state}</p>
            <p>请明星们亮相</p>
            {
                star.map(item=>{
                    return <li key={item}>{item}</li>
                })
            }
            <button onClick={()=>setState(state+1)}>点击</button>
            <button onClick={()=>setStar([...star,'吕树'+Math.random()])}>增加明星</button>
        </div>
    )
}
export default HookUseEffect