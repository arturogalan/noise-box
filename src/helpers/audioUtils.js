import {capitalize} from 'lodash'
import irf from 'file-loader!../audio/hall-reverb.ogg';
import * as AudioEffects from 'audio-effects';

const audioUtils = {
 createAudioContext(){
    if (AudioEffects.HasAudioContext) {
      return new AudioContext()
    }
  },
  createAudioNode(audioContext, type){
    console.log(AudioEffects.Distortion);
    debugger;
    let audioNode = new AudioEffects['Distorsion'](audioContext);
    if(pedal.type === 'reverb') {
      AudioEffects.Reverb.getInputResponseFile(irf).then(buffer => {
        audioNode.buffer = buffer;
      });
    }
    return audioNode;
  },
  createInput(audioContext){
    const input = new AudioEffects.Input(audioContext);
      input.getUserMedia();
    return input
  },
  createOutput(audioContext){
    return new AudioEffects.Output(audioContext);
  }
};


export default audioUtils;