import Vuex from 'vuex'

import common from './common'

let isDev = process.env.NODE_ENV === 'development'
export default () => {
  let store = new Vuex.Store({
    strict: isDev,
    modules: {
      common
    }
  })

  if (module.hot) {
    module.hot.accept([
      './common'
    ], () => {
      let common = require('./common').default

      store.hotUpdate({
        modules: {
          common
        }
      })
    })
  }

  return store
}
