import UI from './ui.vue';

UI.install = function(app) {
  app.component(UI.name || 'plex-chart-piebase', UI);
};

export default UI;