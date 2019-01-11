import Vuex from 'vuex'

import common from './common'
import visit from './visit'
import index from './index'
import activity from './activity'
import welfare from './welfare'
import about from './about'

let isDev = process.env.NODE_ENV === 'development'
export default () => {
  let store = new Vuex.Store({
    strict: isDev,
    modules: {
      common,
      index,
      visit,
      activity,
      welfare,
      about,
    }
  })

  if (module.hot) {
    module.hot.accept([
      './common',
      './index',
      './visit',
      './activity',
      './welfare',
      './about'
    ], () => {
      let common = require('./common').default
      let index = require('./index').default
      let visit = require('./visit').default
      let activity = require('./activity').default
      let welfare = require('./welfare').default
      let about = require('./about').default
      store.hotUpdate({
        modules: {
          common,
          index,
          visit,
          activity,
          welfare,
          about
        }
      })
    })
  }

  return store
}
