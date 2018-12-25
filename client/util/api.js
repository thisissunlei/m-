import axios from 'axios'
// import http from 'http'
// import url from 'url'
// import Cookies from 'js-cookie'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

let apiResult = {
  ax: null,
  fetch(ax){
    this.ax = ax
    return this
  },
  then(successed, failed){
    if (!this.ax)
      return
    return this.ax.then(res => {
      if (res.data.code === 1) {
        if (successed)
          successed(res.data)
      } else {
        failed(res.data)
      }
    }).catch(error => {
      if (failed) {
        failed({code: 999, msg: error.message})
      }
    })
  }
}

export default {
  post(url, data) {
    let ax = axios({
      method: 'post',
      url: 'https://i.krspace.cn/'+url,
      data: data,
      timeout: 30000
    })
    return apiResult.fetch(ax)
  },
  get(url, params) {
    let ax = axios({
      method: 'get',
      url: 'https://i.krspace.cn/'+url,
      params,
      timeout: 30000
    })
    return apiResult.fetch(ax)
  }
}
