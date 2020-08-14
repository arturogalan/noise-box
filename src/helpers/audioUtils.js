import { capitalize } from 'lodash'
import * as Noisefy from 'noisefy'

const audioUtils = {
  AMP_TYPES: Noisefy.AMP_TYPES,
  DISTORTION_TYPES: Noisefy.DISTORTION_TYPES,
  DISTORTION_PRESETS: Noisefy.DISTORTION_PRESETS,
  CLEAN_PRESETS: Noisefy.CLEAN_PRESETS,
  AMP_COMPONENT_NAME: Noisefy.AMP_COMPONENT_NAME,
  AMP_SETTING_NAME: Noisefy.AMP_SETTING_NAME,
  createAudioContext () {
    if (Noisefy.hasAudioContext) {
      return new AudioContext()
    }
    return null
  },
  getAudioContextProps (audioContext) {
    return {
      baseLatency: audioContext.baseLatency,
      sampleRate: audioContext.sampleRate,
      state: audioContext.state,
    }
  },
  createAudioNode (audioContext, type) {
    const audioNode = new Noisefy[capitalize(type)](audioContext)
    return audioNode
  },
  createInput (audioContext) {
    const input = new Noisefy.Input(audioContext)
    input.getUserMedia()
    return input
  },
  createOutput (audioContext) {
    return new Noisefy.Output(audioContext)
  },
  deviceList () {
    return Noisefy.deviceList()
  },
  deviceListHandler (callback) {
    Noisefy.deviceListHandler(callback)
  },
  createMultiEffectAmp (audioContext) {
    return new Noisefy.Amp(audioContext, Noisefy.AMP_TYPES.WARSHALL)
  },
  getPresetList () {
    return Object.values(Noisefy.PRESET_TYPES)
  },
}

export default audioUtils
