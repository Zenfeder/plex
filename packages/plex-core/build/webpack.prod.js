const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = (env, args) => {
  return {
    ...merge(common, {
      mode: 'production',
      // devtool: 'inline-source-map'
    })
  }
}