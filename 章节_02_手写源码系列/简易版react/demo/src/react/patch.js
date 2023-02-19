import { mount } from "./mount";
import { diff } from './diff';
// diff逻辑在patchChildrend里
function patchChildren(prev, next, parent) {
    // diff 整个的逻辑还是耗性能的，所以，我们可以先提前做一些处理。
    // 中文：之前是null，现在是[li li li ]，那不用diff了，直接用[li li li]不就行了
    //      之前是null，现在是null，那也不用diff了，啥都不干就行
    if(!prev) {
        if(!next) {
            // nothing
        } else {
            next = Array.isArray(next) ? next : [next];
            for(const c of next) {
                mount(c, parent);
            }
        }
    } else if (prev && !Array.isArray(prev)) {
        // 只有一个 children
        if(!next) parent.removeChild(prev.staticNode);
        else if(next && !Array.isArray(next)) {
            patch(prev, next, parent)
        } else {
            // 如果prev 只有一个节点，next 有多个节点
            parent.removeChild(prev.staticNode);
            for(const c of next) {
                mount(c, parent);
            }
        }
    } else diff(prev, next, parent);
}

export function patch (prev, next, parent) {
    // type: 'div' -> 'ul'
    // 中文：节点更新后，之前是div，现在是ul了，那就没有必要diff, 直接移除div用ul（mount(ul)）就行了
    if(prev.type !== next.type) {
        parent.removeChild(prev.staticNode);
        mount(next, parent);
        return;
    }

    // type 一样，diff props 
    // 先不看 children 
    const { props: { children: prevChildren, ...prevProps}} = prev;
    const { props: { children: nextChildren, ...nextProps}} = next;
    // patch Porps
    const staticNode = (next.staticNode = prev.staticNode);
    for(let key of Object.keys(nextProps)) {
        let prev = prevProps[key],
        next = nextProps[key]
        patchProps(key, prev, next, staticNode)
    }

    for(let key of Object.keys(prevProps)) {
        if(!nextProps.hasOwnProperty(key)) patchProps(key, prevProps[key], null, staticNode);
    }

    // patch Children ！！！
    patchChildren(
        prevChildren,
        nextChildren,
        staticNode
    )

}


export function patchProps(key, prev, next, staticNode) {
    // style 
    if(key === "style") {
        // {margin: 0, padding: 10}
        if(next) {
            for(let k in next) {
                staticNode.style[k] = next[k];
            }
        }
        if(prev) {
        // {margin: 10, color: red}
            for(let k in prev) {
                if(!next.hasOwnProperty(k)) {
                    // style 的属性，如果新的没有，老的有，那么老的要删掉。
                    staticNode.style[k] = "";
                }
            }
        }
    }

    else if(key === "className") {
        if(!staticNode.classList.contains(next)) {
            staticNode.classList.add(next);
        }
    }

    // events
    else if(key[0] === "o" && key[1] === 'n') {
        prev && staticNode.removeEventListener(key.slice(2).toLowerCase(), prev);
        next && staticNode.addEventListener(key.slice(2).toLowerCase(), next);

    } else if (/\[A-Z]|^(?:value|checked|selected|muted)$/.test(key)) {
        staticNode[key] = next

    } else {
        staticNode.setAttribute && staticNode.setAttribute(key, next);
    }
}