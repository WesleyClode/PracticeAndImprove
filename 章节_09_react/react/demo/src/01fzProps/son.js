import React, { Component } from 'react'
import PropTypes from 'prop-types' // 使用props校验的第一步，引入

export class Son extends Component {
    state = {
        name: '前端萌新',
        msg: '这是一个前端初级小小萌新',
        parentMsg:this.props.msg
    }
    changeValue=(e)=>{
        console.log(e.target.value)
        this.setState({parentMsg: e.target.value})
        this.props.parentChange(e.target.value)
    }
    render() {
        let { name, msg, parentMsg } = this.state
        let { name: pName, msg: pMsg } = this.props
        return (
            <div>
                <h3>子页</h3>
                 <p>姓名：{name}</p>
                <p>信息：{msg}</p>
                <p>前端大佬介绍信息：{parentMsg}---{pName}---{pMsg}</p>
                <input value={parentMsg} onChange={this.changeValue}/>
            </div>
        )
    }
}
// 使用props校验的第二步
Son.propTypes = {
    name: PropTypes.string.isRequired,
    msg: PropTypes.string
}

Son.defaultProps = {
    name: '李四',
    msg: '江湖最后一个前端大佬'
}

export default Son
