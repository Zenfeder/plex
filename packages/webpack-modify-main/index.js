const fs = require('fs');
const path = require('path');

class WebpackModifyMain {
  constructor(options = {}) {
    this.options = {
      ...options
    };
  }

  apply(compiler) {
    // 根据 package.json script 命令中的 --mode 参数来区分开发环境和生产环境
    this.mode = compiler.options.mode
    const projectRoot = compiler.context; // 获取项目根路径
    const packageJsonPath = path.resolve(projectRoot, 'package.json');
    const packageJson = require(packageJsonPath);

    compiler.hooks.initialize.tap('WebpackModifyMain', (params) => {
      if (this.mode === 'production') return
      if (this.mode === 'development') {
        packageJson.main = this.options.developmentMain;
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    })

    compiler.hooks.emit.tapAsync('WebpackModifyMain', (compilation, callback) => {
      if (this.mode === 'development') return
      // 获取输出的文件名
      const outputFile = Object.keys(compilation.assets).find(filename =>
        filename.endsWith('.js')
      );

      if (outputFile) {
        packageJson.main = `${this.options.productionMainDir}/${outputFile}`;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      }

      callback();
    })
  }
}

module.exports = WebpackModifyMain