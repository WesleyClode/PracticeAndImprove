import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Fathertoson/Fathertoson.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'fathertoson',
    meta:{
      title: '父到子通信'
    },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/direct',
    name: 'Direact',
    meta:{
      title: '指令练习'
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/Direct.vue')
  },
  {
    path: '/filter',
    name: 'FilterDemo',
    meta:{
      title: '过滤器练习'
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/FilterDemo.vue')
  },
  {
    path: '/sontofather',
    name: 'Sontofather',
    meta:{
      title: '子到父通信'
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/Sontofather/Sontofather.vue')
  },
  {
    path: '/fathertoson',
    name: 'Fathertoson',
    meta:{
      title: '父到子通信'
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/Fathertoson/Fathertoson.vue')
  },
  {
    path: '/brother',
    name: 'Brother',
    meta:{
      title: '兄弟组件通信'
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/Brother.vue')
  },
  {
    path: '/menuSwitch',
    name: 'MenuSwitch',
    meta:{
      title: '菜单左右切换'
    },
    component: () => import('../components/MenuSwitch/MenuSwitch.vue'),
    children:[
      {
        path: 'menuSwitchFirst', //也可以/menuSwitchFirst
        name: 'menuSwitchFirst',
        component: () => import('../components/MenuSwitch/menuSwitchFirst.vue'),
      },
      {
        path: 'menuSwitchSecond', //也可以/menuSwitchSecond
        name: 'menuSwitchSecond',
        component: () => import('../components/MenuSwitch/menuSwitchSecond.vue'),
      }
    ]
  },
  {
    path: '/trendComponent',
    name: 'TrendComponent',
    meta:{
      keepAlive: true,
      title: '动态组件'
    },
    component: () => import('../components/TrendComponent/TrendComponent')
  },
  {
    path: '/slot',
    name: 'Slot',
    meta:{
      title: '插槽slot'
    },
    component: () => import('../components/Slot/SlotContent')
  },
  {
    path: '/watch-computed',
    name: 'Watch-computed',
    meta:{
      title: '监听和计算属性'
    },
    component: () => import('../components/WatchComputed/WatchComputed')
  },
  {
    path: '/mixin',
    name: 'Mixin',
    meta:{
      title: 'Mixin混入'
    },
    component: () => import('../components/Mixin/one')
  },
  {
    path: '/mimixinTwo',
    name: 'Mixin-two',
    meta:{
      title: 'Mixin混入-two'
    },
    component: () => import('../components/Mixin/two')
  },
  {
    path: '/vuex',
    name: 'Vuex',
    meta:{
      title: 'vuex练习'
    },
    component: ()=> import('../components/vuex/index')
  },
  {
    path: '/waterFull',
    name: 'waterFull',
    meta:{
      title: '瀑布流练习'
    },
    component: ()=> import('../components/waterFull/index')
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router
