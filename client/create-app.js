/*
* 每次服务端渲染都要渲染一个新的app
* 为防止server端内存溢出
* 放初始化内容
* 入口文件
*/
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';

import App from './app.vue';
import createStore from './store/store';
import createRouter from './config/router';

import VueI18n from 'vue-i18n';
// import BScroll from 'better-scroll'

// 在入口文件中引入(暂时不支持单组件引入的方式):

// import wcSwiper from 'wc-swiper'
// import 'wc-swiper/style.css'
// Vue.use(wcSwiper);



// import 'swiper/dist/css/swiper.css'
import { Picker } from 'mint-ui';

Vue.component(Picker.name, Picker);
import { Popup } from 'mint-ui';

Vue.component(Popup.name, Popup);
// if (process.browser) {
//   const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
//   Vue.use(VueAwesomeSwiper)
// }

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(Meta);


/**
 * 多语言配置
 * Object.assign(zh,app_zh)
 * zh       : iview 语言包
 * app_zh   : App Json语言包
 */
import en from './util/en';
import zh from './util/zh';
Vue.locale = () => {};

let messages = {
  en: Object.assign(en, {}),
  zh: Object.assign(zh, {})
};

let i18n = new VueI18n({
  locale: 'zh',  // set locale
  messages  // set locale messages
});

/*
* h 是vue的方法 create vue 挂载组件app*/
export default () => {
  let router = createRouter();
  let store = createStore();

  let app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  })

  return { app, router, store }
}
