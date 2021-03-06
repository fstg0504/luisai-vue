// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import './assets/bootstrap-3.3.5-dist/js/bootstrap.min.js'
import './assets/bootstrap-3.3.5-dist/css/bootstrap.min.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/css/base.less'

axios.defaults.baseURL = process.env.BASE_API
// axios.defaults.baseURL = '/api'
axios.defaults.transformRequest = [function (data) {
  // Do whatever you want to transform the data
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]
Vue.prototype.$http = axios
// Vue.prototype.HOST = '/api'

window.$ = $
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
