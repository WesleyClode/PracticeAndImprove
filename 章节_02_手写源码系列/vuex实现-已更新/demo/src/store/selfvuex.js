/**
 * 手写vuex
 */
// Vue.use(vuex), 因为use引入三方插件，所以插件里必须要有install方法 
let Vue
let install = function(_Vue){
    console.log(_Vue)
    Vue = _Vue
    Vue.mixin({
        // mixin和beforeCreate是搭配使用，组件刚加载时走这里
        beforeCreate(){
            // this 就是 '当前的' vue实例
            // 把$store 挂载到Vue实例
            if (this.$options && this.$options.store) { // 根组件
                this.$store = this.$options.store
            } else { // 子组件
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

class Store{
    constructor(options){
        console.log(options)
        // $store.state
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })
        this.state = this.vm.state
        // $store.getter()
        let getters  = options.getters || {}
        this.getters = {}
        Object.keys(getters).forEach(gettersName=>{
            // this.getters[gettersName] = getters[gettersName]
            // 数据劫持options.getters里的key，返回其对应函数的值
            console.log(this.getters)
            Object.defineProperty(this.getters, gettersName, {
                get:()=>{
                    return getters[gettersName](this.state)
                }
            })
        })
        // mutations -> $store.commit(fnName, val)
        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationsName=>{
            this.mutations[mutationsName] = mutations[mutationsName]
        })
        this.commit = (fnName, val)=>{
            this.mutations[fnName](this.state, val)
        }
        // Object.keys(mutations).forEach(mutationsName=>{
        //     this.mutations[mutationsName] = (payload)=>{
        //         mutations[mutationsName](this.state,payload)
        //     }
        // })
        // this.commit = (fnName, val)=>{
        //     this.mutations[fnName](val)
        // }
        // actions -> $store.dispatch(fnName, val)
        let actions = options.actions || {}
        this.actions = {}
        Object.keys(actions).forEach(actionsName=>{
            this.actions[actionsName] = actions[actionsName]
        })
        this.dispatch = (fnName, val)=>{
            this.actions[fnName](this,val)
        }
    }
}
export default  {
    install, Store
}