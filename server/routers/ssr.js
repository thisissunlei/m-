// 正式环境
let window
let document
if ( typeof window == "undefined" ) {
  window = global
  document = window.document
}
let Router = require('koa-router')
let path = require('path')
let fs = require('fs')
let VueServerRender = require('vue-server-renderer')

let serverRender = require('./server-render')

// let clientManifest = require('https://web.krspace.cn/kr-web-new/vue-ssr-client-manifest.json')
let clientManifest = require('../../public/vue-ssr-client-manifest.json')
let renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

let template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

let pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
