import Vue from 'vue'
// import Vuex from 'vuex' //引用三方库
import Vuex from './selfvuex'  //使用自定义vuex.js

Vue.use(Vuex)  //使用插件

//每一个vue实例中都有一个属性$store
export default new Vuex.Store({
  state: {
    num: 1
  },
  getters: {
    getNum(state) {
      return state.num;
    }
  },
  mutations: {  //同步
    //payload---传入参数
    syncAdd(state, payload) {
      state.num += payload;
    },
    syncMinus(state, payload) {
      state.num -= payload;
    }
  },
  actions: {  //异步
    asyncAdd({commit, dispatch}, payload) {
      //模拟ajax
      setTimeout(()=>{
        //调用mutation
        commit("syncAdd", payload);
      }, 1000)
    }
  },
  modules: { // 业务逻辑拆分 不同的业务数据
    it: {
      state: {
        count: 100
      },
      getters: {
        getCount(state){
          return state.count;
        }
      },
      mutations: {
        syncAdd(state, payload){
          state.count += 20;
        }
      },
      modules: {
        java: {
          state: {
            n: 10
          }
        }
      }
    },
    hr: {
      state: {
        count: 8
      }
    }
  }
})
