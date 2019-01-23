import model from 'model'
// import { log } from 'util';

export default {
  state: {
    origin: '',
    queryString: '',
    query: {},
    user: null,
    url: '',
    ip: [],
    lang: '',
    language: null,
    headerCityList: [],
    headerCityId: '',
    clientIp: null,
    distinctId: ''
  },
  actions: {
    getUrl: ({ commit }) => {
      // http://ssrlocal.krspace.cn/
      let url = window.location.origin + '/';
      return commit('setUrl', url);
    },
    getHeaderCommunityByip: ({ commit }) => {
      return model.getHeaderCommunityByip()
        .then(res => { 
          commit('setHeaderCommunityByipt', res.items);
        })
        .catch(err => {})
    },
    getHeaderCityDownList: ({ commit }, data) => {
      return model.getHeaderCityDownList(data)
        .then(res => {
          commit('setHeaderCityDownList', res.items);
        })
        .catch(err => {})
    },
    getInitialState: ({ commit }, data) => {
      return commit('setInitialState', data)
    }
  },
  mutations: {
    setDistinctId: (state, data) => {
      state.distinctId = data
    },
    setUrl: (state, data) => {
      state.url = data;
    },
    setHeaderCommunityByipt(state, data) {
      console.log(data)
      state.ip = [data.cityVo.cityId, data.communityVo.communityId]
      state.headerCityId = data.cityVo.cityId
    },
    setHeaderCityDownList: (state, data) => {
      state.headerCityList = data;
    },
    setHeaderCityId: (state, data) => {
      state.headerCityId = data;
      let query = state.query
      let queryString = '/?'
      if ( state.queryString.indexOf('cityId') < 0 ) {
        state.query.cityId = data
      }
      for ( var key in query ) {
        if ( key === 'cityId' ) {
          query[key] = data
        }
        if (key != 'id' && key != 'tab' && key != 'porCbdId' && key != 'openStatus' && key != 'portalPriceId' ) {
          queryString += key + '=' + query[key] + '&'
        }
      }
      state.queryString = queryString.substr(0,queryString.length-1)
      state.query = query
    },
    setInitialState: (state, data) => {
      state.lang = data.lang;
      state.language = data.language;
    },
    setCommonLang(state, data) {
      state.lang = data;
      state.language = data === 'en'? 1: 0;
      let query = state.query
      let queryString = '/?'
      if ( state.queryString.indexOf('lang') < 0 ) {
        state.query.lang = data
      }
      for ( var key in query ) {
        if ( key === 'lang' ) {
          query[key] = data
        }
        if (key != 'id' && key != 'tab' && key != 'porCbdId' && key != 'openStatus' && key != 'portalPriceId' ) {
          queryString += key + '=' + query[key] + '&'
        }
      }
      state.queryString = queryString.substr(0,queryString.length-1)
      state.query = query
    },
    setPageQuery(state) {
      let query = state.query
      let queryString = '/?'
      for ( var key in query ) {
        if (key != 'id' && key != 'tab' && key != 'porCbdId' && key != 'openStatus' && key != 'portalPriceId' ) {
          queryString += key + '=' + query[key] + '&'
        }
      }
      state.queryString = queryString.substr(0,queryString.length-1)
    }
  },
  getters: {
    throwCommonState: state => {
      return state
    },
    throwLang: state => {
      return state.lang;
    },
    throwHeaderCityList: state => {
      state.headerCityList.forEach((item) => {
        // console.log("state.headerCityList",typeof(item.cityName),item.cityName);
        item.cityName.slice(0,1);
        // console.log("state.headerCityList2",item.cityName);
        // console.log("item",item);

      })
      return state.headerCityList;
    },
    throwHeaderCityId: state => {
      return state.headerCityId;
    },
    throwIp: state => {
      return state.ip
    },
    throwCommonQuery: state => {
      return state.query
    },
    throwClientIp: state => {
      return state.clientIp
    }
  }
}
