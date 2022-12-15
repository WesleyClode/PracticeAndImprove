import React from "react";
// Home 组件
class Home extends React.Component {
  render() {
    return <h1>Hello World.</h1>;
  }
}
// HOC
// 反向继承 - 计算⼀个组件render期间的渲染耗时
function withTiming(WrappedComponent) {
  let start, end;
  return class extends WrappedComponent {
    constructor(props) {
      super(props);
      start = 0;
      end = 0;
    }
    componentWillMount() {
      if (super.componentWillMount) {
        super.componentWillMount();
      }
      start = +Date.now();
    }
    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
      end = +Date.now();
      console.error(`${WrappedComponent.name} 组件渲染时间为 ${end - start}
ms`);
    }
    render() {
      return super.render();
    }
  };
}
export default withTiming(Home);
