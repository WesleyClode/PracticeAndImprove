/*
    高阶函数：接收一个函数为参数的函数，或者，输出一个函数的函数
    高阶组件：接收一个组件为参数，输出一个组件
*/

//高级函数
//这个函数的用途就是读取用户名，传递给其他需要用户名的函数
// function propUsername(call){
//     function getUsername() {
//         const username = 'admin'
//         call(username)
//     }
//     return getUsername
// }
// function Login(username) {
//     console.log(username+'登录了')
// }
// function Logout(username) {
//     console.log(username+'登出了')
// }

// const newLogin = propUsername(Login)
// const newLogout = propUsername(Logout)
// newLogin()
// newLogout()

import React, { Component } from 'react'
import Login from './login'
import Logout from './logout'

export class HOCComponent extends Component {
    render(){
        return(
            <div>
                <div>高阶组件</div>
                <Login/>
                {/* 此处的Logout组件其实是PropName高阶组件，传值也会传到PropName高阶组件里 */}
                <Logout username='cscsc' age='213'/>
            </div>
        )
    }
}
export default HOCComponent