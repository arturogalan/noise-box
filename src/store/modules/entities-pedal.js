import Vue from 'vue';
import {PEDAL_TYPE, PEDAL_PROPERTIES} from '../constants';
import audioUtils from '../../helpers/audioUtils';
import {isEmpty} from 'lodash';

const pedalModule = {
  namespaced: true,
  state: {
    //best practice to store lists as objects because you can access faster than with arrays
    palettePedals: {},
    audioInput: {},
    audioOutput: {},
    pedalBoard: {
      pedals: {},
    },
    audioContext: {},
    deviceList: [],
  },
  getters: {
    palettePedalsList(state) {
      return Object.values(state.palettePedals);
    },
    pedalList(state) {
      return Object.values(state.pedalBoard.pedals);
    },
    switchedOnPedalList(state) {
      return Object.values(state.pedalBoard.pedals).filter((pedal)=> {
        return pedal.switchedOn;
      });
    },
    audioContext(state) {
      return state.audioContext;
    },
    audioInput(state) {
      return state.audioInput;
    },
    audioOut(state) {
      return state.audioOut;
    },
    defaultAudioDevicesList(state) {
      return state.deviceList.filter((el)=> el.deviceId==='default');
    },
    defaultInputDevice(state, getters) {
      return getters.defaultAudioDevicesList.find((el)=> el.direction === 'input');
    },
    defaultOutputDevice(state, getters) {
      return getters.defaultAudioDevicesList.find((el)=> el.direction === 'output');
    },
  },

  actions: {
    initPalettePedals({commit, dispatch}) {
      commit('clearPalettePedals');
      for (let pedal in PEDAL_TYPE) {
        dispatch('addPalettePedal', PEDAL_TYPE[pedal]);
      }
    },
    addPalettePedal({state, commit}, type) {
      if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
        commit('addPalettePedal', {
          type,
          name: type,
          ...PEDAL_PROPERTIES[type],
        });
      }
    },
    initAudioInutAndOutput({commit, dispatch}) {
      commit('setUserInput');
      commit('setUserOutput');
      dispatch('addPedal', {type: PEDAL_TYPE.VOLUME});
      // dispatch('setDevicesList');
      // dispatch('setDevicesListHandler');
    },
    addPedal({state, commit, getters}, {type}) {
      if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
        const pedal = {
          type,
          switchedOn: true,
          dying: false,
          ...PEDAL_PROPERTIES[type],
        };
        commit('addPedal', pedal);
        commit('connectPedals', getters.switchedOnPedalList);
      }
    },
    configurePedal({state}, type) {
      audioUtils.configAudioNode(state.pedalBoard.pedals[type]);
    },
    removePedal({state, commit, getters}, pedal) {
      if (pedal.dying) return;
      commit('killPedal', pedal.type);
      setTimeout(()=> {
        if (state.pedalBoard.pedals[pedal.type] === pedal) { // check if the node is the same
          commit('removePedal', pedal);
          commit('connectPedals', getters.switchedOnPedalList);
        }
      }, 500);
    },
    setPedalProperty({commit}, data) {
      commit('setPedalProperty', data);
    },
    // togglePedal() {
    //   return state.updateIn(['pedalboard', 'pedals', action.id], (pedal)=> pedal.set('switchedOn', !pedal.get('switchedOn')));
    // },

    createAudioContext({commit}) {
      commit('setAudioContext', audioUtils.createAudioContext());
    },
    switchOnAudioContext({commit}) {
      commit('resumeAudioContext');
    },
    setDevicesList({commit}) {
      audioUtils.deviceList().then((deviceList)=> {
        commit('setDevicesList', deviceList.filter((el)=> el.type === 'audio'));
      });
    },
    setDevicesListHandler({commit}) {
      audioUtils.deviceListHandler((newDeviceList, event)=> {
        commit('setDevicesList', newDeviceList.filter((el)=> el.type === 'audio'));
      });
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
    setPedalProperty(state, {type, property, value}) {
      let pedal = state.pedalBoard.pedals[type];
      if (pedal) {
        pedal.effect[property] = value;
      }
    },
    connectPedals(state, switchedOnPedalList) {
      switchedOnPedalList.forEach((pedal, index)=> {
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
    //Audio mutations
    setAudioContext(state, audioContext) {
      Vue.set(state, 'audioContext', audioContext);
    },
    resumeAudioContext(state) {
      state.audioContext.resume().then(()=> {
        console.log('Playback resumed successfully');
        console.log(state.audioContext);
      });
    },
    setUserInput(state) {
      if (isEmpty(state.audioInput)) {
        Vue.set(state, 'audioInput', audioUtils.createInput(state.audioContext));
        console.log(state.audioInput);
      }
    },
    setUserOutput(state) {
      if (isEmpty(state.audioOutput)) {
        Vue.set(state, 'audioOutput', audioUtils.createOutput(state.audioContext));
      }
    },
    setDevicesList(state, deviceList) {
      Vue.set(state, 'deviceList', deviceList);
    },
  },
};

export default pedalModule;
