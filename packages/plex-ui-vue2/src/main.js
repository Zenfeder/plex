// 导入组件
import PlexButton from './components/plex-button';
import PlexInput from './components/plex-input';

// 命名导出组件
export { PlexButton, PlexInput };

// 组件列表
const components = {
  PlexButton,
  PlexInput
};

// 定义 install 方法
const install = (Vue, opts = {}) => {
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name || key, components[key]);
  });
};

// 自动安装（浏览器环境）
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// 默认导出 install 方法
export default {
  install
};