import React, { Component } from 'react'
import Hello from './hello'
import MainContext from './context' //第一步定义MainContext

export class Main extends Component {
    render() {
        return (
            <div>
                {/* 第二步传值给包裹的组件，组件包组件也可以传递过去 */}
                <MainContext.Provider value='张三21'>
                    首页
                    <Hello/>
                </MainContext.Provider>
            </div>
        )
    }
}

export default Main
