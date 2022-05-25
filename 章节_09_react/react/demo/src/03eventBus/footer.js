import React, { Component } from 'react'
import eventBus from './event'

export class Footer extends Component{
    state = {
        name:'',
        age: ''
    }
    
    // 监听从header组件发送过来的sayHello方法
    componentDidMount(){
        eventBus.addListener('sayHello',this.sayHelloListener)
    }
    // 处理事件监听
    sayHelloListener=(a, b, c)=> {
        console.log(a, b, c)
        this.setState({
            name:a,
            age:c.age
        })
    }
    componentWillUnmount(){
        eventBus.removeListener('sayHello',this.sayHelloListener)
    }
    render(){
        let {name,age} = this.state
        return(
            <div>
                footer页面
                <div>{name},{age}</div>
            </div>
        )
    }
}
export default Footer