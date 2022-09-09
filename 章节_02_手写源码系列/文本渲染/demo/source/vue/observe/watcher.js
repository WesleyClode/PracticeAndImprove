let id = 0;
class Watcher{ // 每次产生一个watcher，都需要一个唯一标识
    /**
     * 
     * @param {*} vm 当前组件的实例
     * @param {*} exprOrFn 表达式或函数
     * @param {*} cb 传入的回调函数vm.$watch('msg', cb)
     * @param {*} opts 其它参数
     */
    constructor(vm, exprOrFn, cb=()=>{}, opts={}) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn; // getter就是new Watcher传入的第二个参数
        }
        this.cb = cb;
        this.opts = opts;
        this.id = id++;

        this.get(); //默认创建一个watcher 会调用自身的get方法
    }
    get(){
        this.getter(); //让当前传入的函数执行
    }
}
// 渲染、计算属性及watch都要使用Watcher
export default Watcher