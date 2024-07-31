import Vue from 'vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './style/index.less';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(ViewUI);

new Vue({
  render: h => h(App),
}).$mount('#app');

