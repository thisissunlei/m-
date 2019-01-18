import model from 'model'

export default {
  state: {
    cbdList: [],
    priceList: {},
    list: {}
  },
  actions: {
    getNewCommunityCbds({ commit } , data) {
      return model.getCommunityCbds(data)
        .then(res=>{
          commit('setNewCommunityCbds', res)
        })
        .catch(err =>{
          console.log(err);
        })
    },
    getNewCommunityStatus({ commit },data) {
      return model.getCommunityStatus(data)
        .then(data => {
          commit('setNewCommunityStatus', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getNewCommunityList({ commit }, data) {
      return model.getCommunityList(data)
        .then(res => {
          let info = {
            res: res,
            data: data
          }
          commit('setNewCommunityList', info)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mutations: {
    setNewCommunityCbds(state, data) {
      state.cbdList = data
    },
    setNewCommunityStatus(state, data) {
      state.priceList = data
    },
    setNewCommunityList(state, data) {
      let list = state.list
      if ( data.data.page === 1 ) {
        list.items = [].concat(data.res.items)
        state.list = list
        console.log(state.list)
      } else {
        list.items = list.items.concat(data.res.items)
        state.list = list
      }
    },
  },
  getters: {
    throwCommunityCbdList(state) {
      return state.cbdList
    },
    throwCommunityPriceList(state) {
      return state.priceList
    },
    throwCommunityList(state) {
      return state.list
    }
  }
}
