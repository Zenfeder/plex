const path = require('path')
const fs = require('fs');
const webpack = require('webpack');

class UpdateMainPlugin {
  constructor(mode) {
    this.mode = mode;
  }

  apply(compiler) {
    compiler.hooks.initialize.tap('UpdateMainPlugin', () => {
      if (this.mode === 'production') return
      const packageJsonPath = path.resolve(__dirname, '../package.json');
      const packageJson = require(packageJsonPath);
      if (this.mode === 'development') {
        packageJson.main = 'src/main.js';
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    })

    compiler.hooks.emit.tapAsync('UpdateMainPlugin', (compilation, callback) => {
      if (this.mode === 'development') return
      const packageJsonPath = path.resolve(__dirname, '../package.json');
      const packageJson = require(packageJsonPath);

      // 获取输出的文件名
      const outputFile = Object.keys(compilation.assets).find(filename =>
        filename.endsWith('.js')
      );

      if (outputFile) {
        packageJson.main = `dist/${outputFile}`;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(`Updated package.json main field to ${packageJson.main}`);
      }

      callback();
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new UpdateMainPlugin(mode)
    ],
  }
}