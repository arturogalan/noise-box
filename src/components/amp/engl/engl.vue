<script>
import ChickenHeadKnob from '../../common/chicken-head-knob.vue';
import {mapActions} from 'vuex';
import SwitchOn from './../../common/switch-on.vue';
import {AMP_COMPONENT_TYPE} from '../../../store/constants';


export default {
  name: 'Engl',
  components: {
    ChickenHeadKnob,
    SwitchOn,
  },
  data() {
    return {
      initialMainVolumeLevel: 30,
      isAudioInitializated: false,
      isMuted: true,
      isSwitchedOn: false,
    };
  },
  methods: {
    ...mapActions('pedal', [
      'switchOnAudioContext',
      'initAudioInputAndOutput',
      'setAmpComponentEffectProperty',
      'toggleAmp',
    ]),
    initAudioInterface() {
      if (!this.isAudioInitializated) {
        this.switchOnAudioContext();
        this.initAudioInputAndOutput();
        this.setAmpComponentEffectProperty({type: AMP_COMPONENT_TYPE.VOLUME, property: 'level', value: this.initialMainVolumeLevel});
        this.setAmpComponentEffectProperty({type: AMP_COMPONENT_TYPE.VOLUME, property: 'mute', value: this.isMuted});
        this.isAudioInitializated = true;
      }
    },
    toogleMuteAudio() {
      this.isMuted = !this.isMuted;
      this.setAmpComponentEffectProperty({type: AMP_COMPONENT_TYPE.VOLUME, property: 'mute', value: this.isMuted});
    },
    toogleSwitchOnAmp() {
      this.initAudioInterface();
      this.isSwitchedOn = !this.isSwitchedOn;
      this.toggleAmp({value: this.isSwitchedOn});
    },
  },
};
</script>
<template>
  <div class="amp-wrapper grid-container">
    <div class="input-cable-wrapper">
      <img
        ref="chicken"
        class="input-cable"
        src="../../../assets/img/cable-input.svg"
      >
    </div>
    <div class="knob-grid" >
      <chicken-head-knob
        :name="'volume'"
        :knobs-number="1"
        :init-value="10"
      />
      <chicken-head-knob
        :name="'trebble'"
        :knobs-number="1"
        :init-value="25"
      />
      <chicken-head-knob
        :name="'middle'"
        :knobs-number="1"
        :init-value="50"
      />
      <chicken-head-knob
        :name="'bass'"
        :knobs-number="1"
        :init-value="70"
      />
    </div>
    <div class="power-section">
      <switch-on
        name="Stand by"
        color="black"
        @click="toogleMuteAudio()"/>
      <switch-on @click="toogleSwitchOnAmp()"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  justify-content: center;
  grid-template-columns: 15% 70% 15%;/*Make the grid smaller than the container*/
  grid-gap: 5px;
}
.amp-wrapper {
  width: 100%;
  height: 9rem;
  background-color: rgb(70,70,70);
  box-shadow: inset 0px 1px 20px 0px rgb(0, 0, 0);
}
.knob-grid {
    position: relative;
    z-index: $z-index-pedal;
    display: flex;
    justify-content: space-around;
    width: 80%;
}
.input-cable {
  width: 3rem;
  &-wrapper{
    align-self: center;
  }
}
.power-section {
   display: flex;
   justify-content: space-between;
   align-self: center;
   width: 70%;
}
.one-knob {
  cursor: pointer;
  margin-right: .3rem;
  &--normal {
    width: 3rem;
  }
  &--zoom-in {
    width: 10rem;
  }
}
</style>
