/*
 * 服务端渲染操作
 * 开发环境、正是环境相同
*/
console.log("server-render888");

let window
let document
if ( typeof window == "undefined" ) {
  window = global
  document = window.document
}
let ejs = require('ejs')
let axios = require('axios')
let promise =  require('es6-promise')
promise.polyfill();

// 101.201.171.211/
// optext02.krspace.cn/
// i.krspace.cn/

let url = ''
if ( process.env.NODE_ENV === 'development' ) {
  url = 'http://optest01.krspace.cn/'
} else {
  url = 'https://i.krspace.cn/'
}
let request = axios.create({
  baseURL: url
})

let handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      let data = resp.data
      if ( data.code === 1 ) {
        resolve(data.data)
      } else {
        let message = data
        reject(message)
        // console.log('server-render---------------', data, '---------------server-render')
      }
    }).catch(err => {
      // let message = err.response.data
      reject('server-render-----------', err)
    })
  })
}
var getIp = function(req) {
  var ip = req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress || '';
  if(ip.split(',').length>0){
    ip = ip.split(',')[0];
  }
  return ip;
};


module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  // 服务端渲染时 传入html 包括 css路径 js路径 head
  // let context = { url: ctx.path }
  let query = {}
  let queryList = []
  let queryString = '/?'
  let language = null

  if ( ctx.url.indexOf('?') > 0 ) {
    queryList = ctx.url.split('?')[1].split('&')
    queryList.forEach((val, i) => {
      let name = val.split('=')[0]
      query[name] = val.split('=')[1]

      if (name != 'id' && name != 'tab' && name != 'porCbdId' && name != 'openStatus' && name != 'portalPriceId' ) {
        queryString += name + '=' + val.split('=')[1] + '&'
      }
    })
  }
  language = query.lang === 'en' ? 1 : 0;
  var clientIp = getIp(ctx)

  let ip = await handleRequest(request.get('api/gateway/portalthree/get-community-byip', {
    params: {
      language: language,
      homePage: 1,
      requestIp: clientIp == '127.0.0.1'? '36.112.0.162': clientIp
    }
  }))
    .then(res => {
      return [res.items.cityVo.cityId, res.items.communityVo.communityId]
    })
    .catch(err => {
      return 'err'
    })
  if (ip === 'err') {
    ctx.body = '你等一会，别着急......'
    return
  }
  let list = await handleRequest(request.get('api/gateway/portalthree/city/down-list', {
    params: {language: language}
  }))
    .then(res => {
      return res.items
    })
    .catch(err => {
      return 'err'
    })
  if (ip === 'err') {
    ctx.body = '你等一会，别着急......'
    return
  }
  let context = {
    url: ctx.path,
    queryUrl: ctx.url,
    query: query,
    queryString: queryString.substr(0,queryString.length-1),
    origin: ctx.host,
    ip: ip,
    cityList: list,
    clientIp: clientIp
  }
  // console.log("ctx",ctx);

  try {
    /* renderer.renderToString
    * bundleRenderer.renderToString 将 bundle 渲染为字符串。
    * renderer.renderToString 将 Vue 实例渲染为字符串
    * 上下文对象(context object)可选。
    * 回调是一个典型的 Node.js 风格回调，
    * 其中第一个参数是可能抛出的错误，第二个参数是渲染完毕的字符串。
    */

    let appString = await renderer.renderToString(context)


    let {
      title,
      link,
      meta
    } = context.meta.inject()

    // console.log('-------', link.text())
    // console.log('=======', context.renderScripts())

    let html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initalState: context.renderState(),
      title: title.text(),
      link: link.text(),
      meta: meta.text()
    })

    ctx.body = html
  } catch (err) {
    // console.log('render error', err)
    throw err
  }
}
