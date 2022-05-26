import React, { useState } from 'react'
import store from './store'
import { addAction } from './store/action'
import Son from './son'
// const initState = {
//     count: 0
// }
// // 1 store保存状态,创建一个对象即可
// const store = redux.createStore(reducer)

// // 2、action用来修改store
// const action1 = { type: 'INCREMENT' }

// // 3、reducer是连接store和action,在默认的情况下state是没有值，因此我们需要把initState传过来
// const reducer = (state=initState, action) => {
//     switch(action.type) {
//         case 'INCREMENT':
//             return {...state, count: state.count + 1}
//         default:
//             return state
//     }
// }

// // 4、派发action
// store.dispatch(action1)

// // 5、在派发之前监听store的变化
// store.subscribe(() => {
//     // console.log('store被修改了')
//     console.log(`count:${store.getState().count}`)
// })
//组件区域
function ReduxComponent() {
    function changeSome(){
        // store.dispatch({ type: 'INCREMENT' })
        store.dispatch(addAction(10))
        setState(store.getState().money)
    }
    const [state,setState] = useState(store.getState().money)
    return (
        <div>
            <div>首页</div>
            <div>{state}</div>
            <button onClick={changeSome}>父页面点击</button>
            <Son/>
        </div>
    )
}
export default ReduxComponent