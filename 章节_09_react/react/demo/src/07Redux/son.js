import React, { useState, useEffect } from 'react'
import store from './store'
import { addAction } from './store/action'

export default function Son() {
    const [state,setState] = useState(store.getState().money)
    useEffect(() => {
        //订阅状态变更
        store.subscribe(() => {
            console.log(store.getState().money)
            setState(store.getState().money)
        })
    }, [])
    function changeSome(){
        store.dispatch(addAction(10))
    }
    return (
        <div>
            <h3>子页面</h3>
            <div>{state}</div>
            <button onClick={changeSome}>子页面点击</button>
        </div>
    )
    
}