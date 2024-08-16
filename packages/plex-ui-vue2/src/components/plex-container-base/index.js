import PlexContainerBase from './plex-container-base.vue';

PlexContainerBase.install = function(Vue) {
  Vue.component(PlexContainerBase.name, PlexContainerBase);
};

export default PlexContainerBase;