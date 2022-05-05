import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
import md5 from 'js-md5'
import EventEmitter from "events";
window._event = new EventEmitter()
// 引入全局css
import './assets/scss/style.scss';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
import Loading from "./views/three1/loading/loading";
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入echart
//4.x 引用方式
import echarts from 'echarts'
//5.x 引用方式为按需引用
//希望使用5.x版本的话,需要在package.json中更新版本号,并切换引用方式
//import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;

// 全局注册
Vue.component('icon', Icon);
Vue.use(dataV);
Vue.use(Loading);
Vue.use(ElementUi);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
// if(md5(prompt("请输入"))=== 'fae0b27c451c728867a567e8c1bb4e53'){
//   new Vue({
//     router,
//     store,
//     render: (h) => h(App),
//   }).$mount('#app')
// }

