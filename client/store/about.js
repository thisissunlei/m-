import model from 'model'


export default {
  state: {
    newsList:[],
    newsDetail:{},
    totalPages:0,
    page:1,
  },
  // action去commit哪个mutation
  actions: {
    getNewsList({ commit },formData){
      return model.getNewsList(formData)
        .then(data => {
          commit('setList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getNewsDetail({ commit },formData){
      return model.getNewsDetail(formData)
        .then(data => {
          commit('setDetail', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  // 只有mutations才能改变state
  mutations: {
    setList(state,data){
      state.newsList = [].concat(state.newsList,data.items);
      state.totalPages = data.totalPages;
      state.page = data.page;
    },
    setDetail(state,data){
      state.newsDetail = data.items;
    },
  }
}
