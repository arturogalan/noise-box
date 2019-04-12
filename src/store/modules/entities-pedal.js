import Vue from 'vue';
import { PEDAL_TYPE, PEDAL_PROPERTIES } from '../constants';
import audioUtils from '../../helpers/audioUtils';
import {isEmpty} from 'lodash';

const pedalModule = {
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
  audioContext(state) {
    return state.audioContext
  }
},

actions: {
  addPalettePedal({ state, commit }, type) {
    if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
      commit('addPalettePedal', {
        type,
        name: type,
        ...PEDAL_PROPERTIES[type],
      });
    }
  },
  resetPalettePedals({ commit, dispatch }) {
    commit('clearPalettePedals');
    for (let pedal in PEDAL_TYPE){
      dispatch('addPalettePedal', PEDAL_TYPE[pedal]);
    };
  },
  addPedal({ state, commit }, { type }) {
    if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
      const pedal = {
        type,
        switchedOn: true,
        dying: false,
        ...PEDAL_PROPERTIES[type],
      };
      
      commit("setUserInput");
      commit('setUserOutput');
      commit('addPedal', pedal);
      commit('connectPedals');
    }
  },
  configurePedal({ state },type) {
    audioUtils.configAudioNode(state.pedalBoard.pedals[type]);
  },
  removePedal({ state, commit }, pedal) {
    if (pedal.dying) return;
    commit('killPedal', pedal.type);
    setTimeout(() => {
      if (state.pedalBoard.pedals[pedal.type] === pedal) { // check if the node is the same
        commit('removePedal', pedal);
        commit('connectPedals');
      }
    }, 500);
  },
  togglePedal(){
    return state.updateIn(['pedalboard', 'pedals', action.id], pedal => pedal.set('switchedOn', !pedal.get('switchedOn')));
  },
  createAudioContext({ commit }) {
    commit('setAudioContext', audioUtils.createAudioContext());
  },
  switchOnAudioContext({ commit }) {
    commit('resumeAudioContext');
  },
},

mutations: {
  //Visual mutations
  addPalettePedal(state, palettePedal) {
    Vue.set(state.palettePedals, palettePedal.name, palettePedal);
  },
  clearPalettePedals(state) {
    state.palettePedals = {};
  },
  addPedal(state, pedal) {
    pedal.effect = audioUtils.createAudioNode(state.audioContext, pedal.type);
    for (let setting of pedal.settingsList) {
      pedal.effect[setting] = setting.value;
    }
    audioUtils.configAudioNode(pedal);

    Vue.set(state.pedalBoard.pedals, pedal.type, pedal);
  },
  killPedal(state, type) {
    state.pedalBoard.pedals[type].dying = true;
  },
  removePedal(state, pedal) {
    pedal.effect.disconnect();
    Vue.delete(state.pedalBoard.pedals, pedal.type);
  },
  connectPedals(state) {
    const switchedOnPedals = Object.values(state.pedalBoard.pedals).filter(pedal => {
      return pedal.switchedOn;
    });

    switchedOnPedals.forEach((pedal, index) => {
        if (index===0){
          state.audioInput.connect(pedal.effect);
        }
        if(index === (switchedOnPedals.length - 1)) {
          pedal.effect.connect(state.audioOutput);
        } else {
          pedal.effect.connect(switchedOnPedals[index + 1].effect);
        }
    });


  },

  //Audio mutations
  setAudioContext(state, audioContext) {
    Vue.set(state, 'audioContext', audioContext);
  },
  resumeAudioContext(state) {
    state.audioContext.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  },
  setUserInput(state) {
    if(isEmpty(state.audioInput)) {
      Vue.set(state, 'audioInput', audioUtils.createInput(state.audioContext));
    }
  },
  setUserOutput(state) {
    if(isEmpty(state.audioOutput)) {
      Vue.set(state, 'audioOutput', audioUtils.createOutput(state.audioContext));
    }
  },
}
};

export default pedalModule;