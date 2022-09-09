import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

//vuex首先会被添加到根对象中
new Vue({
  name: 'root',
  store,
  render: h => h(App)
}).$mount('#app')
