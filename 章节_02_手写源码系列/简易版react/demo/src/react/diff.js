import { mount } from './mount.js'
import { patch } from './patch.js'

export const diff = (prev, next, parent) => {
  let prevMap = {}
  let nextMap = {}

  // 遍历我的老的 children
  for (let i = 0; i < prev.length; i++) {
    let { key = i + '' } = prev[i]
    prevMap[key] = i
  }

  let lastIndex = 0
  // 遍历我的新的 children
  for (let n = 0; n < next.length; n++) {
    let { key = n + '' } = next[n]
    // 老的节点
    let j = prevMap[key]
    // 新的 child
    let nextChild = next[n]
    nextMap[key] = n
    // react的diff是插入算法
    // 老的children      新的children
    // [a, b]           [c, d, b]  =>  [c, a, b]     --> 增c
    //                             =>  [c, d, a, b]  --> 增d
    //                             =>  [c, d, b]     --> 删a
    
    if (j == null) {
      // 从老的里面，没有找到。新插入
      // c在[a, b]中没找到，增c于a前：[c, a, b]     --> 增c
      let refNode = n === 0 ? prev[0].staticNode : next[n - 1].staticNode.nextSibling
      mount(nextChild, parent, refNode)
    }
    else {
      // [b, a]           [c, d, a]  =>  [c, d, a, b]  --> a
      // 如果找到了，我 patch 
      patch(prev[j], nextChild, parent)

      if (j < lastIndex) {
        // 上一个节点的下一个节点的前面，执行插入
        //    c          a
        // [c, d, a, b]  --> 增d
        let refNode = next[n - 1].staticNode.nextSibling;
        parent.insertBefore(nextChild.staticNode, refNode)
      }
      else {
        lastIndex = j
      }
    }
  }
  // 删除多余节点
  // [c, d, b]     --> 删a
  for (let i = 0; i < prev.length; i++) {
    let { key = '' + i } = prev[i]
    if (!nextMap.hasOwnProperty(key)) parent.removeChild(prev[i].staticNode)
  }
}
