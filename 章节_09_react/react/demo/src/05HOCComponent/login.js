import React, { Component } from 'react'
import PropName from './username'

export class Login extends Component {
    render(){
        console.log(this.props)
        const {username} = this.props
        return(
            <div>
                <div>login页面</div>
                <div>{username}登录了</div>
            </div>
        )
    }
}
export default PropName(Login)