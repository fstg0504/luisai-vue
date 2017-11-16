// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'
import './assets/bootstrap-3.3.5-dist/js/bootstrap.min.js'
import './assets/bootstrap-3.3.5-dist/css/bootstrap.min.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/css/base.less'

window.$ = $
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
