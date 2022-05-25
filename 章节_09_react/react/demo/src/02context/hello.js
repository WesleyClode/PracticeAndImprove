import React, { Component } from 'react'
import World from './world'
import Every from './every'
import MainContext from './context'

export class Hello extends Component {
    // static contextType = MainContext
    render() {
        return (
            <div>
                Hello 页面 --- {this.context}
                <World/>
                <Every />
            </div>
        )
    }
}

Hello.contextType = MainContext // 等同于第六行代码的作用

export default Hello
