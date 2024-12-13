import UI from './ui.vue';

UI.install = function(app) {
  app.component(UI.name || 'plex-chart-candlestick-sh', UI);
};

export default UI;