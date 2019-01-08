import model from 'model'
import dealDate from '../util/dealDate'

export default {
  state: {
    cityList: [],
    hot: [],
    wait: [],
    env: [],
    activity: [],
    banner: [],
    welfare: [],
    welfareTags: [],
    welfareDetail: []
  },
  actions: {
    getIndexCityList({ commit }, data) {
      return model.getIndexCityDownList(data)
        .then(res => {
          commit('setIndexCityList', res.items)
        })
        .catch(err => {
          console.log('cityList', err)
        })
    },
    // 热门社区
    getIndexHotCommunity({ commit }, data) {
      return model.getIndexHotCommunity(data)
        .then(res => {
          commit('setIndexHotCommunity', res)
        })
        .catch(err => {
          console.log('hotList', err)
        })
    },
    // 待开业社区
    getIndexWaitCommunity({ commit }, data) {
      return model.getIndexWaitCommunity(data)
        .then(res => {
          commit('setIndexWaitCommunity', res.items)
        })
        .catch(err => {
          console.log('waitList', err)
        })
    },
    // 社区环境
    getIndexOfficeEnv({ commit }, data) {
      return model.getIndexOfficeEnv(data)
        .then(res => {
          commit('setIndexOfficeEnv', res)
        })
        .catch(err => {
          console.log('officeList', err)
        })
    },
    // 福利列表
    getIndexWelfare({ commit },data) {
      return model.getWelfareList(data)
      .then (res => {
        commit('setWelfareList',res.items)
      })
      .catch(err => {
        console.log('welfareList', err)
      })
    },
    // 福利标签
    getPorCouponTags({ commit }, data ) {
      return model.getPorCouponTags(data)
      .then (res => {
        // console.log("welfareList",res);
        commit('setPorCouponTags',res)
      })
      .catch(err => {
        console.log('welfareList', err)
      })
    },
    // 福利详情
    getBenefitsDetail({ commit }, data ) {
      return model.getBenefitsDetail(data)
      .then (res => {
        // console.log("welfareList",res);
        commit('setBenefitsDetail',res)
      })
      .catch(err => {
        console.log('welfareList', err)
      })
    },
    getIndexActivityList({ commit }, data) {
      return model.getIndexActivityList(data)
        .then(res => {
          commit('setIndexActivityList', res.items)
        })
        .catch(err => {
          console.log('activityList', err)
        })
    },
    getFocusBanner({commit}, data) {
      return model.getFocusBanner(data)
        .then(res => {
          commit('setFocusBanner', res.items)
        })
        .catch(err => {
          console.log('focusBanner', err)
        })
    }
  },
  mutations: {
    setIndexCityList(state, data) {
      state.cityList = data
    },
    setIndexHotCommunity(state, data) {
      state.hot = data
    },
    setIndexWaitCommunity( state, data ) {
      state.wait = data
    },
    setIndexOfficeEnv( state, data ) {
      state.env = data
    },
    setWelfareList( state,data ) {
      state.welfare = data;
    },
    setPorCouponTags( state,data) {
      state.welfareTags = data;
    },
    setBenefitsDetail(state,data) {
      state.welfareDetail = data;
    },
    setIndexActivityList( state, data ) {
      data.forEach((val, i) => {
        let start = dealDate.dateToArray(val.beginTime);
        val.time = `${start[0]}年${start[1]}月${start[2]}日 ${start[3]}:${start[4]}:${start[5]}`;
      })
      state.activity = data
    },
    setFocusBanner( state, data ) {
      state.banner = data
    }
  },
  getters: {
    throwIndexCityList(state) {
      return state.cityList
    },
    throwIndexHotCommunity(state) {
      return state.hot
    },
    throwIndexWaitCommunity(state) {
      return state.wait
    },
    throwIndexOfficeEnv(state) {
      return state.env
    },
    throwIndexActivityList(state) {
      return state.activity
    }
  }
}
