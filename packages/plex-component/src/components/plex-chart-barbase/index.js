import UI from './ui.vue';

UI.install = function(app) {
  app.component(UI.name || 'plex-chart-barbase', UI);
};

export default UI;