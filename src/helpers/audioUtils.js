import {capitalize} from 'lodash'
import irf from 'file-loader!../audio/hall-reverb.ogg';
import * as Noisefy from 'noisefy';
import {PEDAL_TYPE} from '../store/constants';

const audioUtils = {
 createAudioContext(){
    if (Noisefy.hasAudioContext) {
      // return new AudioContext({ latencyHint: 'playback' });
      return new AudioContext();
    }
  },
  createAudioNode(audioContext, type){
    let audioNode = new Noisefy[capitalize(type)](audioContext);
    return audioNode;
  },
  configAudioNode(pedal){
    if(pedal.type === PEDAL_TYPE.REVERB) {
      Noisefy.Reverb.getInputResponseFile(irf).then(buffer => {
        console.log('entra')
        if(!pedal.effect.buffer){
          pedal.effect.buffer = buffer;
        }
      }).catch((e)=>{
        console.log(e)
      });
    }
  },
  createInput(audioContext){
    const input = new Noisefy.Input(audioContext);
    debugger;
    let audioSource = '';

    input.getUserMedia();
  //   .then(function (stream) {
  //     window.stream = stream; // make stream available to console
  //     // Refresh button list in case labels have become available
  // })

    // input.level = 0.5;
    // input.mute = false;
    console.log('latency',audioContext.baseLatency);
    return convertToMono(input, audioContext);
  },
  createOutput(audioContext){
    return new Noisefy.Output(audioContext);
  }
};

function convertToMono(input, audioContext) {
  var splitter = audioContext.createChannelSplitter(2);
  var merger = audioContext.createChannelMerger(2);

  input.connect(splitter);
  splitter.connect(merger, 0, 0);
  splitter.connect(merger, 0, 1);
  return input;
}

export default audioUtils;