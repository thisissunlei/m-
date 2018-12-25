let path = require('path')
let ExtractPlugin = require('extract-text-webpack-plugin')
let webpack = require('webpack')
let merge = require('webpack-merge')
let baseConfig = require('./webpack.config.base')
let uglify = require('uglifyjs-webpack-plugin')
/*
* 生成单独的json文件
* 用于服务端渲染 处理复杂的逻辑
* vue-server-renderer
*/
let VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

let isDev = process.env.NODE_ENV === 'development'

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }),
  /* 这是将服务端的整个输出
  * 构建为单个 JSON 文件的插件。
  * 默认文件名为 `vue-ssr-server-bundle.json`
  * 是给createBundleRenderer 用于服务端渲染出 html 文件
  */
  new VueServerPlugin(),
  new uglify()
]

// if (isDev) {
//   plugins.push(new VueServerPlugin())
// }

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins
})


module.exports = config
