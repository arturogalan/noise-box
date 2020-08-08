import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueTooltipNb from './directives/vue-tooltip-nb'
import focusStoke from './directives/focus-stroke'
import VueI18n from 'vue-i18n'
import messages from './i18n/en.json'
import analytics from './helpers/analitycs'
import trace from './plugins/trace'

analytics.init(window)
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(trace)

vueTooltipNb.init()
focusStoke.init()
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})
store.dispatch('ui/setI18n', i18n)
new Vue({
  i18n: i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
