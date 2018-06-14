import * as AudioEffects from 'audio-effects';
import _ from 'lodash'


const audioUtils = (function() {
  let module  = {};
  let self    = module;

  module.baseUrlApiBack         = '';

  module.createAudioContext = () => {
    if (HasAudioContext) {
      return new AudioContext()
    }
  }

  module.createAudioNode = (audioContext, pedal) => {
    return new AudioEffects[_.capitalize(pedal.type)](audioContext)
  }
  module.createInput = (audioContext) => {
    const input = new Input(audioContext);
      input.getUserMedia();
    return input
  }
  module.createOutput = (audioContext) => {
    return new Output(audioContext);
  }



  return {
    /* Rest methods */
    createAudioNode:          module.createAudioNode,
    createAudioContext:       module.createAudioContext,      
  }

})();


export default audioUtils;