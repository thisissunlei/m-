import Vuex from 'vuex'

import common from './common'
import visit from './visit'
import index from './index'
import activity from './activity'
import welfare from './welfare'
import about from './about'
import member from './member'
import community from './community'
import detail from './detail'
import calculator from './calculator'

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
      member,
      community,
      detail,
      calculator,
    }
  })

  if (module.hot) {
    module.hot.accept([
      './common',
      './index',
      './visit',
      './activity',
      './welfare',
      './about',
      './member',
      './community',
      './detail',
      './calculator',
    ], () => {
      let common = require('./common').default
      let index = require('./index').default
      let visit = require('./visit').default
      let activity = require('./activity').default
      let welfare = require('./welfare').default
      let about = require('./about').default
      let member = require('./member').default
      let community = require('./community').default
      let detail = require('./detail').default
      let calculator = require('./calculator').default
      store.hotUpdate({
        modules: {
          common,
          index,
          visit,
          activity,
          welfare,
          about,
          member,
          community,
          detail,
          calculator
        }
      })
    })
  }

  return store
}
