// ?: 匹配不捕获
// + 至少一个
// ? 尽可能少匹配
// . 除换行符以外任意字符
// win-\r回车\n换行 unix-只有\n mac-只有\r
// /\{\{((?:.|\r?\n)+?)\}}/.test("{{msg}}")
// "{{msg}}".match(/\{\{((?:.|\r?\n)+?)\}}/)
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g
export const util = {
    getValue(vm, expr){ // [school, name]
        let keys = expr.split(".");
        return keys.reduce((memo, current)=>{ //迭代依次取出school.name.xxx
            memo = memo[current];
            return memo;
        },vm)
        // [1,2,3].reduce((m,current)=>{
        //     m+=current
        //     return m
        // },0)
    },
    compilerText(node,vm){//编译文本 替换{{xxx}}
        if(!node.expr){
            //添加一个自定义属性，便于模板更新
            node.expr = node.textContent;
        }
        node.textContent = node.expr.replace(defaultRE, function(...args){
            return JSON.stringify(util.getValue(vm, args[1]));
        })
    }
}

export function compiler(node, vm){
    let childNodes = node.childNodes;
    [...childNodes].forEach(child=>{
        //1-元素  3-文本
        if (child.nodeType == 1) {
            compiler(child, vm); //递归调用
        } else if (child.nodeType == 3) {
            util.compilerText(child,vm); //先写这个
        }
    })
}