import React, { Component } from 'react'
import Parent from './parent'

export class Index extends Component {
    render() {
        return (
            <div>
                <h3>首页</h3>
                <Parent/>
            </div>
        )
    }
}

export default Index
