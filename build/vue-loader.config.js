// vue-loader 配置项

module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: true,
    cssModules: {
      localIdentName: '[path]-[name]-[hash:base64:5]',
      camelCase: true
    }
    // hotReload: false, // 根据环境变量生成
  }
}
