import UI from './ui.vue';

UI.install = function(Vue) {
  Vue.component(UI.name || 'plex-select', UI);
};

export default UI;