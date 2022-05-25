import React, { Component } from 'react'
import Son from './son'

export class Parent extends Component {
    state = {
        name: '前端大佬',
        msg: '这是一个资深前端大佬'
    }
    // 改变内容的方法
    parentChange=(data) =>{
        console.log(data)
        this.setState({msg: data})
    }
    render() {
        let { name, msg } = this.state
        return (
            <div>
                <h3>父页</h3>
                <p>姓名：{name}</p>
                <p>信息：{msg}</p>
                <Son {...this.state} parentChange={this.parentChange} />
            </div>
        )
    }
}

export default Parent
