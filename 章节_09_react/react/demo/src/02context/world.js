import React, { Component } from 'react'
import MainContext from './context'

export class World extends Component {
    render() {
        return (
            <div>
                {/* 第三步接收值，下面为固定写法 */}
                <MainContext.Consumer>
                    {
                        context => {
                            console.log(context)
                            return (
                                <div>
                                    World 页面---{context}
                                </div>
                            )
                        }
                    }
                </MainContext.Consumer>
            </div>
        )
    }
}

export default World
