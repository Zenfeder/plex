import PlexUI from 'plex-ui-vue2'
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(PlexUI)

new Vue({
  render: h => h(App),
}).$mount('#app');

