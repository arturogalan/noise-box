<script>
import ChickenHeadKnob from '../../common/chicken-head-knob.vue';
import {mapActions} from 'vuex';
import SwitchOn from './../../common/switch-on.vue';
import {PEDAL_TYPE} from '../../../store/constants';


export default {
  name: 'Engl',
  components: {
    ChickenHeadKnob,
    SwitchOn,
  },
  methods: {
    ...mapActions('pedal', [
      'switchOnAudioContext',
      'initAudioInutAndOutput',
      'setPedalEffectProperty',
    ]),
    initAudioInterface() {
      this.switchOnAudioContext();
      this.initAudioInutAndOutput();
      this.updateMainVolumeLevel(this.initialMainVolumeLevel);
    },
    updateMainVolumeLevel(value) {
      this.setPedalEffectProperty({type: PEDAL_TYPE.VOLUME, property: 'level', value});
    },
    toogleMuteAudio() {

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
      <switch-on @click="initAudioInterface()"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  justify-content: center;
  grid-template-columns: 15% 60% 25%;/*Make the grid smaller than the container*/
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
    width: 100%;
}
.input-cable {
  width: 3rem;
  &-wrapper{
    align-self: center;
  }
}
.power-section {
   display: flex;
   justify-content: space-around;
   align-self: center;
   width: 82%;
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
