import model from 'model'
import dealDate from '../util/dealDate'

export default {
  state: {
    detail: {},
    list: [],
    tags: [],
    recommend: [],
    totalCount: 0,
    totalPages:0,
    page:1
  },
  actions: {
    getWelfareDetail ({ commit },formData) {//福利详情
      return model.getBenefitsDetail(formData)
        .then(data => {
          commit('setWelfareDetail', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getWelfareTags({ commit,dispatch },formData){//福利标签
      return model.getPorCouponTags(formData)
        .then(data => {
            data = data.items.map(item=>{
                let obj = item;
                obj.tagId = item.tagIds.join();
                return obj;
            })
          commit('setTags', data)
        //   return dispatch('getActivityList',formData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getWelfareList ({ commit },formData) {
      return model.getWelfareList(formData)
        .then(data => {
            if(formData.sort){
                commit('setRecommend',data) //推荐福利
            }else if(formData.tags){
                // data.getType = 'all'
                commit('setList', data) //福利列表
            }
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mutations: {
    setWelfareDetail(state,data) {
      state.detail = data;
    },
    setTags(state,data) {
        state.tags = data;
    },
    setList(state,data) {
      // console.log("888",data.getType);
      state.page = data.page
      state.totalPages = data.totalPages;
      state.totalCount = data.totalCount;
      if(state.page < 2){
          state.list = data.items;
        }else{
          state.list = [].concat(state.list,data.items);
        }
    },
    setRecommend(state,data){
        state.recommend = data.items;
    },

  },
  getters: {
  }
}
