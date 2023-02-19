// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

/**
 * 直接这样写，走的还是react的逻辑
 * App()打印出来是原生node
 * 又不想通过软链在node_modules里重写
 * 故采用babeljs.com里转换过的creactElement即可
 * */
// function App() {
//   return (
//     <div className="App">
//       <div id="list">
//         <ul>
//           <li>list 1</li>
//           <li>list 2</li>
//           <li>list 3</li>
//           <li>list 4</li>
//           <li>list 5</li>
//           <li>list 6</li>
//         </ul>
//       </div>
//     </div>
//   );
// }
import React from './react';
import {render} from './react/react-dom'
/**
 * 书接上文
 * babeljs.com里转换过的creactElement
 */
 function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    id: "list"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      color: '#f00'
    }
  }, /*#__PURE__*/React.createElement("li", null, "list 1"), /*#__PURE__*/React.createElement("li", null, "list 2"), /*#__PURE__*/React.createElement("li", null, "list 3"), /*#__PURE__*/React.createElement("li", null, "list 4"), /*#__PURE__*/React.createElement("li", null, "list 5"), /*#__PURE__*/React.createElement("li", null, "list 6"))));
}

const nextVNode = React.createElement(
  "ul",
  {
    style: {
      width: "100px",
      height: "100px",
      backgroundColor: "green",
    },
  },
  [
    React.createElement("li", { key: "li-a" }, "this is li a"),
    React.createElement("li", { key: "li-b" }, "this is li b"),
    React.createElement("li", { key: "li-c" }, "this is li c"),
    React.createElement("li", { key: "li-d" }, "this is li d"),
  ]
);

console.log(App())
render(App(), document.getElementById('root'))
setTimeout(() => render(nextVNode, document.getElementById("root")),6000)
/**
 * mount流程：
 * react/index: 提供React.createElement
 * react/react: 开发React.createElement，把接收的属性转为vDom
 * react/react-dom: 开发render
 *                  接收vdom和容器传入mount，挂载到根节点
 *                  配合patch进行节点增改
 * react/mount: 接收vdom
 *              配合patch把处理后的dom渲染到视图上
 * react/patch: 通过patchProps方法,对dom进行style等节点的增删改，对dom的事件属性进行处理
 *              通过patch方法，配合moun和diff进行dom的增改
 */



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

