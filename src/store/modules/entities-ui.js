
const pedalModule = {
  namespaced: true,
  state: {
    infoModal: false,
  },
  getters: {
    showInfoModal(state) {
      return state.infoModal;
    },
  },
  actions: {
    toggleModal({ commit }, { modalName, status }) {
      commit('toggleModal', { modalName, status });
    },
  },
  mutations: {
    toggleModal(state, { modalName, status }) {
      state[modalName] = status;
    },
  },
};

export default pedalModule;
