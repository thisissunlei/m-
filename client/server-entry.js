import 'babel-polyfill';
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import createApp from './create-app'

// 接收到 server-render.js appString中传入的context
export default context => {

  return new Promise((resolve, reject) => {
    let { app, router, store } = createApp()

    router.push(context.url) // 给路由推一条记录 ? 推送到history
    /*
    * router.onReady
    * 只有服务端用 异步操作完成后进行回掉
    * 在服务端渲染时拿到数据
    */
    router.onReady(() => {
      // 通过 router.getMatchedComponents() 来获得当前匹配组件
      let matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      /*
      * 服务端渲染数
      * 在不渲染数据的情况下直接调用：
      * context.meta = app.$meta()
      * resolve(app)
      */

     store.state.common = {
      origin: context.origin,
      query: context.query,
      // queryString: context.queryString,
       queryString: '',
      headerCityList: context.cityList,
      ip: context.ip,
      headerCityId: !context.query.cityId? context.ip[0]: context.query.cityId,
      lang: context.query.lang,
      language: context.query.lang === 'en'? 1: 0,
      clientIp: context.clientIp
    }
    console.log("context",context.queryString);

    let query
    if ( context.queryUrl.indexOf('?') > 0 ) {
      query = context.queryUrl.split('?')[1].split('&')
      query.forEach((val, i) => {
        router.currentRoute.query[val.split('=')[0]] = val.split('=')[1]
      })
    }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then(data => {
        // console.log('server-entry======', store.state, '=========server-entry')
        context.meta = app.$meta()
        context.state = store.state
        context.router = router
        resolve(app)
      })
    })
  })
}
