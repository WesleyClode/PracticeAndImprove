import React from "react";
class InputDom extends React.Component {
  state = {
    num: 1,
  };
  render() {
    console.log(this.props)
    return (
      <div>
        <input name="name" {...this.props.name} />
        <div>{this.state.num}</div>
      </div>
    );
  }
}

// 反向继承模板写法
// const HOC = (WrappedComponent) => {
//    return class extends WrappedComponent {
//      render() {
//        return super.render();
//     }
//   }
//  }
// 反向继承 extends WrappedComponent的高阶函数写法
// 更改原组件的state，劫持生命周期
// function HocTwo(WrappedComponent) {
//   const didMount = WrappedComponent.prototype.componentDidMount; // 继承了传⼊组件
//   // 匿名class组件
//   return class extends WrappedComponent {
//     // 劫持生命周期
//     async componentDidMount() {
//       if (didMount) {
//         await didMount.apply(this);
//       } // 将 state 中的 number 值修改成 2
//       // 此处this 是InputDom组件实例
//       console.log(this)
//       this.setState({ num: 2 });
//     }
//     render() {
//       //使⽤ super 调⽤传⼊组件的 render ⽅法
//       return super.render();
//     }
//   };
// }
// 修改原组件的tree结构
function HocTwo(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      const tree = super.render();
      const newProps = {
        defaultValue: 123
      }
      // 遍历树结构，找到input，修改defaultValue数据
      const props = {
        ...tree.props
      };
      let newTree = {}
      if(props?.children){
        newTree.children  = props.children.map(cTree => {
          if (cTree.type === "input") {
            let props = {...cTree.props, ...newProps}
            // input 不需要children 传入会报错
            // props直接作用在input上， 和<input name="name" {...this.props.name} />里的this.props.name无太大关系了
            return React.cloneElement(cTree, props);
          }
          return cTree
        });
      }
      newTree = React.cloneElement(tree, newTree, newTree.children || '');
      console.log(newTree)
      return newTree;
    }
  };
}
// 属性代理 类组件写法 extends React.Component的高阶函数写法
// function HocTwo(WrappedComponent) {
//   const didMount = WrappedComponent.prototype.componentDidMount; // 继承了传⼊组件
//   // 匿名class组件
//   return class extends React.Component {
//     // 劫持生命周期
//     async componentDidMount() {
//       if (didMount) {
//         await didMount.apply(this);
//       } // 将 state 中的 number 值修改成 2
//       // 此处this 是InputDom组件实例
//       console.log(this);
//       this.setState({ num: 2 });
//     }
//     render() {
//       let newProps = {
//         newName: '李四',
//         name: {
//           defaultValue: 222
//         }
//       }
//       return (
//         <WrappedComponent
//           {...newProps}
//           {...this.props}
//         />
//       );
//     }
//   };
// }
// 接收一个组件，返回一个组件
// InputDom换成类组件，是因为教程里是对componentDidMount生命周期进行劫持
export default HocTwo(InputDom);
