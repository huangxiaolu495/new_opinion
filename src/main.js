// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '@/store/store'
import EasyScroll from 'easyscroll'
import '@/common/extend.js';
import '@/style/common.css';
import '@/style/queryCondition.css';
import '@/style/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/index.js';
import ElementUI from 'element-ui';

Vue.config.productionTip = false
Vue.prototype.$_axios = axios;
Vue.use(EasyScroll);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
