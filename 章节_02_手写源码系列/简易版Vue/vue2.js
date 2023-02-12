export function Vue(options={}) {
    this.__init(options)
}
// initMixin 
Vue.prototype.__init = function (options) { 
    this.$options = options
    // 假设这里就是一个 el， 已经 querySelector 的
    // $ 为实例属性设置作用域，避免和项目中的属性命名一致
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods
    // beforeCreate -- initState -- initData(proxy和observe)--created
    proxy(this, this.$data)
    observer(this.$data)
    new Compiler(this)
}

// this.$data.message --> this.message
//             this   this.$data
function proxy(target, data) {
    Object.keys(data).forEach(key=>{
        Object.defineProperty(target, key, {
            enumerable: true, // 当前key是否可被枚举
            configurable: true, // 当前key是否可被修改，是否可被删除
            // writable: false, // 当前key是否可被修改
            get(){
                // 取this.message 等于 this.$data.mssage
                return data[key]
            },
            set(newVal){
                // 考虑 NaN 的情况
                if(!isSameVal(data[key], newVal)) {
                    // this.message = 'test' 等于 this.$data.mssage = 'test'
                    data[key] = newVal
                }
            }
        })
    })
}

function observer(data) {new Observer(data)}
class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        if(data && typeof data === 'object'){
            Object.keys(data).forEach(key=>{
                this.defineReactive(data, key, data[key])
            })
        }
    }
    // 我要把每一个 data 里面的数据，收集起来。
    defineReactive(obj, key , value){
        let that = this
        this.walk(value)
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            get(){
                // 4. 对于 num 来说，要执行这一句。
                // 5. num 中的 dep, 就有了这个 watcher
                // dep: [watcher, watcher ]
                Dep.target && dep.add(Dep.target)
                return value
            },
            set(newVal){
                if(!isSameVal(value, newVal)) {
                    value = newVal
                    // 赋值进来的新值，是没有响应式的，所以我要再 walk 一次，给到响应式。
                    that.walk(newVal)
                    // 6. 重新set时，通知更新
                    dep.notify()
                }
            }
        })
    }
}
// 视图怎么更新？
// 重点：数据改变，视图才会更新。需要去观察
// 1. new Watcher( vm, 'num', () => {更新视图上的num显示} )
class Watcher{
    constructor(vm, key, cb){
        this.vm = vm // Vue的一个实例
        this.key = key
        this.cb = cb
        // 2. 此时 Dep.target 作为一个全局变量理解，放的就是这个 watcher;
        Dep.target = this
        // 3. 一旦进行了这一句赋值，是不是就触发了这个值的 getter 函数。
        this.__old = vm[key]
        // 把 Dep.target 删除。
        Dep.target = null
    }
    // 8. 执行所有的 cb 函数。
    update() {
        let newVal = this.vm[this.key];
        // 执行编译环节缓存的cb, newVal替换老值
        if(!isSameVal(newVal, this.__old)) this.cb(newVal);
    }
}
class Dep{
    constructor(){
        this.watchers = new Set()
    }
    add(watcher){
        if(watcher && watcher.update){
            // Set自带的add函数
            this.watchers.add(watcher);
        }
    }
    notify(){
        this.watchers.forEach(watc => watc.update())
    }
}
class Compiler{
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        this.methods = vm.$methods
        this.compile(vm.$el)
    }
    compile(el){
        let childNodes = el.childNodes
        // 类数组
        Array.from(childNodes).forEach(node=>{
            // 如果是文本节点
            if(node.nodeType === 3){
                this.compileText(node)
            }
            // 如果是元素节点
            else if(node.nodeType === 1){
                this.compileElement(node)
            }
            // 如果还有子节点，就递归下去
            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })
    }
    compileText(node){
        // 匹配出来 {{massage}}
        let reg = /\{\{(.+?)\}\}/;
        let value = node.textContent;
        if(reg.test(value)){
            let key = RegExp.$1.trim()
            // 开始时赋值
            // {{message}} 替换成 'data.message的值'
            node.textContent = value.replace(reg, this.vm[key])
            // 添加观察者
            new Watcher(this.vm, key, val=>{
                // 数据改变时的更新
                node.textContent = val
            })
        }
    }
    compileElement(node){
        // 简化，只做匹配 v-on 和 v-model 的匹配
        if(node.attributes.length){
            Array.from(node.attributes).forEach(attr=>{
                let attrName = attr.name
                if(attrName.startsWith('v-')){
                    // v- 指令匹配成功，可能是 v-on:click 或者 v-model
                    attrName = attrName.indexOf(':') >-1 ? attrName.substr(5): attrName.substr(2)
                    let key = attr.value;
                    this.update(node, key, attrName, this.vm[key])
                }
            })
        }
    }
    update(node, key, attrName, value){
        if(attrName === 'model'){
            node.value = value
            new Watcher(this.vm, key, val=>{
                node.value = val
            })
            node.addEventListener('input',()=>{
                // 让值改变，触发更新
                this.vm[key] = node.value
            } )
        } else if(attrName === 'click'){
            node.addEventListener(attrName, this.methods[key].bind(this.vm))
        }

    }
}
function isSameVal (a, b) {
    return a === b || (Number.isNaN(a) && Number.isNaN(b))
}