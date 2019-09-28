import {capitalize} from 'lodash';
import * as Noisefy from 'noisefy';
import {PEDAL_TYPE} from '../store/constants';
const irf = require('../static/audio/hall-reverb.ogg');

const audioUtils = {
  AMP_TYPES: Noisefy.AMP_TYPES,
  DISTORTION_TYPES: Noisefy.DISTORTION_TYPES,
  createAudioContext() {
    if (Noisefy.hasAudioContext) {
      return new AudioContext();
    }
    return null;
  },
  createAudioNode(audioContext, type) {
    console.log(`Creating ${capitalize(type)} audio node`);

    let audioNode = new Noisefy[capitalize(type)](audioContext);
    return audioNode;
  },
  configAudioNode(pedal) {
    // TODO change this with proper initialization inside noisefy reverb
    if (pedal.type === PEDAL_TYPE.REVERB) {
      Noisefy.Reverb.getInputResponseFile(irf).then((buffer)=> {
        if (!pedal.effect.buffer) {
          pedal.effect.buffer = buffer;
        }
      }).catch((e)=> {
        console.error('Error processing file:', e);
      });
    }
  },
  createInput(audioContext) {
    const input = new Noisefy.Input(audioContext);
    let stream = input.getUserMedia();
    console.log(stream);
    return input;
  },
  createOutput(audioContext) {
    return new Noisefy.Output(audioContext);
  },
  deviceList() {
    return Noisefy.deviceList();
  },
  deviceListHandler(callback) {
    Noisefy.deviceListHandler(callback);
  },
  createMultiEffectAmp(audioContext) {
    return new Noisefy.Amp(audioContext, Noisefy.AMP_TYPES.WARSHALL);
  },
};

export default audioUtils;
