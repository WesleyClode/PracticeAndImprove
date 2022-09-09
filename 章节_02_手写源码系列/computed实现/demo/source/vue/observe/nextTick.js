// --------------------------nextTick
let callbacks = [];
function flushCallbacks(){
    callbacks.forEach(cb=>cb());
}
export function nextTick(cb){
    callbacks.push(cb);
    // 要异步刷新这个callbacks, 获取一个异步的方法
    //                  微任务                      宏任务
    // 异步执行顺序 先选择(promise mutationObserver) setImmediate setTimeout
    let timerFunc = ()=>{
        flushCallbacks();
    }
    if (Promise){
        return Promise.resolve().then(timerFunc);
    }
    if (MutationObserver){
        let observe = new MutationObserver(timerFunc); //H5的api
        let textNode = document.createTextNode(1);
        observe.observe(textNode, {characterData:true});
        textNode.textContent = 2; //若文本变为2则会执行上面的observe
        return
    }
    if (setImmediate){
        return setImmediate(timerFunc);
    }
    setTimeout(timerFunc,0)
}