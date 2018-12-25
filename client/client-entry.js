import 'babel-polyfill';
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import createApp from './create-app'

let { app, router, store } = createApp()

let win = typeof window == "undefined" ? global : window
if (win.__INITIAL_STATE__) {
  store.replaceState(win.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#root')
})
