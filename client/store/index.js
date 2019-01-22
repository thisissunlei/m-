import model from 'model'
import dealDate from '../util/dealDate'

export default {
  state: {
    cityList: [],
    hot: [],
    wait: [],
    env: [],
    banner: [],
    member:[]
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
    getFocusBanner({commit}, data) {
      return model.getFocusBanner(data)
        .then(res => {
          commit('setFocusBanner', res.items)
        })
        .catch(err => {
          console.log('focusBanner', err)
        })
    },
    getIndexMember({commit},data) {
      return model.getIndexMember(data)
        .then(res => {
          commit('setIndexMember',res.items)
        })
        .catch(err => {
          console.log('indexMember',err);
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
    setIndexMember(state,data){
      state.member = data;
    },
    // setWelfareList( state,data ) {
    //   state.welfare = data;
    // },

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
    throwIndexMemberList(state){
      return state.member
    }
  }
}
