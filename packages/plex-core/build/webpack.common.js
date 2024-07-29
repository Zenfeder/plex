const path = require('path')
const webpackModifyMain = require('webpack-modify-main')

const outputDir = 'dist'

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../' + outputDir),
    filename: 'plex-core.[contenthash].umd.js',
    clean: true,
    library: {
      name: 'PlexCore',
      type: 'umd',
      umdNamedDefine: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  plugins: [
    new webpackModifyMain({
      developmentMain: 'src/index.js', // 开发环境的入口文件
      productionMainDir: outputDir // 生产环境的入口文件文件夹
    })
  ]
}