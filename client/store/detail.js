import model from 'model'

export default {
  state: {
    list:{},
    officeType:{}
  },
  actions: {
    getNewCommunityDetails({commit} , data) {
      return model.getCommunityDetails(data)
        .then( res => {
          commit('setNewCommunityDetails', res)
        })
        .catch( err => {
          console.log(err);
        })
    },
    getNewOfficeType({commit} , data) {
      return model.getOfficeType(data)
        .then( res => {
          commit('setNewOfficeType', res)
        })
        .catch( err => {
          console.log(err)
        })
    }

  },
  mutations: {
    setNewCommunityDetails(state, data) {
      state.list = data
    },
    setNewOfficeType(state, data) {
      state.officeType = data
    }
  },
  getters: {
    throwCommunityDetails(state) {
      return state.list
    },
    throwOfficeType(state) {
      return state.officeType
    }

  }
}
