import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

import newRouter from './newRouter';

Vue.use(Vuex);
Vue.use(Router);


let routes = newRouter.routes.concat({
  path: '/index',
  redirect: '/'
}, {
  path: '/',
  component: () => import('../views/index/index.vue'),
  name: 'index'
})
let router = new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link'
})
// router.beforeEach(async (to, from, next) => {
//   next()
// })

export default () => {
  return router
}
