// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView, { Notice } from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css'
import {setup} from '@/config'
import {apisCallback} from '@/apis'
// import '@/theme/iview.css'

Vue.use(iView)
Vue.config.productionTip = false

Vue.prototype.$Notice = Notice

Date.prototype.test = 1

setup().then(configJSON => {
  apisCallback(configJSON)

  // console.log('setup then called')
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}).catch(err => {
  throw err
})
