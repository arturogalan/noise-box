import Vue from 'vue';
import { PEDAL_TYPE, PEDAL_PROPERTIES } from '../constants';
import audioUtils from '../../helpers/audioUtils';
import { isEmpty } from 'lodash';

const verbs = {
  CLEAR_PALETTE_PEDALS: 'CLEAR_PALETTE_PEDALS',
  ADD_PALETTE_PEDAL: 'ADD_PALETTE_PEDAL',
  ADD_PEDAL: 'ADD_PEDAL',
  TOGGLE_PEDAL: 'TOGGLE_PEDAL',
  KILL_PEDAL: 'KILL_PEDAL',
  REMOVE_PEDAL: 'REMOVE_PEDAL',
  CONNECT_PEDALS: 'CONNECT_PEDALS',
  SET_AUDIO_CONTEXT: 'SET_AUDIO_CONTEXT',
  RESUME_AUDIO_CONTEXT: 'RESUME_AUDIO_CONTEXT',
  SET_USER_INPUT: 'SET_USER_INPUT',
  SET_USER_OUTPUT: 'SET_USER_OUTPUT',
}

const pedalModule = {
  namespaced: true,
  state: {
    //best practice to store lists as objects because you can access faster than with arrays
    palettePedals: {},
    audioInput: {},
    audioOutput: {},
    pedalBoard: {
      pedals: {}
    },
    audioContext: {}
  },

  getters: {
    palettePedalsList(state) {
      return Object.values(state.palettePedals)
    },
    pedalList(state) {
      return Object.values(state.pedalBoard.pedals)
    },
    switchedOnPedalList(state) {
      return Object.values(state.pedalBoard.pedals).filter(pedal => {
        return pedal.switchedOn;
      });
    },
    audioContext(state) {
      return state.audioContext
    }
  },

  //Actions can be asynchronous
  // You can make here ONLY the business-logic
  actions: {
    addPalettePedal({ state, commit }, type) {
      if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
        commit(verbs.ADD_PALETTE_PEDAL, {
          type,
          name: type,
          ...PEDAL_PROPERTIES[type],
        });
      }
    },
    resetPalettePedals({ commit, dispatch }) {
      commit(verbs.CLEAR_PALETTE_PEDALS);
      for (let pedal in PEDAL_TYPE) {
        dispatch('addPalettePedal', PEDAL_TYPE[pedal]);
      };
    },
    addPedal({ state, commit, getters }, { type }) {
      if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
        const pedal = {
          type,
          switchedOn: true,
          ...PEDAL_PROPERTIES[type],
          dying: false,
        };
        pedal.effect = audioUtils.createAudioNode(state.audioContext, pedal.type);
        for (let setting of pedal.settingsList) {
          pedal.effect[setting] = setting.value;
        }
        audioUtils.configAudioNode(pedal);

        //Commits
        commit(verbs.SET_USER_INPUT);
        commit(verbs.SET_USER_OUTPUT);
        commit(verbs.ADD_PEDAL, pedal);
        commit(verbs.CONNECT_PEDALS, getters.switchedOnPedalList);
      }
    },
    configurePedal({ state }, type) {
      audioUtils.configAudioNode(state.pedalBoard.pedals[type]);
    },
    removePedal({ state, commit }, pedal) {
      if (pedal.dying) return;
      commit(verbs.KILL_PEDAL, pedal.type);
      setTimeout(() => {
        if (state.pedalBoard.pedals[pedal.type] === pedal) { // check if the node is the same
          commit(verbs.REMOVE_PEDAL, pedal);
          commit(verbs.CONNECT_PEDALS);
        }
      }, 500);
    },
    togglePedal() {
      return state.updateIn(['pedalboard', 'pedals', action.id], pedal => pedal.set('switchedOn', !pedal.get('switchedOn')));
    },



    //AUDIO_EFFECTS ACTIONS
    createAudioContext({ commit }) {
      commit(verbs.SET_AUDIO_CONTEXT, audioUtils.createAudioContext())
    },
    switchOnAudioContext({ commit }) {
      commit(verbs.RESUME_AUDIO_CONTEXT)
    },
    // setUserMediaInput({ state, commit }) {
    //   commit(verbs.SET_USER_INPUT, audioUtils.createInput(state.audioContext))
    // },
    // setUserMediaOutput({ state, commit }) {
    //   commit(verbs.SET_USER_OUTPUT, audioUtils.createOutput(state.audioContext))
    // },

  },

  // Synchronous and the only point where we can change the state
  // You can make here ONLY the data-logic (language or formatting data....)
  //VUe doesn't detect the addition of properties, that's the reason we must do 'Vue.set'
  mutations: {
    //VUE COMPONENTS MUTATIONS
    [verbs.ADD_PALETTE_PEDAL](state, palettePedal) {
      Vue.set(state.palettePedals, palettePedal.name, palettePedal);
    },
    [verbs.CLEAR_PALETTE_PEDALS](state) {
      state.palettePedals = {};
    },
    [verbs.ADD_PEDAL](state, pedal) {
      Vue.set(state.pedalBoard.pedals, pedal.type, pedal);
    },
    [verbs.KILL_PEDAL](state, type) {
      state.pedalBoard.pedals[type].dying = true;
    },
    [verbs.REMOVE_PEDAL](state, pedal) {
      pedal.effect.disconnect();
      Vue.delete(state.pedalBoard.pedals, pedal.type);
    },
    [verbs.CONNECT_PEDALS](state, switchedOnPedalList) {
      switchedOnPedalList.forEach((pedal, index) => {
        if (index === 0) {
          state.audioInput.connect(pedal.effect);
        }
        if (index === (switchedOnPedalList.length - 1)) {
          pedal.effect.connect(state.audioOutput);
        } else {
          pedal.effect.connect(switchedOnPedalList[index + 1].effect);
        }
      });
    },

    //AUDIO-EFFECTS MUTATIONS
    [verbs.SET_AUDIO_CONTEXT](state, audioContext) {
      Vue.set(state, 'audioContext', audioContext);
    },
    [verbs.RESUME_AUDIO_CONTEXT](state) {
      state.audioContext.resume().then(() => {
        console.log('Playback resumed successfully');
      });
    },
    [verbs.SET_USER_INPUT](state) {
      if (isEmpty(state.audioInput)) {
        Vue.set(state, 'audioInput', audioUtils.createInput(state.audioContext));
      }
    },
    [verbs.SET_USER_OUTPUT](state) {
      if (isEmpty(state.audioOutput)) {
        Vue.set(state, 'audioOutput', audioUtils.createOutput(state.audioContext));
      }
    },
  }
};

export default pedalModule;