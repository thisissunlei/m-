let path = require('path')
let HTMLPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
let merge = require('webpack-merge')
let ExtractPlugin = require('extract-text-webpack-plugin')
let baseConfig = require('./webpack.config.base')
let VueClientPlugin = require('vue-server-renderer/client-plugin')
let AutoDynamicPlugin = require('auto-dynamic-routes')
let uglify = require('uglifyjs-webpack-plugin')


let isDev = process.env.NODE_ENV === 'development'

let defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new AutoDynamicPlugin({
    fileName: 'newRouter.js',
    inPath: path.resolve(__dirname, '../client/views'),
    outPath: path.resolve(__dirname, '../client/config'),
    srcDir: 'views',
    filterSuffix: '.vue'
  }),
  // 这是将客户端的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-client-manifest.json`
  new VueClientPlugin() // 生成json文件
]

let devServer = {
  port: 8001,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': {
      target: 'http://optest02.krspace.cn',
      changeOrigin: true
    }
  },
  hot: true,
  disableHostCheck: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new uglify()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: isDev ? '/public/' : 'https://web.krspace.cn/kr-web-cdn/'
    },
    plugins: defaultPluins.concat([
      // ??
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.NamedChunksPlugin(),
      new uglify()
    ])
  })
}

module.exports = config
