import Vue from 'vue';
import {PEDAL_NAME, PEDAL_PROPERTIES, AMP_COMPONENT_NAME} from '../constants';
import audioUtils from '../../helpers/audioUtils';
import {isEmpty} from 'lodash';


const getPropertyCorrectionFactor = (component, property)=> {
  return (component.settingsList.find((el)=> el.name===property) || {}).correctionFactor || 1;
};


const pedalModule = {
  namespaced: true,
  state: {
    //best practice to store lists as objects because you can access faster than with arrays
    palettePedals: {},
    audioInput: {},
    audioOutput: {},
    amp: {
      switchedOn: false,
      standBy: false,
      multiEffectAmp: {},
    },
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
          selected: getters.ampDistortionType === audioUtils.DISTORTION_TYPES[distortionType],
        });
      }
      return distortionsList;
    },
    ampDistortionType(state) {
      return (state.amp.components[AMP_COMPONENT_NAME.DISTORTION] || {}).effect.distortionType;
    },
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
    toggleAmp({commit}, data) {
      commit('toggleAmp', data);
    },
    toggleStandByAmp({commit}, data) {
      commit('toggleStandByAmp', data);
    },
    createAmp({commit}) {
      commit('createAmp', audioUtils.createMultiEffectAmp());
    },
    // initAmpComponents({dispatch}) {
    //   for (const component in AMP_COMPONENT_NAME) {
    //     dispatch('addAmpComponent', {name: AMP_COMPONENT_NAME[component]});
    //   }
    // },
    // addAmpComponent({state, commit}, {name}) {
    //   if (name && !state.amp.components[name]) { // add only if not exists
    //     const component = {
    //       name,
    //       switchedOn: true,
    //       dying: false,
    //       ...AMP_COMPONENT_PROPERTIES[name],
    //     };
    //     commit('addComponent', component);
    //   }
    // },
    setAmpComponentEffectProperty({commit}, data) {
      commit('setAmpComponentEffectProperty', data);
    },
    initPalettePedals({commit, dispatch}) {
      commit('clearPalettePedals');
      for (let pedal in PEDAL_NAME) {
        dispatch('addPalettePedal', PEDAL_NAME[pedal]);
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
    initAudioInputAndOutput({commit, dispatch}) {
      commit('setUserInput');
      commit('setUserOutput');
      dispatch('createAmp').then(()=> {
        commit('connectAllNodes');
        dispatch('setDevicesList');
        dispatch('setDevicesListHandler');
      });
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
        commit('connectAllNodes', getters.switchedOnPedalList);
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
          commit('connectAllNodes', getters.switchedOnPedalList);
        }
      }, 200);
    },
    setPedalProperty({commit}, data) {
      commit('setPedalProperty', data);
    },
    setPedalEffectProperty({commit}, data) {
      commit('setPedalEffectProperty', data);
    },
    togglePedal({commit}, type) {
      commit('togglePedal', type);
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
    toggleAmp(state, {value}) {
      state.amp.switchedOn = value;
    },
    toggleStandByAmp(state, {value}) {
      state.amp.standBy = value;
    },
    createAmp(state, amp) {
      state.amp.multiEffectAmp = amp;
    },
    //Visual mutations
    addPalettePedal(state, palettePedal) {
      Vue.set(state.palettePedals, palettePedal.name, palettePedal);
    },
    clearPalettePedals(state) {
      state.palettePedals = {};
    },
    addComponent(state, component) {
      component.effect = audioUtils.createAudioNode(state.audioContext, component.type);
      for (let setting of component.settingsList) {
        component.effect[setting.name] = setting.value / getPropertyCorrectionFactor(component, setting.name);
      }
      audioUtils.configAudioNode(component);
      Vue.set(state.amp.components, component.name, component);
    },
    setAmpComponentEffectProperty(state, {name, property, value}) {
      // let component = state.amp.components[name];
      // if (component) {
      //   if (typeof property === 'number') {
      //     component.effect[property] = value / getPropertyCorrectionFactor(component, property);
      //   } else {
      //     component.effect[property] = value;
      //   }
      // }
      state.amp.multiEffectAmp.setAmpComponentEffectProperty({componentName: name, componentProperty: property, value});
    },
    addPedal(state, pedal) {
      pedal.effect = audioUtils.createAudioNode(state.audioContext, pedal.type);
      for (let setting of pedal.settingsList) {
        pedal.effect[setting.name] = setting.value / getPropertyCorrectionFactor(pedal, setting.name);
      }
      audioUtils.configAudioNode(pedal);
      Vue.set(state.pedalBoard.pedals, pedal.name, pedal);
    },
    togglePedal(state, name) {
      state.pedalBoard.pedals[name].switchedOn = !state.pedalBoard.pedals[name].switchedOn;
    },
    killPedal(state, name) {
      state.pedalBoard.pedals[name].dying = true;
    },
    removePedal(state, pedal) {
      pedal.effect.disconnect();
      Vue.delete(state.pedalBoard.pedals, pedal.name);
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


    // connectPedals(state, switchedOnPedalList) {
    //   switchedOnPedalList.forEach((pedal, index)=> {
    //     if (index === 0) {
    //       state.audioInput.connect(pedal.effect);
    //     }
    //     if (index === (switchedOnPedalList.length - 1)) {
    //       pedal.effect.connect(state.audioOutput);
    //     } else {
    //       pedal.effect.connect(switchedOnPedalList[index + 1].effect);
    //     }
    //   });
    // },


    connectAllNodes(state, switchedOnPedalList) {
      // ampComponentList.forEach((component, index)=> {
      //   if (index === 0) {
      //     state.audioInput.connect(component.effect);
      //   }
      //   if (index < ampComponentList.length - 1) {
      //     component.effect.connect(ampComponentList[index + 1].effect);
      //   }
      // });
      // const lastComponent = ampComponentList[ampComponentList.length - 1];
      state.audioInput.connect(state.amp.multiEffectAmp.input);
      const ampOutput = state.amp.multiEffectAmp.output;

      if (switchedOnPedalList && switchedOnPedalList.length) {
        switchedOnPedalList.forEach((pedal, index)=> {
          if (index === 0) {
            ampOutput.connect(pedal.effect);
          } else if (index < (switchedOnPedalList.length - 1)) {
            pedal.effect.connect(switchedOnPedalList[index + 1].effect);
          } else {
            pedal.effect.connect(state.audioOutput);
          }
        });
      } else {
        ampOutput.connect(state.audioOutput);
      }


      // ampComponentList.forEach((pedal, index)=> {
      //   if (index === 0) {
      //     state.audioInput.connect(pedal.effect);
      //   }
      //   if (index === (ampComponentList.length - 1)) {
      //     pedal.effect.connect(state.audioOutput);
      //   } else {
      //     pedal.effect.connect(ampComponentList[index + 1].effect);
      //   }
      // });
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
