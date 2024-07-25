const path = require('path')
const webpackModifyMain = require('webpack-modify-main')
const { VueLoaderPlugin } = require('vue-loader')

const outputDir = 'dist'

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../' + outputDir),
    filename: 'plex-ui-vue2.[contenthash].umd.js',
    clean: true,
    library: {
      name: 'plex-ui-vue2',
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
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
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpackModifyMain({
      developmentMain: 'src/main.js', // 开发环境的入口文件
      productionMainDir: outputDir // 生产环境的入口文件文件夹
    })
  ]
}