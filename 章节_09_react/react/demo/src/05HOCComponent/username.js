import React, { Component } from 'react'
// 高阶组件也是一个函数，它的参数是一个组件，返回的是一个新的组件
function PropName(WrapComponent) {
    class NewComponent extends Component {
        state = {
            username:''
        }
        // 获取username,假装是使用axios,所以在生命周期中获取
        componentDidMount(){
            this.setState({
                username:'吕树'
            })
        }
        render(){
            console.log(this.props)
            const {username} = this.state
            return(
                <WrapComponent username={username}/>
            )
        }
    }
    return NewComponent
}
export default PropName