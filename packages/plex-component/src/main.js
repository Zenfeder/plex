// 导入组件
import PlexPage from './components/plex-page';
import PlexContainerBase from './components/plex-container-base';
import PlexButton from './components/plex-button';
import PlexInput from './components/plex-input';
import PlexSelect from './components/plex-select';
import PlexChartLinebase from './components/plex-chart-linebase';
import PlexChartAreabase from './components/plex-chart-areabase';
import PlexChartLinestack from './components/plex-chart-linestack';
import PlexChartAreastack from './components/plex-chart-areastack';
import PlexChartBarbase from './components/plex-chart-barbase';
import PlexChartBarstack from './components/plex-chart-barstack';
import PlexChartBarnegative from './components/plex-chart-barnegative';
import PlexChartMixlinebar from './components/plex-chart-mixlinebar';
import PlexChartPiebase from './components/plex-chart-piebase';
import PlexChartPieround from './components/plex-chart-pieround';
import PlexChartCandlestick from './components/plex-chart-candlestick';
import PlexChartCandlestickSh from './components/plex-chart-candlestick-sh';

import material from './material';
import schemas from './schemas';

// 组件列表
const components = {
  PlexPage,
  PlexContainerBase,
  PlexButton,
  PlexInput,
  PlexSelect,
  PlexChartLinebase,
  PlexChartAreabase,
  PlexChartLinestack,
  PlexChartAreastack,
  PlexChartBarbase,
  PlexChartBarstack,
  PlexChartBarnegative,
  PlexChartMixlinebar,
  PlexChartPiebase,
  PlexChartPieround,
  PlexChartCandlestick,
  PlexChartCandlestickSh
};

// 定义 install 方法
const install = (app, opts = {}) => {
  Object.keys(components).forEach(key => {
    app.component(components[key].name || key, components[key]);
  });
};

// 自动安装（浏览器环境）
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

// 命名导出组件
export {
  PlexPage,
  PlexContainerBase,
  PlexButton,
  PlexInput,
  PlexSelect,
  PlexChartLinebase,
  PlexChartAreabase,
  PlexChartLinestack,
  PlexChartAreastack,
  PlexChartBarbase,
  PlexChartBarstack,
  PlexChartBarnegative,
  PlexChartMixlinebar,
  PlexChartPiebase,
  PlexChartPieround,
  PlexChartCandlestick,
  PlexChartCandlestickSh,
  material,
  schemas,
  install
};

// 以便其他项目可以直接通过 import PlexUI from 'plex-component-library' 使用组件库
export default {
  install
}