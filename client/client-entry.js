import 'babel-polyfill';
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import Vue from 'vue';
import createApp from './create-app'
// import 'amfe-flexible/index.js';
import 'swiper/dist/css/swiper.css'

if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

// import wcSwiper from 'wc-swiper'
// import 'wc-swiper/style.css'
// Vue.use(wcSwiper);

let { app, router, store } = createApp()

let win = typeof window == "undefined" ? global : window
if (win.__INITIAL_STATE__) {
  store.replaceState(win.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#root')
})
