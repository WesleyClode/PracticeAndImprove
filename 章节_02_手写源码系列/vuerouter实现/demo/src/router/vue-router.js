//手写
//1.vuerouter  每个组件都有$router  $route
//$router 路由实例 $route 当前的路由
//2.初始化页面模式 hash history
//3.根据routes创建路由表 path--comp
//4.<router-link>----router--path
//5.<router-view/>----router--component

//记录当前页面url状态
class HistoryRoute {
    constructor(){
        this.current = null; //存储当前路由状态
    }
}

class VueRouter {
    constructor(options){
        //mode
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        //根据routes创建路由表{"/home":Home, "/about":About}
        this.routesMap = this.createRouterMap(this.routes);
        // console.log(this.routesMap)
        this.history = new HistoryRoute();
        this.init();
    }
    init(){
        //对页面模式监听
        if (this.mode === 'hash') {
            location.hash ? '' : location.hash = "/"; //默认值
            //需要记录当前页面url状态
            window.addEventListener("load", ()=>{
                this.history.current = location.hash.slice(1); //去掉#
            })
            window.addEventListener("hashchange", ()=>{
                this.history.current = location.hash.slice(1); //去掉#
            })
        } else { //history
            location.pathname ? '' : location.pathname = "/";
            window.addEventListener("load", ()=>{
                this.history.current = location.pathname;
            })
            window.addEventListener("popstate", ()=>{
                this.history.current = location.pathname;
            })
        }
    }
    //创建路由表 -- 多层嵌套
    createRouterMap(routers) {
        //{"/home":Home, "/about":About}
        return routers.reduce((obj, current)=>{
            obj[current.path] = current.component;
            return obj;
        }, {})
    }
}

//安装插件
VueRouter.install = function(Vue, opts){
    //给所有组件添加beforeCreate()---再添加$router
    Vue.mixin({
        beforeCreate(){
            console.log(this.$options.name)
            if (this.$options && this.$options.router) {
                //root
                this._root = this; //将当前实例挂载_root
                this._router = this.$options.router; //当前路由实例
                //若history中current变化，则触发刷新视图
                Vue.util.defineReactive(this, '', this._router.history);
            } else {
                //child
                this._root = this.$parent._root;
            }
            //$router
            Object.defineProperty(this, "$router", {
                get(){
                    return this._root._router;
                }
            })
            Object.defineProperty(this, "$route", {
                get(){
                    return {
                        current: this._root._router.history.current
                    }
                }
            })
        }
    })
    //<router-link>
    Vue.component('router-link', {
        props: {
            to: String
        },
        render() {
            // console.log(this._self._root._router.mode)
            let mode = this._self._root._router.mode
            return <a href={mode === 'hash' ? `#${this.to}` : this.to}>
                {this.$slots.default}
            </a>
        }
    })
    Vue.component('router-view', {
        render(h) { //h----vue.createElement
            // return <h1>xxxxx</h1>
            // console.log(this._self._root._router)
            let current = this._self._root._router.history.current; //当前路由name
            let _routesMap = this._self._root._router.routesMap; //路由实例
            let curComp = _routesMap[current]; //当前路由name对应组件
            console.log(current, curComp)
            return h(curComp);
        }
    })
}

export default VueRouter