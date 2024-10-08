// 导入组件
import PlexPage from './components/plex-page';
import PlexContainerBase from './components/plex-container-base';
import PlexButton from './components/plex-button';
import PlexInput from './components/plex-input';

import material from './material';
import schemas from './schemas';

// 组件列表
const components = {
  PlexPage,
  PlexContainerBase,
  PlexButton,
  PlexInput,
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

// 命名导出组件
export {
  PlexPage,
  PlexContainerBase,
  PlexButton,
  PlexInput,
  material,
  schemas,
  install
};

// 以便其他项目可以直接通过 import PlexUI from 'plex-ui-vue2' 使用组件库
export default {
  install
}