
const pedalModule = {
  namespaced: true,
  state: {
    infoModal: false,
    i18n: {},
    isTooltipEnabled: true,
    isFocusEnabled: true,
    // If true console log writes
    verbose: false,
  },
  getters: {
    showInfoModal (state) {
      return state.infoModal
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
  },
  actions: {
    toggleModal ({ commit }, { modalName, status }) {
      commit('toggleModal', { modalName, status })
    },
    setI18n ({commit}, i18Instance) {
      commit('setI18n', i18Instance)
    },
  },
  mutations: {
    toggleModal (state, { modalName, status }) {
      state[modalName] = status
    },
    setI18n (state, i18Instance) {
      state.i18n = i18Instance
    },
  },
}

export default pedalModule
