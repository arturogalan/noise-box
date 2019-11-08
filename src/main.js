// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import vueTooltipNb from './directives/vue-tooltip-nb';
import VueI18n from 'vue-i18n';
import messages from './i18n/en.json';

Vue.config.productionTip = false;


Vue.use(VueI18n);

// Set i18n instance on app
console.log(messages);
vueTooltipNb.init();
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});
  /* eslint-disable no-new */
new Vue({
  i18n: i18n,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
