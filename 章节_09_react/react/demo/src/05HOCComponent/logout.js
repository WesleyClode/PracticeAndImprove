import React, { Component } from 'react'
import PropName from './username'

export class Logout extends Component {
    render(){
        console.log(this.props)
        const {username} = this.props
        return(
            <div>
                <div>logout页面</div>
                <div>{username}登出了</div>
            </div>
        )
    }
}
export default PropName(Logout)