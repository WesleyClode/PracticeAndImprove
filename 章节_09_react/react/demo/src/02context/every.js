import React, { Component } from 'react'
import MainContext from './context'

export class Every extends Component {
    static contextType = MainContext
    render() {
        return (
            <div>
                everythins is well 页面 --- {this.context}
            </div>
        )
    }
}

// Hello.contextType = MainContext // 等同于第六行代码的作用

export default Every
