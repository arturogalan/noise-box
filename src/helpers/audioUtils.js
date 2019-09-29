import {capitalize} from 'lodash';
import * as Noisefy from 'noisefy';

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
