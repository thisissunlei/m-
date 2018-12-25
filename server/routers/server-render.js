/*
 * 服务端渲染操作
 * 开发环境、正是环境相同
*/
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


module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  // 服务端渲染时 传入html 包括 css路径 js路径 head
  // let context = { url: ctx.path, query: ctx.url, origin: ctx.host }

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
