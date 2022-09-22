//手写
/**
 * 1.通过Vue.use(vuerouter)安装插件
 *   VueRouter.install = (Vue)=->{} 让VueRouter收到Vue实例
 *   install方法里，可以在Vue的beforeCreate生命周期中挂载$router  $route，让每个组件都有$router  $route
 *   $router 路由实例 $route 当前的路由
 * 2.初始化页面模式 hash history
 * 3.根据routes创建路由表 path--comp
 * 4.<router-link>----router--path
 * 5.<router-view/>----router--component
 */

class HistoryRoute{
  constructor(){
    this.current = null //存储当前路由状态
  }
}

class VueRouter{
  constructor(options){
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.routesMap = this.createRouterMap(this.routes)
    console.log(this.routesMap)
    this.history = new HistoryRoute()
    this.init()
  }
  init(){
    // 区分hash 和 history 做逻辑
    // 存储当前路由状态this.history.current
    if(this.mode === 'hash'){
      location.hash ? '' : location.hash = '/' //赋默认值
      window.addEventListener('load', ()=>{
        this.history.current = location.hash.slice(1) //去掉#
      })
      window.addEventListener('hashchange', ()=>{
        this.history.current = location.hash.slice(1) //去掉#
      })
    } else {
      location.pathname ? '' : location.pathname = '/' //赋默认值
      window.addEventListener('load', ()=>{
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', ()=>{ //回退
        this.history.current = location.pathname
      })
    }
  }
  // 生成路由表 path - comp
  createRouterMap(routes){
    return routes.reduce((pre,cur)=>{
      pre[cur.path] = cur.component
      return pre
    },{})
  }
}
VueRouter.install = function(Vue,opts){
  console.log(Vue,opts)
  Vue.mixin({
    beforeCreate(){
      // VueRouter挂载成功时执行
      // this是vue实例
      // this.$options是new Vue()括号里的参数
      console.log(this)
      if(this.$options && this.$options.router){
        // 参数中的router存到当前实例
        this._router = this.$options.router
        // 当前实例存到_root
        this._root = this
        console.log(this._router, this._root._router)
        //若history中current变化，则触发刷新视图
        Vue.util.defineReactive(this, '', this._router.history);
      }else{ //为子组件时候走这
        this._root = this.$parent._root
      }
      Object.defineProperty(this,'$router',{
        get(){
          return this._router;
        }
      })
      Object.defineProperty(this,'$route',{
        get(){
          return {
            current: this._router.history.current
          }
        }
      })
    }
  })
  Vue.component('router-link',{
    props:{
      to: String
    },
    render() {
      // this._self才是vue实例
      let mode = this._self._root._router.mode
      return <a href={mode === 'hash' ? `#${this.to}` : this.to}>
        {/* <router-link>内容</router-link>，用插槽获取router-link里的内容 */}
        {this.$slots.default}
      </a>
    },
  })
  /**
   * 流程：router-link生成a标签，点击更换链接
   * init()里监听到变化,把链接存到history.current
   * router-view执行的时候通过_routesMap[_routesCurrent]找到要渲染的组件执行h(组件)
   */
  Vue.component('router-view',{
    render(h) {
      let _routesMap = this._self._root._router.routesMap
      let _routesCurrent = this._self._root._router.history.current
      return h(_routesMap[_routesCurrent])
    },
  })
}
export default VueRouter