
const pedalModule = {
  namespaced: true,
  state: {
    infoModal: false,
    firstTimeModal: false,
    i18n: {},
    isTooltipEnabled: true,
    isFocusEnabled: true,
    // If true console log writes
    verbose: false,
    // New user without localStorage key
    isFirstTime: true,
  },
  getters: {
    showInfoModal (state) {
      return state.infoModal
    },
    showFirstTimeModal (state) {
      return state.firstTimeModal
    },
    i18n (state) {
      return state.i18n
    },
    isVerbose (state) {
      return state.verbose
    },
    isTooltipEnabled (state) {
      return state.isTooltipEnabled
    },
    isFocusEnabled (state) {
      return state.isFocusEnabled
    },
    isFirstTime () {
      const localConfig = localStorage.getItem('NoiseBox')
      return !localConfig || !JSON.parse(localConfig).visited
    },
  },
  actions: {
    toggleModal ({ commit }, { modalName, status }) {
      commit('toggleModal', { modalName, status })
    },
    setI18n ({commit}, i18Instance) {
      commit('setI18n', i18Instance)
    },
    setSiteVisited ({commit}) {
      commit('setSiteVisited')
    },
  },
  mutations: {
    toggleModal (state, { modalName, status }) {
      state[modalName] = status
    },
    setI18n (state, i18Instance) {
      state.i18n = i18Instance
    },
    setSiteVisited () {
      localStorage.setItem('NoiseBox', JSON.stringify({visited: true}))
    },
  },
}

export default pedalModule
