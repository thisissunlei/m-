import model from 'model'

export default {
  state: {
  	memberList: [],
  	teamList: [],
  	memberDetail: {},
  	teamDetail: {},
  	loading: false,
  	page:1,
  	pageSize: 15,
  	totalPage: 1,
    picList : 0,
  },
  actions: {
  	getList({ commit }, data) {
  		return model.getMemberList(data)
        .then(res => {
          commit('setMemberList', res)
        })
        .catch(err => {
          console.log('cityList', err)
        })
  	},
  	getTeamList({ commit }, data) {
  		return model.getCometTeamList(data)
        .then(res => {
          commit('setTeamList', res)
        })
        .catch(err => {
          console.log('cityList', err)
        })
  	},
  	getMemberDetail({ commit ,dispatch}, data) {
  		return model.getPorNewsDetails(data)
        .then(res => {
          commit('setMemberDetail', res);
          // let teamId = res.protalsNewsVo.teamId;
          // return dispatch('getTeamDetail',{teamId:teamId})
        })
        .catch(err => {
          console.log('cityList', err)
        })
  	},
  	getTeamDetail({ commit }, data){
  		return model.getTeamDetail(data)
        .then(res => {
          commit('setTeamDetail', res)
        })
        .catch(err => {
          console.log('cityList', err)
        })
  	},
    setNewsCount({ commit }, data){
      return model.setNewsRead(data)
        .then(res => {
          console.log('setNewsCount')
          // commit('setTeamDetail', res)
        })
        .catch(err => {
          console.log('cityList', err,data)
        })
    }

  },
  mutations:{
  	setMemberList(state, data) {
  		state.memberList = [].concat(state.memberList,data.items);
      state.page = data.page;
      state.totalPages = data.totalPages;
    },
    setTeamList(state, data){
    	state.teamList = data.items;
    },
    setMemberDetail(state, data){
      if(data.porTeamDetailVo.introPicList){
        state.picList = data.porTeamDetailVo.introPicList.length;
      }
    	state.memberDetail = data;
    	// state.teamDetail = data.porTeamDetailVo;
    },
    setTeamDetail(state, data){
    	state.teamDetail = data.items;
    }


  }
}
