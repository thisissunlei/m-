import model from 'model'
import dealDate from '../util/dealDate'

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
      let lists = data.items.map(item=>{
        let time = ''
        let start = dealDate.dateToArray(item.beginTime);
        let end = dealDate.dateToArray(item.endTime);
        console.log("start,end",start,end);

        if (start[2] == end[2] && start[1] == end[1] && start[0] == start[0]) {
          time = `${start[0]}年${start[1]}月${start[2]}日 ${
            start[3]
          }:${start[4]}-${end[3]}:${end[4]}`;
        } else {
          time = `${start[0]}年${start[1]}月${start[2]}日-${
            end[1]
          }月${end[2]}日`;
        }
        item.time = time;
        return item;
    })
    state.totalCount = data.totalCount;
    state.activityList = lists;
      // state.activityList = data.items;
    },
    setActivityDetail(state,data){
      state.activityDetail = data.items;
    }
  }
}
