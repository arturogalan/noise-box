import {capitalize} from 'lodash';
import * as Noisefy from 'noisefy';
import {PEDAL_TYPE} from '../store/constants';
const irf = require('../static/audio/hall-reverb.ogg');

const audioUtils = {
  createAudioContext() {
    if (Noisefy.hasAudioContext) {
      return new AudioContext();
    }
    return null;
  },
  createAudioNode(audioContext, type) {
    console.log(capitalize(type));

    let audioNode = new Noisefy[capitalize(type)](audioContext);
    return audioNode;
  },
  configAudioNode(pedal) {
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
