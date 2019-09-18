import {capitalize} from 'lodash';
import * as Noisefy from 'noisefy';
import {PEDAL_TYPE} from '../store/constants';
const irf = require('../static/audio/hall-reverb.ogg');

const audioUtils = {
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
    console.log('latency', audioContext.baseLatency);
    return convertToMono(input, audioContext);
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
  createMultiEffectAmp() {
    return new Noisefy.Amp(Noisefy.AMP_TYPES.WARSHALL);
  },
};

function convertToMono(input, audioContext) {
  let splitter = audioContext.createChannelSplitter(2);
  let merger = audioContext.createChannelMerger(2);

  input.connect(splitter);
  splitter.connect(merger, 0, 0);
  splitter.connect(merger, 0, 1);
  return input;
}


export default audioUtils;
