import PlexPage from './plex-page.vue';

PlexPage.install = function(Vue) {
  Vue.component(PlexPage.name, PlexPage);
};

export default PlexPage;