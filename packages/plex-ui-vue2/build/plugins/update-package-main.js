const fs = require('fs');
const path = require('path');

class UpdatePackageMain {
  constructor(mode) {
    this.mode = mode;
  }

  apply(compiler) {
    // 根据 package.json script 命令中的 --mode 参数来区分开发环境和生产环境
    this.mode = compiler.options.mode

    compiler.hooks.initialize.tap('UpdatePackageMain', () => {
      if (this.mode === 'production') return
      const packageJsonPath = path.resolve(__dirname, '../../package.json');
      const packageJson = require(packageJsonPath);
      if (this.mode === 'development') {
        packageJson.main = 'src/main.js';
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    })

    compiler.hooks.emit.tapAsync('UpdatePackageMain', (compilation, callback) => {
      if (this.mode === 'development') return
      const packageJsonPath = path.resolve(__dirname, '../../package.json');
      const packageJson = require(packageJsonPath);

      // 获取输出的文件名
      const outputFile = Object.keys(compilation.assets).find(filename =>
        filename.endsWith('.js')
      );

      if (outputFile) {
        packageJson.main = `dist/${outputFile}`;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      }

      callback();
    })
  }
}

module.exports = UpdatePackageMain