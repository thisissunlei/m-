//   import model from 'model'
// import dealDate from '../util/dealDate'

// // 活动
// export default {
//   state: {
//     recommendActivity:[],
//     activityList:[],
//     activityDetail:[]
//   },
//   actions: {
//     getRecommendActivity({ commit },params){
//       return model.getRecommendActivity(params)
//         .then(data => {
//           commit('setRecommendActivity', data)
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     },
//     getActivityList({ commit },params){
//       return model.getActivityList(params)
//         .then(data => {
//           commit('setActivityList', data)
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     },
//     getActivityDetail({ commit },params){
//       return model.getActivityDetail(params)
//         .then(data => {

//           commit('setActivityDetail', data)
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     },
//   },
//   mutations: {
//     setRecommendActivity(state,data){
//       state.recommendActivity = data.items;
//     },
//     setActivityList(state,data){
//       let lists = data.items.map(item=>{
//         let time = ''
//         let start = dealDate.dateToArray(item.beginTime);
//         let end = dealDate.dateToArray(item.endTime);
//         console.log("start,end",start,end);

//         if (start[2] == end[2] && start[1] == end[1] && start[0] == start[0]) {
//           time = `${start[0]}年${start[1]}月${start[2]}日 ${
//             start[3]
//           }:${start[4]}-${end[3]}:${end[4]}`;
//         } else {
//           time = `${start[0]}年${start[1]}月${start[2]}日-${
//             end[1]
//           }月${end[2]}日`;
//         }
//         item.time = time;
//         return item;
//     })
//     state.totalCount = data.totalCount;
//     state.activityList = lists;
//       // state.activityList = data.items;
//     },
//     setActivityDetail(state,data){
//       state.activityDetail = data.items;
//     }
//   }
// }


import model from 'model'
import dealDate from '../util/dealDate'

export default {
  state: {
    activityDetail:{},
    activityList:[],
    cityList:[],
    cityId:0,
    otherCommunity:[],
    others:[],
    // itemList: [],
    recommendActivity:[]
  },
  actions: {
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
    },
    getActivityCity({ commit,dispatch },form){
      return model.getActivityCity(form)
        .then(data => {

          let len = data.items.filter(item=>{
            if(item.cityId == form.cityId){
              return true;
            }else{
              return false
            }
          })
          data.lang = form.language;
          let formData = {
            page:1,
            pageSize:15,
            language:form.language=='zh'?'0':'1',
            cityId:'0'
          }
          if(len.length){
            formData.cityId = form.cityId
          }else{
            formData.cityId = '0'
          }
          data.cityId = formData.cityId;

          commit('setActivityCity', data)
          return dispatch('getActivityList',formData)
        })
        .catch(err => {
          console.log(err)
        })
    },
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
    getOthers({commit},form){
      return model.getOthers(form)
        .then(data => {
          commit('setOthers', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOtherCommunity({commit},){
      return model.getCommunityByip()
        .then(data => {
          commit('setOtherCommunity', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mutations: {
    setActivityDetail(state,data) {
      state.activityDetail = data;
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
          return item;
      })
      state.totalCount = data.totalCount;
      state.activityList = lists;
    },
    setActivityCity(state,data){
      let list = []
      if(data.lang == '1'){
        list = [].concat([{cityId:0,cityName:'All'}],data.items)
      }else{
        list = [].concat([{cityId:0,cityName:'全部'}],data.items)
      }
      // 城市选择最多放下13个（英文的包括全部）

      // let num = 9;
      // for(var i = 0;i<num;i++){
      //   list.push({
      //     cityName:'北京市',
      //     cityId:i+12
      //   })
      // }

      state.showNext = false;
      if(data.lang == '1' && list.length>12){
        state.showNext = true;
      }
      if(data.lang == '0' && list.length>13){
        state.showNext = true;
      }

      state.cityId = data.cityId
      state.cityList = list
    },
    setOthers(state,data){
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
      state.others = lists
    },
    setOtherCommunity(state,data){

      state.otherCommunity = data.items
    },
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
    }
  },
  getters: {
  }
}
