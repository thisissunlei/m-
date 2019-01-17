import model from 'model'
import dealDate from '../util/dealDate'

export default {
  state: {
    recommendActivity:[],
    activityList:[],
    activityDetail:{},
    page:1,
    totalPages:0
  },
  actions: {
    getRecommend({commit},formData){
      console.log(formData)
      return model.getRecommendActivity(formData)
        .then(data => {
          commit('setRecommend', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getActivityList ({ commit },formData) {
      return model.getActivityList(formData)
        .then(data => {
          commit('setActivityList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getActivityDetail ({ commit },formData) {
      return model.getActivityDetail(formData)
        .then(data => {
          let time = ''
          data = data.items
          let start = dealDate.dateToArray(data.beginTime);
          let end = dealDate.dateToArray(data.endTime);
          if (start[2] == end[2] && start[1] == end[1] && start[0] == start[0]) {
            time = `${start[0]}年${start[1]}月${start[2]}日 ${
              start[3]
            }:${start[4]}-${end[3]}:${end[4]}`;
          } else {
            time = `${start[0]}年${start[1]}月${start[2]}日-${
              end[1]
            }月${end[2]}日`;
          }
          data.time = time;
          commit('setActivityDetail', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mutations: {
    setRecommend(state,data){
      let lists = data.items.map(item=>{
          let time = ''
          let start = dealDate.dateToArray(item.beginTime);
          let end = dealDate.dateToArray(item.endTime);
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
      state.recommendActivity = lists
    },
    setActivityList(state,data) {
      let lists = data.items.map(item=>{
          let time = ''
          let start = dealDate.dateToArray(item.beginTime);
          let end = dealDate.dateToArray(item.endTime);
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
          // console.log("888",item.time);
          return item;
      })
      state.totalPages = data.totalPages;
      state.activityList = [].concat(state.activityList,lists);
      // state.activityList = lists;
    },
    setActivityDetail(state,data) {
      state.activityDetail = data;
    }
  },
  getters: {
  }
}
