import UI from './ui.vue';

UI.install = function(app) {
  app.component(UI.name || 'plex-button', UI);
};

export default UI;