const path = require('path')
const webpackModifyMain = require('webpack-modify-main')
const { VueLoaderPlugin } = require('vue-loader')
const packageJson = require('../package.json')

const outputDir = 'dist'

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../' + outputDir),
    filename: '[name].[contenthash].umd.js',
    clean: true,
    library: {
      name: packageJson.name,
      type: 'umd',
      umdNamedDefine: true
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpackModifyMain({
      developmentMain: 'src/main.js', // 开发环境的入口文件
      productionMainDir: outputDir // 生产环境的入口文件文件夹
    })
  ]
}