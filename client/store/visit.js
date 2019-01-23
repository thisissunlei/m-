import model from 'model'

// 立即预约
export default {
  state: {
    cmtCityList: [],
    defaultCity: "",
    cityDownList: [],
    submitInfo: "",
    visitCityList: []
  },
  // action去commit哪个mutation
  actions: {
    //获取所有社区信息
    getCmtCityList({
      commit
    }, params) {
      return model.getCmtCityList(params)
        .then(data => {
          commit('setCmtCityList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交预约信息接口
    getVisitInfo({
      commit
    }, params) {
      return model.getVisitInfo(params)
        .then(data => {
          commit('sussuseSumbit', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  // 只有mutations才能改变state
  mutations: {
    // 获取默认地址展示数据
    setDefaultCity(state, data) {
        // state.defaultCity = 
    },
    //获取预约下拉的城市名称从社区接口中获得
    setVisitCityList(state) {  
      console.log(state.cmtCityList)
      state.visitCityList = state.cmtCityList.map(val => {
        return val.cityName
      })
    },
    //获取社区信息
    setCmtCityList(state, data) {
      state.cmtCityList = data.items;
    },
    //提交信息成功
    sussuseSumbit(state, data) {
      // state.cmtCityList = data.items;
      console.log(data)
    },
    //选择并且修改信息
    modifydefaultCity(state, data) {
      state.defaultCity = data;
    },
  },
  getters: {
    // 处理默认展示数据
    computerDefault(state) {

      return state.defaultCity
    },
    // 处理默认数据
  }
}
