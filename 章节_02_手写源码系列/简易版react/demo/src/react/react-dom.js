import { mount } from "./mount";
import { patch } from "./patch";

// step 1
// setTimeout(() => render(vnode, document.getElementById("app")))

// step 2
// setTimeout(() => render(null, document.getElementById("app")),5000)
// 此为简写，只是大概的vdom流程，BW和CW融一起去了，不会再从底层递归回顶层
export function render(vnode, container) {
    // 节点变动后current:老树   vnode:新树
    let current = container.current;
    // current, fiber, vdom的根节点
    if(!current) {
        mount(vnode, container);
        container.current = vnode;
    } else {
        if(vnode) {
            // 新旧两个
            // 节点的新增和修改
            patch(current, vnode, container);
            container.current = current;
        } else {
            // 节点的删除
            // 移除App根节点以下的所有节点
            container.removeChild(vnode.staticNode)
        }
    } 
}