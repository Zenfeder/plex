const path = require('path')
const UpdatePackageMain = require('./plugins/update-package-main')

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'plex-ui-vue2.[contenthash].umd.js',
    clean: true,
    library: {
      name: 'PlexUiVue2',
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
    new UpdatePackageMain()
  ]
}