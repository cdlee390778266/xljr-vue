import Vue from 'vue'
import App from './App.vue'

import router from './router/router'
import ElementUI from 'element-ui'
import utils from './js/utils'
import '../static/font-awesome-4.7.0/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.utils = utils

Vue.config.productionTip = false

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
