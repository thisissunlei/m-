import model from 'model'
import dealDate from '../util/dealDate'

export default {
  state: {
    detail: {},
    list: [],
    tags: [],
    others: [],
    recommend: [],
    totalCount: 0,
    comList: [],
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
            // console.log('=======>',data)
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
                data.getType = 'all'
                commit('setList', data) //福利列表
            }else if(formData.otherId){
                commit('setOthers',data) //详情页的其他福利
            } else if (formData.cmtId) {
              commit('setComList',data) //详情页的其他福利
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
      console.log("888",data.getType);

      if(data.getType === 'all'){
          // state.list = data.items;
          state.list = [].concat(state.list,data.items);
          state.totalCount = data.totalCount
          state.totalPages = data.totalPages;
        }
    },
    setRecommend(state,data){
        state.recommend = data.items;
    },
    setOthers(state,data){
        state.others = data.items;
    },
    setComList(state, data) {
      state.comList = data.items;
    }
  },
  getters: {
  }
}
