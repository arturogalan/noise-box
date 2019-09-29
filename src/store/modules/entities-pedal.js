import Vue from 'vue';
import {AMP_COMPONENT_NAME, PEDAL_NAME, PEDAL_PROPERTIES} from '../constants';
import audioUtils from '../../helpers/audioUtils';
import {isEmpty} from 'lodash';


const getPropertyCorrectionFactor = (component, property)=> {
  return (component.settingsList.find((el)=> el.name===property) || {}).correctionFactor || 1;
};


const pedalModule = {
  namespaced: true,
  state: {
    //best practice to store lists as objects because you can access faster than with arrays
    audioInput: {},
    audioOutput: {},
    amp: {
      switchedOn: false,
      standBy: false,
      multiEffectAmp: {},
    },
    nodesConnected: false,
    pedalBoard: {
      pedals: {},
    },
    audioContext: {},
    deviceList: [],
  },
  getters: {
    amp(state) {
      return state.amp;
    },
    distortionTypes(state, getters) {
      const distortionsList = [];
      for (const distortionType in audioUtils.DISTORTION_TYPES) {
        distortionsList.push({
          id: distortionType,
          name: audioUtils.DISTORTION_TYPES[distortionType],
          selected: false,
        });
      }
      return distortionsList;
    },
    ampDistortionType(state) {
      return state.amp.multiEffectAmp.getDistortionTypes();
    },
    pedalList(state) {
      return Object.values(state.pedalBoard.pedals);
    },
    switchedOnPedalList(state) {
      return Object.values(state.pedalBoard.pedals).filter((pedal)=> {
        return pedal.switchedOn;
      });
    },
    zoomInPedal(state) {
      return Object.values(state.pedalBoard.pedals).find((pedal)=> pedal.zoomIn);
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
    toggleAmp({state, commit, dispatch, getters}, data) {
      commit('toggleAmp', data);
      if (!state.nodesConnected) {
        dispatch('switchOnAudioContext');
        dispatch('initAudioInputAndOutput');
        commit('connectAllNodes', getters.pedalList);
      }
      dispatch('setAmpComponentEffectProperty', {name: AMP_COMPONENT_NAME.VOLUME, property: 'mute', value: !state.amp.switchedOn || !state.amp.standBy});
    },
    toggleStandByAmp({state, commit, dispatch}, data) {
      commit('toggleStandByAmp', data);
      dispatch('setAmpComponentEffectProperty', {name: AMP_COMPONENT_NAME.VOLUME, property: 'mute', value: !state.amp.switchedOn || !state.amp.standBy});
    },
    createAmp({commit}) {
      commit('createAmp');
    },
    setAmpComponentEffectProperty({commit}, data) {
      commit('setAmpComponentEffectProperty', data);
    },
    initPedals({commit, dispatch}) {
      for (let pedal in PEDAL_NAME) {
        dispatch('addPedal', PEDAL_NAME[pedal]);
      }
    },
    initAudioInputAndOutput({commit, dispatch, getters}) {
      commit('setUserInput');
      commit('setUserOutput');
      dispatch('setDevicesList');
      dispatch('setDevicesListHandler');
    },
    addPedal({state, commit, getters}, type) {
      if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
        const pedal = {
          type,
          switchedOn: false,
          dying: false,
          ...PEDAL_PROPERTIES[type],
        };
        commit('addPedal', pedal);
      }
    },
    configurePedal({state}, type) {
      audioUtils.configAudioNode(state.pedalBoard.pedals[type]);
    },
    // removePedal({state, commit, getters}, pedal) {
    //   if (pedal.dying) return;
    //   commit('killPedal', pedal.type);
    //   setTimeout(()=> {
    //     if (state.pedalBoard.pedals[pedal.type] === pedal) { // check if the node is the same
    //       commit('removePedal', pedal);
    //       commit('connectAllNodes', getters.switchedOnPedalList);
    //     }
    //   }, 200);
    // },
    setPedalProperty({commit}, data) {
      commit('setPedalProperty', data);
    },
    setPedalEffectProperty({commit}, data) {
      commit('setPedalEffectProperty', data);
    },
    togglePedal({state, commit, getters}, type) {
      commit('togglePedal', type);
      if (state.amp.switchedOn) commit('connectAllNodes', getters.pedalList);
    },
    connectAll({state, commit, getters}) {
      if (state.amp.switchedOn) commit('connectAllNodes', getters.pedalList);
    },
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
    toggleAmp(state) {
      state.amp.switchedOn = !state.amp.switchedOn;
    },
    toggleStandByAmp(state) {
      state.amp.standBy = !state.amp.standBy;
    },
    createAmp(state) {
      state.amp.multiEffectAmp = audioUtils.createMultiEffectAmp(state.audioContext);
    },
    setAmpComponentEffectProperty(state, {name, property, value}) {
      state.amp.multiEffectAmp.setAmpComponentEffectProperty({componentName: name, componentProperty: property, value});
    },
    addPedal(state, pedal) {
      pedal.effect = audioUtils.createAudioNode(state.audioContext, pedal.type);
      for (let setting of pedal.settingsList) {
        pedal.effect[setting.name] = setting.value / getPropertyCorrectionFactor(pedal, setting.name);
      }
      Vue.set(state.pedalBoard.pedals, pedal.name, pedal);
    },
    togglePedal(state, name) {
      state.pedalBoard.pedals[name].switchedOn = !state.pedalBoard.pedals[name].switchedOn;
    },
    setPedalProperty(state, {name, property, value}) {
      let pedal = state.pedalBoard.pedals[name];
      if (pedal) {
        pedal[property] = value;
      }
    },
    setPedalEffectProperty(state, {name, property, value}) {
      let pedal = state.pedalBoard.pedals[name];
      if (pedal) {
        pedal.effect[property] = value / getPropertyCorrectionFactor(pedal, property);
      }
    },

    connectAllNodes(state, pedalList) {
      state.nodesConnected = true;
      state.audioInput.connect(state.amp.multiEffectAmp.input);
      const ampOutput = state.amp.multiEffectAmp.output;
      const switchedOnPedalList = pedalList.filter((pedal)=> pedal.switchedOn);
      const switchedOffPedalList = pedalList.filter((pedal)=> !pedal.switchedOn);
      ampOutput.disconnect();
      switchedOffPedalList.forEach((pedal)=> pedal.effect.disconnect());

      if (switchedOnPedalList && switchedOnPedalList.length) {
        switchedOnPedalList.forEach((pedal, index)=> {
          if (index === 0) {
            ampOutput.connect(pedal.effect);
          } else if (index < (switchedOnPedalList.length - 1)) {
            switchedOnPedalList[index - 1].effect.connect(pedal.effect);
          } else {
            switchedOnPedalList[index - 1].effect.connect(pedal.effect);
          }
          if (index === (switchedOnPedalList.length - 1)) {
            pedal.effect.connect(state.audioOutput);
          }
        });
      } else {
        ampOutput.connect(state.audioOutput);
      }
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
