<script>
import vueSliderNb from './vue-slider-nb.vue';
import switchOn from './switch-on.vue';
import {mapActions} from 'vuex';
import {PEDAL_TYPE} from '../store/constants';

export default {
  name: 'MasterControl',
  components: {
    vueSliderNb,
    switchOn,
  },
  data() {
    return {
      initialMainVolumeLevel: 0,
    };
  },
  methods: {
    ...mapActions('pedal', [
      'switchOnAudioContext',
      'initAudioInutAndOutput',
      'setPedalProperty',
    ]),
    initAudioInterface() {
      this.switchOnAudioContext();
      this.initAudioInutAndOutput();
      this.updateMainVolumeLevel(this.initialMainVolumeLevel);
    },
    updateMainVolumeLevel(value) {
      this.setPedalProperty({type: PEDAL_TYPE.VOLUME, property: 'level', value});
    },
  },
};
</script>
<template>
  <div class="centered-parent">
    <span class="slider-title slider-title--small">Power</span>
    <switch-on @click="initAudioInterface()"/>
    <span class="slider-title slider-title--big">Volume</span>
    <div class="centered-child">
      <vue-slider-nb
        :value="initialMainVolumeLevel"
        @change="updateMainVolumeLevel"/>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .slider-title {
    font-family: "FontPbio";
    margin: 0.5em 0 0.5em 0;
    display: inline-block;
    &--small {
      font-size: 12px;
    }
    &--big {
      font-size: 16px;
    }
  }
  .centered-parent{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .centered-child{
    display: inline-block;
  }
  // unused: This is if we want to put more than one slider in the right side
  .slide-container {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-left: 15%;
  }
  .slider-value-container {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }
</style>
