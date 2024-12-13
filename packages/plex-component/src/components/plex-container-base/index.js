import UI from './ui.vue';

UI.install = function(app) {
  app.component(UI.name || 'plex-container-base', UI);
};

export default UI;