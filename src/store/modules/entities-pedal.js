import Vue from 'vue'
import { PEDAL_NAME, PEDAL_PROPERTIES } from '../constants'
import audioUtils from '../../helpers/audioUtils'
import { isEmpty } from 'lodash'
const trace = (...args) => Vue.prototype.$trace(...args)

const pedalModule = {
  namespaced: true,
  state: {
    // best practice to store lists as objects because you can access faster than with arrays
    audioInput: {},
    audioOutput: {},
    amp: {
      switchedOn: false,
      standBy: false,
      multiEffectAmp: {},
    },
    selectedPreset: '',
    nodesConnected: false,
    pedalBoard: {
      pedals: {},
    },
    audioContext: {},
    deviceList: [],
  },
  getters: {
    amp (state) {
      return state.amp
    },
    audioContextProps (state) {
      return audioUtils.getAudioContextProps(state.audioContext)
    },
    getAmpInputGain (state) {
      return state.amp.multiEffectAmp.getInputGain()
    },
    getAmpOutputGain (state) {
      return state.amp.multiEffectAmp.getOutputGain()
    },
    ampActiveChannel (state) {
      return state.amp.multiEffectAmp.activeChannel
    },
    isCleanChannelActive (state) {
      return state.amp.multiEffectAmp.activeChannel === 1
    },
    isDistoChannelActive (state) {
      return state.amp.multiEffectAmp.activeChannel === 2
    },
    getChannelKnobTypeComponents (state, getters, globalState, globalGetters) {
      trace(globalGetters)
      trace('returning channel active: ', getters.ampActiveChannel, ' knob components')
      trace(state.amp.multiEffectAmp)
      return state.amp.multiEffectAmp.getChannelKnobTypeComponents({channel: getters.ampActiveChannel})
        .filter((component) => component.name !== 'distortionStage1')
    },
    getCleanChannelDistortions (state) {
      return state.amp.multiEffectAmp.getChannelDistortions({channel: 1})
    },
    ampCleanChannelDistoList (state, getters) {
      const lists = []
      getters.getCleanChannelDistortions.forEach((distortion) => {
        lists.push(
          {
            componentName: distortion.componentName,
            distortionType: distortion.distortionType,
            list: state.amp.multiEffectAmp.getDistortionTypes().map((disto) => {
              return {
                id: disto,
                name: disto,
                selected: disto === distortion.distortionType,
              }
            }),
          },
        )
      })
      return lists
    },
    getGainChannelDistortions (state) {
      return state.amp.multiEffectAmp.getChannelDistortions({channel: 2})
    },
    ampGainChannelDistoList (state, getters) {
      const lists = []
      getters.getGainChannelDistortions.forEach((distortion) => {
        lists.push(
          {
            componentName: distortion.componentName,
            distortionType: distortion.distortionType,
            list: state.amp.multiEffectAmp.getDistortionTypes().map((disto) => {
              return {
                id: disto,
                name: disto,
                selected: disto === distortion.distortionType,
              }
            }),
          },
        )
      })
      return lists
    },
    ampCleanPresets (state, getters) {
      const presetSelected = (preset) => {
        return preset.distortionStage1 === getters.ampCleanChannelDistoList.find((el) => el.componentName === 'distortionStage1').distortionType &&
        preset.distortionStage2 === getters.ampCleanChannelDistoList.find((el) => el.componentName === 'distortionStage2').distortionType
      }

      return audioUtils.CLEAN_PRESETS.map((preset) => {
        return {
          id: preset.name,
          ...preset,
          selected: presetSelected(preset),
        }
      })
    },
    ampDistortionPresets (state, getters) {
      const presetSelected = (preset) => {
        return preset.distortionStage1 === getters.ampGainChannelDistoList.find((el) => el.componentName === 'distortionStage1').distortionType &&
        preset.distortionStage2 === getters.ampGainChannelDistoList.find((el) => el.componentName === 'distortionStage2').distortionType
      }

      return audioUtils.DISTORTION_PRESETS.map((preset) => {
        return {
          id: preset.name,
          ...preset,
          selected: presetSelected(preset),
        }
      })
    },
    ampSelectedCabinet (state) {
      return state.amp.multiEffectAmp.getSelectedCabinet()
    },
    ampCabinetList (state, getters, rootState, rootGetters) {
      return state.amp.multiEffectAmp.getCabinetTypes().map((cabinet) => {
        return {
          id: cabinet,
          name: rootGetters['ui/i18n'].t(`AMP.CABINET.${cabinet}`),
          selected: cabinet === getters.ampSelectedCabinet,
        }
      })
    },
    ampCabinetSettings (state) {
      return state.amp.multiEffectAmp.getCabinetSettings()
    },
    ampPresetList (state, getters, rootState, rootGetters) {
      return audioUtils.getPresetList().map((preset) => {
        return {
          id: preset,
          name: rootGetters['ui/i18n'].t(`AMP.PRESET.${preset}`),
          selected: preset === state.selectedPreset,
        }
      })
    },
    getCabinetProperty (state) {
      return (property) => {
        return state.amp.multiEffectAmp.getCabinetProperty({property})
      }
    },
    pedalList (state) {
      return Object.values(state.pedalBoard.pedals)
    },
    switchedOnPedalList (state) {
      return Object.values(state.pedalBoard.pedals).filter((pedal) => {
        return pedal.switchedOn
      })
    },
    zoomInPedal (state) {
      return Object.values(state.pedalBoard.pedals).find((pedal) => pedal.zoomIn)
    },
    audioContext (state) {
      return state.audioContext
    },
    audioInput (state) {
      return state.audioInput
    },
    audioOut (state) {
      return state.audioOut
    },
    defaultAudioDevicesList (state) {
      return state.deviceList.lenght > 1 ? state.deviceList.filter((el) => el.deviceId === 'default') : state.deviceList
    },
    defaultInputDevice (state, getters) {
      const inputDevice = getters.defaultAudioDevicesList.find((el) => el.direction === 'input')
      if (!inputDevice) return ''
      let formattedInput = inputDevice.label;
      [
        'Default',
        'Predeterminado',
        ' - ',
      ].forEach((word) => {
        formattedInput = formattedInput.replace(word, '')
      })
      return formattedInput.replace(/ *\([^)]*\) */g, '')
    },
    defaultOutputDevice (state, getters) {
      const outputDevice = getters.defaultAudioDevicesList.find((el) => el.direction === 'output')
      if (!outputDevice) return ''
      let formattedOutput = outputDevice.label;
      [
        'Default',
        'Predeterminado',
        ' - ',
      ].forEach((word) => {
        formattedOutput = formattedOutput.replace(word, '')
      })
      return formattedOutput.replace(/ *\([^)]*\) */g, '')
    },
  },

  actions: {
    toggleAmp ({ state, commit, dispatch, getters }, data) {
      commit('toggleAmp', data)
      if (!state.nodesConnected) {
        dispatch('initAudioInputAndOutput')
      }
    },
    toggleStandByAmp ({ state, commit, dispatch, getters }, data) {
      commit('connectAllNodes', getters.pedalList)
      commit('toggleStandByAmp', data)
    },
    resetAmp ({dispatch, commit, getters}) {
      // NOT WORKING, firs disconnect all the things
      // dispatch('reinitAudioInputAndOutput')
      // commit('createAmp')
      // commit('connectAllNodes', getters.pedalList)
    },
    toggleAmpChannel ({commit}) {
      commit('toggleAmpChannel')
    },
    createAmp ({ commit }) {
      commit('createAmp')
    },
    setActiveChannelEffectProperty ({ commit, getters }, data) {
      commit('setAmpChannelEffectProperty', {...data, channel: getters.ampActiveChannel})
    },
    setAllChannelEffectProperty ({ commit, getters }, data) {
      commit('setAmpChannelEffectProperty', {...data, channel: 1})
      commit('setAmpChannelEffectProperty', {...data, channel: 2})
    },
    setAmpInputGain ({ commit }, value) {
      commit('setAmpInputEffectProperty', { property: 'level', value })
    },
    setAmpOutputGain ({ commit }, value) {
      commit('setAmpOutputEffectProperty', { property: 'level', value })
    },
    setChannelDistoType ({ commit }, data) {
      commit('setChannelDistoType', data)
    },
    setAmpCabinetType ({ commit }, { value }) {
      commit('setCabinetProperty',
        {
          property: audioUtils.AMP_SETTING_NAME.CABINET_IMPULSE,
          value,
        },
      )
    },
    setAmpCabinetSettings ({ commit }, { property, value }) {
      commit('setCabinetProperty',
        {
          property,
          value,
        },
      )
    },
    setPreset ({ commit }, data) {
      commit('setPreset', data.id)
    },
    initPedals ({ commit, dispatch }) {
      for (const pedal in PEDAL_NAME) {
        dispatch('addPedal', PEDAL_NAME[pedal])
      }
    },
    initAudioInputAndOutput ({ commit, dispatch, getters }) {
      commit('setUserInput')
      return dispatch('activateUserInput').then(() => {
        commit('setUserOutput')
        dispatch('setDevicesList')
        dispatch('setDevicesListHandler')
      })
    },
    activateUserInput ({state}) {
      return state.audioInput.activateInput()
    },
    reinitAudioInputAndOutput ({ commit, dispatch, getters }) {
      commit('resetUserInput')
      commit('resetUserOutput')
    },
    addPedal ({ state, commit, getters }, type) {
      if (type && !state.pedalBoard.pedals[type]) { // add only if not exists
        const pedal = {
          type,
          switchedOn: false,
          dying: false,
          ...PEDAL_PROPERTIES[type],
        }
        commit('addPedal', pedal)
      }
    },
    configurePedal ({ state }, type) {
      audioUtils.configAudioNode(state.pedalBoard.pedals[type])
    },
    setPedalProperty ({ commit }, data) {
      commit('setPedalProperty', data)
    },
    setPedalEffectProperty ({ commit }, data) {
      commit('setPedalEffectProperty', data)
    },
    togglePedal ({ state, commit, getters }, type) {
      commit('togglePedal', type)
      if (state.amp.switchedOn) commit('connectAllNodes', getters.pedalList)
    },
    createAudioContext ({ commit }) {
      commit('setAudioContext', audioUtils.createAudioContext())
    },
    setDevicesList ({ commit }) {
      audioUtils.deviceList().then((deviceList) => {
        commit('setDevicesList', deviceList.filter((el) => el.type === 'audio'))
      })
    },
    setDevicesListHandler ({ commit }) {
      audioUtils.deviceListHandler((newDeviceList, event) => {
        commit('setDevicesList', newDeviceList.filter((el) => el.type === 'audio'))
      })
    },
  },

  mutations: {
    toggleAmp (state) {
      state.amp.switchedOn = !state.amp.switchedOn
      state.amp.multiEffectAmp.muted = !state.amp.standBy || !state.amp.switchedOn
    },
    toggleStandByAmp (state) {
      state.amp.standBy = !state.amp.standBy
      if (state.amp.switchedOn) {
        state.amp.multiEffectAmp.muted = !state.amp.standBy
      } else {
        state.amp.multiEffectAmp.muted = true
      }
    },
    createAmp (state) {
      state.amp.multiEffectAmp = audioUtils.createMultiEffectAmp(state.audioContext)
    },
    toggleAmpChannel (state) {
      state.amp.multiEffectAmp.toggleChannel()
    },
    setAmpInputEffectProperty (state, { property, value }) {
      state.amp.multiEffectAmp.setAmpInputEffectProperty({componentProperty: property, value})
    },
    setAmpOutputEffectProperty (state, { property, value }) {
      state.amp.multiEffectAmp.setAmpOutputEffectProperty({componentProperty: property, value})
    },

    setAmpChannelEffectProperty (state, { channel, name, property, value }) {
      state.amp.multiEffectAmp.setAmpChannelEffectProperty({ channel, componentName: name, componentProperty: property, value })
    },
    setChannelDistoType (state, { channel, name, value }) {
      state.amp.multiEffectAmp.setAmpChannelEffectProperty(
        {
          channel,
          componentName: name,
          componentProperty: audioUtils.AMP_SETTING_NAME.DISTORTION_TYPE,
          value,
        },
      )
    },
    setCabinetProperty (state, data) {
      state.amp.multiEffectAmp.setCabinetProperty({...data})
    },
    setPreset (state, value) {
      state.selectedPreset = value
      state.amp.multiEffectAmp.preset = state.selectedPreset
    },
    addPedal (state, pedal) {
      pedal.effect = {}
      pedal.isInitialized = false
      for (const setting of pedal.settingsList) {
        pedal.effect[setting.name] = setting.value
      }
      Vue.set(state.pedalBoard.pedals, pedal.name, pedal)
    },
    togglePedal (state, name) {
      const pedal = state.pedalBoard.pedals[name]
      pedal.switchedOn = !pedal.switchedOn
    },
    setPedalProperty (state, { name, property, value }) {
      const pedal = state.pedalBoard.pedals[name]
      if (pedal) {
        pedal[property] = value
      }
    },
    setPedalEffectProperty (state, { name, property, value }) {
      const pedal = state.pedalBoard.pedals[name]
      if (pedal) {
        pedal.effect[property] = value
      }
    },

    connectAllNodes (state, pedalList) {
      const userInput = state.audioInput
      const ampOutput = state.amp.multiEffectAmp.output
      state.nodesConnected = true
      userInput.connect(state.amp.multiEffectAmp.input)
      ampOutput.disconnect()
      const switchedOnPedalList = pedalList.filter((pedal) => pedal.switchedOn)
      const switchedOffPedalList = pedalList.filter((pedal) => !pedal.switchedOn)
      switchedOffPedalList.forEach((pedal) => { if (pedal.isInitialized) pedal.effect.disconnect() })
      if (switchedOnPedalList && switchedOnPedalList.length) {
        switchedOnPedalList.forEach((pedal, index) => {
          if (!pedal.isInitialized) {
            const effectsPrepopulated = {...pedal.effect}
            pedal.effect = audioUtils.createAudioNode(state.audioContext, pedal.type)
            for (const effect in effectsPrepopulated) {
              pedal.effect[effect] = effectsPrepopulated[effect]
            }
          }
          if (index === 0) {
            ampOutput.connect(pedal.effect)
          } else if (index < (switchedOnPedalList.length - 1)) {
            switchedOnPedalList[index - 1].effect.connect(pedal.effect)
          } else {
            switchedOnPedalList[index - 1].effect.connect(pedal.effect)
          }
          if (index === (switchedOnPedalList.length - 1)) {
            pedal.effect.connect(state.audioOutput)
          }
        })
      } else {
        ampOutput.connect(state.audioOutput)
      }
    },
    // Audio mutations
    setAudioContext (state, audioContext) {
      Vue.set(state, 'audioContext', audioContext)
    },
    setUserInput (state) {
      if (isEmpty(state.audioInput)) {
        Vue.set(state, 'audioInput', audioUtils.createInput(state.audioContext))
        trace(state.audioInput)
      }
    },
    setUserOutput (state) {
      if (isEmpty(state.audioOutput)) {
        Vue.set(state, 'audioOutput', audioUtils.createOutput(state.audioContext))
      }
    },
    resetUserInput (state) {
      Vue.set(state, 'audioInput', audioUtils.createInput(state.audioContext))
      trace(state.audioInput)
    },
    resetUserOutput (state) {
      Vue.set(state, 'audioOutput', audioUtils.createOutput(state.audioContext))
    },
    setDevicesList (state, deviceList) {
      Vue.set(state, 'deviceList', deviceList)
    },
  },
}

export default pedalModule
