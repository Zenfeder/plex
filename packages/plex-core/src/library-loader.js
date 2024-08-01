import { loadScript, loadStyle } from './resource-loader';

/**
 * 动态加载和注册Vue2组件库
 *
 * @param {Object} options - 加载组件库的选项。
 * @param {string} options.libraryName - 组件库的名称。一般为组件库打包时 webpack 配置中的 output.library.name
 * @param {string} options.libraryScriptUrl - 组件库脚本的 URL。比如 Element UI 官方 'https://unpkg.com/element-ui/lib/index.js'
 * @param {string} [options.libraryStyleUrl] - 组件库样式的 URL。比如 Element UI 官方 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
 * @param {boolean} [options.isGlobalRegister=false] - 是否全局注册组件库。
 * @param {Object} options.register - 注册器对象。如果是局部注册，传入组件的 `this.$options.components` 对象；如果是全局注册，传入 Vue 构造函数。
 * @param {boolean} [options.needWindowVue=false] - 是否需要将 Vue 构造函数赋值给 `window.Vue`。
 * @return {Promise<void>} 一个解析为加载完成的 Promise。
 */
export default async function registerVueComponentLibraryDynamic({
  libraryName,
  libraryScriptUrl,
  libraryStyleUrl,
  register,
  needWindowVue = false
}) {
  try {
    // 全局注册到 Vue 构造函数
    const registerIsVueConstructor = typeof register === 'function' && register.name && register.name === 'Vue' && register.use && typeof register.use === 'function';
    // 局部注册到 Vue 组件实例
    const registerIsVueComponent = typeof register === 'object' && register.constructor.name === 'VueComponent';
    
    // 有些组件库（比如 ElementUI）需要 window.Vue，不然加载组件库脚本之后找不到 window.Vue 就会报错
    if (needWindowVue) {
      window.Vue = registerIsVueConstructor ? register : registerIsVueComponent ? register.constructor : window.Vue;
    }
    if (libraryStyleUrl) {
      await loadStyle(libraryStyleUrl);
    }
    await loadScript(libraryScriptUrl);

    const library = window[libraryName];
    if (library) {
      if (registerIsVueConstructor) {
        // 全局注册
        if (library.install && typeof library.install === 'function') {
          register.use(library)
        }
      } else if (registerIsVueComponent) {
        // 局部注册
        Object.keys(library).forEach(key => {
          const item = library[key]
          if (item.name && item.render) {
            register.$options.components[item.name] = item
          }
        });
      }
      return library;
    } else {
      console.error(` ${libraryName} 字段不在 window 对象中`);
    }
  } catch (err) {
    console.error(` ${libraryName} 组件库脚本加载失败:`, err);
  }
}