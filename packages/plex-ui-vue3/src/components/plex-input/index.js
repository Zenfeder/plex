import UI from './ui.vue';

UI.install = function(Vue) {
  Vue.component(UI.name || 'plex-input', UI);
};

export default UI;