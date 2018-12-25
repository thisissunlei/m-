import axios from 'axios'
import Qs from "qs";
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

// console.log(process.env.VUE_ENV, process.env.NODE_ENV, '11111111111------=========')
//http://optest02.krspace.cn
let url = ''
if ( process.env.NODE_ENV === 'development' ) {
  url = 'https://i.krspace.cn/'
} else {
  url = 'https://i.krspace.cn/'
}
let request = axios.create({
  baseURL: url
})

let handleRequest = function(request){
  return new Promise((resolve, reject) => {
    request.then(resp => {
      let data = resp.data
      if ( data.code === 1 ) {
        resolve(data.data)
      } else {
        let message = data
        reject(message)
        // console.log('1---------------', data, '---------------1')
      }
    }).catch(err => {
      let message = err.response.data
      reject(message)
    })
  })
}
// 添加接口API
export default {
  getCommunity () {
    return handleRequest(request.get('api/gateway/portals/get-community'))
  },
  getActivityDetail (data) {
    return handleRequest(request.get('api/gateway/portalthree/activity-detail',{params: data}))
  },
  getActivityList(data) {
    return handleRequest(request.get('api/gateway/portalthree/activity-list', {params: data}))
  },
  getActivityCity(data){
    // return handleRequest(request.get('api/gateway/portalthree/city/down-list', {params: data}))

    return handleRequest(request.get('api/gateway/portalthree/activity-city',{params: data}))
  },
  getCommunityByip() {
    return handleRequest(request.get('api/gateway/get-community-byip'))
  },
  getCommunityDetail (data) {
    return handleRequest(request.get('api/gateway/portalthree/community-detail',{params: data}))
  },
  getCommunityWork (data) {
    return handleRequest(request.get('api/gateway/portalthree/office-type',{params: data}))
  },
  getCommunityActivity (data) {
    return handleRequest(request.get('api/gateway/portalthree/activity-cmt-other',{params: data}))
  },
  getSameCommunity(data){
    return handleRequest(request.get('api/gateway/portalthree/same-cmt',{params: data}))
  },
  getOthers(data){
    return handleRequest(request.get('api/gateway/portalthree/activity-cmt-other'))
  },
  getRecommend(data){
    return handleRequest(request.get('api/gateway/portalthree/recommend-activity', {params: data}))
  },
  getNews(data){
    return handleRequest(request.get('api/gateway/get-protals-news/list', {params: data}))
  },
  // getCommunityCitys(){
  //   return handleRequest(request.get('api/gateway/portalthree/city/down-list'))
  // },
  getCommunityCbds(data){
    return handleRequest(request.get('api/gateway/portalthree/cmt-cbd', {params: data}))
  },
  getCommunityStatus(data){
    // console.log("data",data);
    return handleRequest(request.get('/api/gateway/portalthree/status/seat-price',{params: data}))
  },
  getCommunityList(data){
    return handleRequest(request.get('/api/gateway/portalthree/cmt-listing',{params: data}))
  },
  getOfficeEnv(data) {
    return handleRequest(request.get('/api/gateway/portalthree/office-env-detail', {params: data}))
  },
  getSameEnv(data) {
    return handleRequest(request.get('/api/gateway/portalthree/same-env-cmt', {params: data}))
  },
  getHeaderCityDownList(data) { // 头部城市下拉列表
    return handleRequest(request.get('api/gateway/portalthree/city/down-list', {params: data}))
  },
  getIndexCityDownList(data) { // 首页城市社区列表
    return handleRequest(request.get('api/gateway/portalthree/cmt-city/down-list', {params: data}))
  },
  getNewsList(data){
    return handleRequest(request.get('api/gateway/portalthree/news-list', {params: data}))
  },
  getNewsDetail(data){
    return handleRequest(request.get('api/gateway/portalthree/news-detail', {params: data}))
  },
  getNewsPage(data){
    return handleRequest(request.get('api/gateway/portalthree/news-page', {params: data}))
  },
  getIndexHotCommunity(data) { // 首页热门社区列表
    return handleRequest(request.get('api/gateway/portalthree/popular-community', {params: data}))
  },
  getIndexWaitCommunity(data) { // 首页待开社区列表
    return handleRequest(request.get('api/gateway/portalthree/community-will-open', {params: data}))
  },
  getIndexOfficeEnv(data) { // 首页办公环境列表
    return handleRequest(request.get('api/gateway/portalthree/office-env', {params: data}))
  },
  getIndexActivityList(data) { // 首页社区活动列表
    return handleRequest(request.get('api/gateway/portalthree/activity-list', {params: data}))
  },
  saveVisitInfo(data) { // 预约参观
    return handleRequest(request.post('api/gateway/portals/save-visit-info', Qs.stringify(data)))
  },
  postRecommend(data) {
    return handleRequest(request.post('api/gateway/allportals/referee/addreferee', Qs.stringify(data)))
  },
  getHeaderCommunityByip(data) { // ip定位
    return handleRequest(request.get('api/gateway/portalthree/get-community-byip', {params: data}))
  },
}
