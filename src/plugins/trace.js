import store from '../store'

const isVerbose = store.getters['ui/isVerbose']

const trace = (...args) => {
  if (isVerbose) {
    // 🎼 🎵 🎶
    console.log('🎧', ...args)
  }
}
export default {
  install (Vue) {
    Vue.prototype.$trace = trace
  },
}
