
const normalize = (children = []) => children.map(child => typeof child === 'string' ? createVText(child): child)

export const NODE_FLAG = {
    EL: 1, // 元素 element
    TEXT: 1 << 1
};
// El & TEXT  = 0


const createVText = (text) => {
    return {
        type: "",
        props: {
            nodeValue: text + ""
        },
        $$: { flag: NODE_FLAG.TEXT }
    }
}

const createVNode = (type, props, key, $$) => {
    return {
        type, 
        props,
        key,
        $$,
    }
}

export const createElement = (type, props, ...kids) => {
    props = props || {};
    let key = props.key || void 0;
    kids = normalize(props.children || kids);

    if(kids.length) props.children = kids.length === 1? kids[0] : kids;

    // 定义一下内部的属性
    const $$ = {};
    $$.staticNode = null;
    $$.flag = type === "" ? NODE_FLAG.TEXT: NODE_FLAG.EL;

    return createVNode(type, props, key, $$)
}