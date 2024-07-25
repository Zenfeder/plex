// import PlexUI from 'plex-ui-vue2'
// import { PlexButton, PlexInput } from 'plex-ui-vue2'
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// Vue.use(PlexUI)
// Vue.component(PlexButton.name, PlexButton)
// Vue.component(PlexInput.name, PlexInput)

new Vue({
  render: h => h(App),
}).$mount('#app');

