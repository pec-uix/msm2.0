import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppSnackbar from './components/AppSnackbar.vue'
import AppLoading from './components/AppLoading.vue'
import StatusBadge from './components/StatusBadge.vue'

Vue.config.productionTip = false
Vue.component('AppSnackbar', AppSnackbar)
Vue.component('AppLoading', AppLoading)
Vue.component('StatusBadge', StatusBadge)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
