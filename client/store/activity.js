import model from 'model'

// 活动
export default {
  state: {
    recommendActivity:[],
    activityList:[],
    activityDetail:[]
  },
  actions: {
    getRecommendActivity({ commit },params){
      return model.getRecommendActivity(params)
        .then(data => {
          commit('setRecommendActivity', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getActivityList({ commit },params){
      return model.getActivityList(params)
        .then(data => {
          commit('setActivityList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getActivityDetail({ commit },params){
      return model.getActivityDetail(params)
        .then(data => {

          commit('setActivityDetail', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mutations: {
    setRecommendActivity(state,data){
      state.recommendActivity = data.items;
    },
    setActivityList(state,data){
      state.activityList = data.items;
    },
    setActivityDetail(state,data){
      state.activityDetail = data.items;
    }
  }
}
