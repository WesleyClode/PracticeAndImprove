let id = 0;
// 用来收集渲染watcher
class Dep{
    constructor(){
        this.id = id++;
        this.subs = [];
    }
    //订阅
    addSub(watcher){
        this.subs.push(watcher);
    }
    //发布
    notify(){
        console.log(this.subs);// 查看所有watcher
        this.subs.forEach(watcher=>watcher.update());
    }
    depend(){
        if(Dep.target){//防止直接调用depend方法
            Dep.target.addDep(this);//在watcher中添加dep,相互引用
        }
    }
}
// 用来存储当前的watcher，在watcher.js中调
// 以下方法是防止依赖收集时受影响，js单线程
let stack = []
export function pushTarget(watcher){
    Dep.target = watcher;
    stack.push(watcher);
}
//移除最新的watcher,若只有一个则target=null
export function popTarget(){
    stack.pop();
    Dep.target = stack[stack.length-1];
}

// let dep = new Dep();
// dep.addSub({
//     update(){
//         console.log(1);
//     }
// })
// dep.addSub({
//     update(){
//         console.log(2);
//     }
// })
// dep.notify();

export default Dep;