let path = require('path')
let createVueLoaderOptions = require('./vue-loader.config')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let uglify = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
let px2rem = require('postcss-px2rem')
let postcss = require('postcss')


let isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let config = {
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: isDev ? 'http://127.0.0.1:8000/public/' : '/public/' // 静态资源路径
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'model': path.join(__dirname, '../client/model/client-model.js'),
      'components': resolve('client/components'),
      'assets': resolve('client/assets'),
      'images': resolve('client/assets/images'),
      'util': resolve('client/util')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: createVueLoaderOptions(isDev)
          },
        ]
      },
      // {
      //   test: /\.less/,
      //   // use: ExtractTextPlugin.extract({
      //   //   use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader?minimize'],
      //   //   fallback: 'style-loader'
      //   // })
      //   use: [{
      //     loader: 'style-loader'
      //   }, {
      //     loader: 'css-loader?minimize'
      //   }, {
      //     loader: 'less-loader'
      //   },]

      // },

      //
      {
        test: /\.(css|less|scss)(\?.*)?$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      // {
      //   test: /\.css/,
      //   // use: ExtractTextPlugin.extract({
      //   //   use: ['css-loader?minimize', 'autoprefixer-loader'],
      //   //   fallback: 'style-loader',
      //   // }),

      //   use:[{
      //     loader: 'style-loader'
      //   }, {
      //     loader: 'css-loader?minimize'
      //   }]
      // },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      },
      {
        test:/\.(mp4|webm|ogg)(\?.*)?$/,
        loader:'url-loader',
        options:{
          limit:10000,
          name:'media/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.[contentHash:8].css'),
    new uglify(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        postcss:
          [require('postcss-px2rem')({ remUnit: 37.5, propWhiteList: [] })]
      }
    })
  ],

}

module.exports = config
