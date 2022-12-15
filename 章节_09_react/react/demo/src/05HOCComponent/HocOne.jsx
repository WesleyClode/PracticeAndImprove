import InputDom from './InputDom' 
// function HocOne(InputDom){
//   let newProps = {
//     newName: '李四',
//     name: {
//       defaultValue: 111
//     }
//   }
//   // props是<HocOne valueTest={111} />中的valueTest参数
//   // newProps基于原有的props新增了newProps一些自定义的值
//   // 功能1：拦截父组件传递过来的props，并进行数据处理
//   return props => <InputDom {...props} {...newProps}/>
// }

// 拦截父组件传递过来的props||或自定义字段，实现条件渲染
// function HocOne(InputDom){
//   let newProps = {
//     newName: '李四',
//     isShow: true,
//     name: {
//       defaultValue: 111
//     }
//   }
//   return props => (
//     <div>
//       {
//         newProps.isShow ? <InputDom {...props} {...newProps}/>
//         : <div>暂无数据</div>
//       }
//     </div>
//   )
// }

// 对传入的组件再进行DOM包装
function HocOne(InputDom){
  let newProps = {
    newName: '李四',
    name: {
      defaultValue: 111
    }
  }
  return props => (
    <div>
      <div style={{'background': '#ccc'}}><InputDom {...props} {...newProps}/></div>
    </div>
  )
}

// 接收一个组件，返回一个组件
export default HocOne(InputDom)