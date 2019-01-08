import model from 'model'

// 立即预约
export default {
  state: {
    cmtCityList:[]
  },
  // action去commit哪个mutation
  actions: {
    getCmtCityList({ commit },params){
      return model.getCmtCityList(params)
        .then(data => {
          commit('setCmtCityList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  // 只有mutations才能改变state
  mutations: {
    setCmtCityList(state,data){
      state.cmtCityList = data.items;
    },
  }
}
