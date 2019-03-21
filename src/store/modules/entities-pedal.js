import Vue from 'vue';
import { PEDAL_TYPE, PEDAL_PROPERTIES } from '../constants';
import audioUtils from '../../helpers/audioUtils';

const verbs = {
  CLEAR_PALETTE_PEDALS: 'CLEAR_PALETTE_PEDALS',
  ADD_PALETTE_PEDAL: 'ADD_PALETTE_PEDAL',
  ADD_PEDAL: 'ADD_PEDAL',
  TOGGLE_PEDAL: 'TOGGLE_PEDAL',
  KILL_PEDAL: 'KILL_PEDAL',
  REMOVE_PEDAL: 'REMOVE_PEDAL',
  SET_AUDIO_CONTEXT: 'SET_AUDIO_CONTEXT',
  RESUME_AUDIO_CONTEXT: 'RESUME_AUDIO_CONTEXT',
  SET_USER_INPUT: 'SET_USER_INPUT',
  SET_USER_OUTPUT: 'SET_USER_OUTPUT',
}

const pedalModule = {
 state: {
  //best practice to store lists as objects because you can access faster than with arrays
  palettePedals: {},
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

//Actions can be asynchronous
// You can make here ONLY the business-logic
actions: {
  addPalettePedal({ state, commit }, { type, name }) {
    if (name && !state.pedalBoard.pedals[name]) { // add only if not exists
      commit(verbs.ADD_PALETTE_PEDAL, {
        type,
        name,
        ...PEDAL_PROPERTIES[type],
      });
    }
  },
  resetPalettePedals({ commit, dispatch }) {
    commit(verbs.CLEAR_PALETTE_PEDALS);
    [
      { type: PEDAL_TYPE.VOLUME, name: 'volume' },
      { type: PEDAL_TYPE.DISTORSION, name: 'distorsion' },
      { type: PEDAL_TYPE.DELAY, name: 'delay' },
      { type: PEDAL_TYPE.FLANGER, name: 'flanger' }
    ].forEach(palettePedal => {
      dispatch('addPalettePedal', palettePedal);
    });
  },
  addPedal({ state, commit }, { type }) {
    if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
      const pedal = {
        type,
        ...PEDAL_PROPERTIES[type],
        dying: false,
        effect: audioUtils.createAudioNode(state.audioContext, type),
      };
      
      commit(verbs.ADD_PEDAL, pedal);
      commit(verbs.ADD_PEDAL, pedal);
    }
  },
  removePedal({ state, commit }, pedal) {
    if (pedal.dying) return;
    commit(verbs.KILL_PEDAL, pedal.type);
    setTimeout(() => {
      if (state.pedalBoard.pedals[pedal.type] === pedal) { // check if the node is the same
        commit(verbs.REMOVE_PEDAL, pedal.type);
      }
    }, 1000);
  },
  togglePedal(){
    return state.updateIn(['pedalboard', 'pedals', action.id], pedal => pedal.set('switchedOn', !pedal.get('switchedOn')));
  },
  
  
  
  //AUDIO_EFFECTS ACTIONS
  createAudioContext({ commit }) {
    commit(verbs.SET_AUDIO_CONTEXT, audioUtils.createAudioContext())
  },
  switchOnAudioContext({ commit }) {
    commit(verbs.RESUME_AUDIO_CONTEXT)
  },
  setUserMediaInput({ state, commit }) {
    commit(verbs.SET_USER_INPUT, audioUtils.createInput(state.audioContext))
  },
  setUserMediaOutput({ state, commit }) {
    commit(verbs.SET_USER_OUTPUT, audioUtils.createOutput(state.audioContext))
  },

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
  [verbs.REMOVE_PEDAL](state, type) {
    Vue.delete(state.pedalBoard.pedals, type);
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
  [verbs.SET_USER_INPUT](state, audioInput) {
    Vue.set(state, 'audioInput', audioInput);
  },
  [verbs.SET_USER_OUTPUT](state, audioOutput) {
    Vue.set(state, 'audioOutput', audioOutput);
  },
}
};

export default pedalModule;