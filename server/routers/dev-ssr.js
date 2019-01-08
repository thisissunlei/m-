// 开发环境
let window
let document
if ( typeof window == "undefined" ) {
  window = global
  document = window.document
}
let Router = require('koa-router')
let axios = require('axios')
let path = require('path')
let fs = require('fs')
let MemoryFS = require('memory-fs')
let webpack = require('webpack')
let VueServerRenderer = require('vue-server-renderer')

let serverRender = require('./server-render')
let serverConfig = require('../../build/webpack.config.server')

// 编译webpack
let serverCompiler = webpack(serverConfig)

/*
* mfs 与 fs 的区别
* 不写入磁盘 写入内存中
* 文件输出都放到 mfs中
* 加快速度
*/
let mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))
  // 以上为错误信息处理

  /*
  * path.join() 拿到vue-server-renderer/server-plugin 生成的json的绝对路径
  * msf 读取文件
  */
  let bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

let handleSSR = async (ctx) => {

  if (!bundle) {
    ctx.body = '你等一会，别着急......'
    return
  }

  // 拿到vue-server-renderer/client-plugin 生成的json内容
  let clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  let clientManifest = clientManifestResp.data

  /* createBundleRenderer() https://ssr.vuejs.org/zh/api/
  * 使用 server bundle 和（可选的）选项创建一个 BundleRenderer 实例。
  * serverBundle 可以是 1、绝对路径，指向一个已经构建好的 bundle 文件（.js 或 .json）。必须以 / 开头才会被识别为文件路径。2、由 webpack + vue-server-renderer/server-plugin 生成的 bundle 对象。3、JavaScript 代码字符串（不推荐）
  * 因为用的是 webpack 打包后的文件，所以只能用 createBundleRenderer 而不能用 createRenderer 来创建 renderer
  * 可选项：
  * template 为整个页面的 HTML 提供一个模板，可使用上下文进行插值
  * inject 控制使用 template 时是否执行自动注入。默认是 true
  * clientManifest 通过此选项提供一个由 vue-server-renderer/client-plugin 生成的客户端构建 manifest 对象(client build manifest object)。此对象包含了 webpack 整个构建过程的信息，从而可以让 bundle renderer 自动推导需要在 HTML 模板中注入的内容。
  */
  let renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  // 读取模版
  let template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  /*
  * ctx 将返回内容写入cxt.body
  * renderer、template 引入
  */
  await serverRender(ctx, renderer, template)
}

let router = new Router()
router.get('*', handleSSR)

module.exports = router
