import UI from './ui.vue';

UI.install = function(app) {
  app.component(UI.name || 'plex-page', UI);
};

export default UI;