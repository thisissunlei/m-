// 处理服务端的静态路径 只处理/public开头的路径
let window
let document
if ( typeof window == "undefined" ) {
  window = global
  document = window.document
}
let Router = require('koa-router')
let send = require('koa-send')

let staticRouter = new Router({ prefix: process.env.NODE_ENV === 'development'? '/public' :'/kr-web-new' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
