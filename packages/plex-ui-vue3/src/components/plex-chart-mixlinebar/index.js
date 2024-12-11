import UI from './ui.vue';

UI.install = function(app) {
  app.component(UI.name || 'plex-chart-mixlinebar', UI);
};

export default UI;