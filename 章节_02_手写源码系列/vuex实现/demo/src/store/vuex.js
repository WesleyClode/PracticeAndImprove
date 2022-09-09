//自己实现vuex
let Vue;

// 自定义forEach
const forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key]);
    })
}

//构建vuex子模块树状结构---递归
class ModuleCollection {
    constructor(options) {
        this.register([], options); //[]---root
    }
    //pathArr---[it,java]  将子模块注册到根模块
    register(pathArr, rootModule) {
        //初始对象
        let newModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }
        //记录根节点
        if (pathArr.length === 0) {
            this.root = newModule;
        } else {
            //若是子模块---需要取到父模块---然后将newModule赋给父模块的_Children
            // console.log("是子模块")
            let parent = pathArr.slice(0, -1).reduce((root, current)=>{
                return this.root._children[current];
            }, this.root);
            parent._children[pathArr[pathArr.length-1]] = newModule;
        }
        //递归
        if (rootModule.modules) {
            forEach(rootModule.modules, (moduleName, module)=>{
                //pathArr---[it]
                this.register(pathArr.concat(moduleName), module);
            })
        }
    }
}

//递归模块树,安装所有模块的getters, mutations actions
//把所有的state放在一块{num:1,it:{count:100}}
//store---当前store  state---当前state  pathArr---模块路径  rootModule--根模块
const installModule = (store, state, pathArr, rootModule)=>{
    //安装child state
    if (pathArr.length > 0) {
        //[it] {count: 100}
        //[it, java] {count: 100, it:{n:10}}
        //需要根据当前state找父state
        let parent = pathArr.slice(0, -1).reduce((state, current)=>{
            return state[current];
        }, state);
        //把子state添加到父的state中
        Vue.set(parent, pathArr[pathArr.length-1], rootModule.state);
    }
    //for getters
    let getters = rootModule._raw.getters;
    if (getters) {
        //把getters中属性定义到this.getters
        forEach(getters, (getterName, fn)=>{
            Object.defineProperty(store.getters, getterName, {
                get: ()=>{
                    return fn(rootModule.state);
                }
            })
        })
    }
    //for mutation
    let mutations = rootModule._raw.mutations;
    if (mutations) {//同名 {syncAdd:[fn,fn]}
        forEach(mutations, (mutationName, fn)=>{
            let arr = store.mutations[mutationName] || (store.mutations[mutationName]=[])
            arr.push((payload) => {
                fn(rootModule.state, payload);
            })
        })
    }
    //for actions
    let actions = rootModule._raw.actions;
    if (actions){//同名{asyncAdd:[fn,fn]}
        forEach(actions, (actionName, fn)=>{
            let arr = store.actions[actionName] || (store.actions[actionName]=[]);
            arr.push(payload=>{
                fn(store, payload);
            })
        })
    }
    //递归
    forEach(rootModule._children, (moduleName, module)=>{
        installModule(store, state, pathArr.concat(moduleName), module);
    })
}

class Store{
    constructor(options){
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })

        //for getters
        // let getters = options.getters || {}
        // this.getters = {}
        // //把getters中属性定义到this.getters
        // forEach(getters, (getterName, fn)=>{
        //     Object.defineProperty(this.getters, getterName, {
        //         get: ()=>{
        //             return fn(this.state);
        //         }
        //     })
        // })
        //for mutations
        // let mutations = options.mutations || {}
        // this.mutations = {}
        // forEach(mutations, (mutationName, fn)=>{
        //     this.mutations[mutationName] = payload => {
        //         fn(this.state, payload);
        //     }
        // })
        //for actions
        // let actions = options.actions || {}
        // this.actions = {}
        // forEach(actions, (actionName, fn)=>{
        //     this.actions[actionName] = payload=>{
        //         fn(this, payload);
        //     }
        // })
        //拿到模块树
        this.modules = new ModuleCollection(options);
        console.log(this.modules)
        //安装模块
        this.getters = {}
        this.mutations = {}
        this.actions = {}
        installModule(this, this.state, [], this.modules.root);
    }
    dispatch(type, payload) {
        // this.actions[type](payload);
        //重构modules后
        this.actions[type].forEach(fn=>fn(payload));
    }
    commit = (type, payload)=>{
        console.log(this)
        // this.mutations[type](payload)
        //重构modules后
        this.mutations[type].forEach(fn=>fn(payload));
    }
    get state(){
        return this.vm.state;
    }

    //modules数据处理---树状结构---
    // let root = {
    //     _raw: rootModule,
    //     state: {num: 1},
    //     _children: {
    //         it: {
    //             _raw: itModule,
    //             state: {},
    //             _children: {}
    //         },
    //         hr: {
    //             _raw: hrModule,
    //             state: {},
    //             _children: {}
    //         }
    //     }
    // }
    
}

// 安装插件
// 目的：让每一个组件都有$store
const install = (_Vue)=>{
    Vue = _Vue;
    //给每一个组件都注册一个beforeCreate
    Vue.mixin({
        beforeCreate(){
            console.log(this.$options.name)
            if (this.$options && this.$options.store) {
                //根
                this.$store = this.$options.store;
            } else {
                //子
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}

export default {
    install, Store
}