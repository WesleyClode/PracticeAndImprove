import React, { Component } from 'react'

export class Button extends Component {
    constructor(props) {
        // 我们需要执行第一个阶段，就是初始化阶段
        super(props)
        this.state = {
            liked: false
        }
        console.group('%c 1-初始化阶段', 'color: red', props, this.state)
    }

    UNSAFE_componentWillMount() {
        // 在组件挂载前嗲用一次，在redner之前调用,这里可以发起请求
        // 我们可以在这个方法里面调用setState改变状态,不会导致额外调用一次render
        console.group('%c 2-组件加载前', 'color: green')
    }

    componentDidMount() {
        // 在这里请求也是可以的,此时DOM节点生成
        // 只会在挂载完成之后调用一次,在render之后调用
        console.group('%c 4-组件加载后', 'color: orange')
    }

    handleClick(e) {
        // setState会触发render
        this.setState({ liked: !this.state.liked })
    }

    shouldComponentUpdate() {
        console.group('%c 5-数据是否要更新', 'color: #00ae9d')
        // console.log(this.state.liked)
        return true
        // return true代表组件需要更新,false就代表组件不需要更新
    }

    UNSAFE_componentWillUpdate() {
        console.group('%c 6-数据将要更新', 'color: #8552a1')
    }

    componentDidUpdate() {
        console.group('%c 7-数据已经更新', 'color: #7fb80e')
    }

    componentWillUnmount() {
        // 这里完成组件的卸载和数据的销毁，清除组件所有的setTimeout以及移除所有的事件监听
        console.group('%c 8-组件销毁')
    }

    render() {
        // 只要状态发生变化，一定会执行render方法
        // render函数会插入jsx生成的dom结构,react会生成一个虚拟的dom树,在每一次组件更新时
        // 在此react会通过其diff算法比较更新前后的新旧DOM树
        // 比较以后，会找到最小的有差异的DOM节点,并重新渲染。
        console.group('%c 3-组件加载或者数据更新', 'color: blue')

        const text = this.state.liked ? '喜欢': '不喜欢'
        return (
            <div>
                <p onClick={this.handleClick.bind(this)}>
                    你{text}学习React
                </p>
            </div>
        )
    }
}

export default Button
