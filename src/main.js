import Vue from 'vue'
import App from './App.vue'
import router from './router'

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
