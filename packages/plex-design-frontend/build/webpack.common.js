const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    library: {
      type: 'umd'
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
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),  // 启用 Options API
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // 禁用生产环境的 DevTools 支持
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // 禁用 SSR hydration 调试
    })
  ],
  // 其他配置...
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      // 添加更多别名...
    },
    extensions: ['.js', '.vue', '.json'], // 可选：自动解析这些扩展名
  },
}