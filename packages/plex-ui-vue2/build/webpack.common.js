const path = require('path')
const fs = require('fs');
const webpack = require('webpack');

let filename = 'plex-ui-vue2.umd.js'

class UpdateMainPlugin {
  constructor(mode) {
    this.mode = mode;
  }

  apply(compiler) {
    compiler.hooks.initialize.tap('UpdateMainPlugin', () => {
      console.log('>>> UpdateMainPlugin initialize')
      const packageJsonPath = path.resolve(__dirname, '../package.json');
      const packageJson = require(packageJsonPath);
      if (this.mode === 'development') {
        packageJson.main = 'src/main.js';
      } else if (this.mode === 'production') {
        packageJson.main = 'dist/' + filename;
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`>>> Updated package.json main field to ${packageJson.main}`);
    })
    compiler.hooks.run.tap('UpdateMainPlugin', () => {
      console.log('>>> UpdateMainPlugin run')
    })

    compiler.hooks.watchRun.tap('UpdateMainPlugin', () => {
      console.log('>>> UpdateMainPlugin watchRun')
    })

    compiler.hooks.watchClose.tap('UpdateMainPlugin', () => {
      console.log('>>> UpdateMainPlugin watchClose')
    })
  }
}

module.exports = (env, args) => {
  const mode = args.mode || 'production';

  return {
    entry: path.resolve(__dirname, '../src/main.js'),
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      // filename: '[name].[contenthash].js',
      filename: filename,
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new UpdateMainPlugin(mode)
    ],
  }
}