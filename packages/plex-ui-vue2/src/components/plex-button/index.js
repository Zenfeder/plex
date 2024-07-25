import PlexButton from './plex-button.vue';

PlexButton.install = function(Vue) {
  Vue.component(PlexButton.name, PlexButton);
};

export default PlexButton;