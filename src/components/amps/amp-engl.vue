<script>
import ChickenHeadKnob from '../common/chicken-head-knob.vue';
import audioMaps from '../../helpers/audioMaps';
import {mapActions, mapGetters} from 'vuex';
import SwitchOn from './../common/switch-on.vue';
import {AMP_COMPONENT_TYPE, AMP_COMPONENT_NAME} from '../../store/constants';


export default {
  name: 'amp-engl',
  components: {
    ChickenHeadKnob,
    SwitchOn,
  },
  data() {
    return {
      mainVolumeLevel: 30,
      isAudioInitializated: false,
      isMuted: true,
      isSwitchedOn: false,
      AMP_COMPONENT_TYPE,
    };
  },
  computed: {
    ...mapGetters('pedal', [
      'amp',
    ]),
  },
  created() {
  },
  methods: {
    ...mapActions('pedal', [
      'switchOnAudioContext',
      'initAudioInputAndOutput',
      'setAmpComponentEffectProperty',
      'toggleAmp',
      'toggleStandByAmp',
    ]),
    initAudioInterface() {
      if (!this.isAudioInitializated) {
        this.switchOnAudioContext();
        this.initAudioInputAndOutput();
        this.isAudioInitializated = true;
      }
    },
    toogleMuteAudio() {
      // Only toggle if power switch is ON
      if (this.isSwitchedOn) {
        this.isMuted = !this.isMuted;
        this.setAmpComponentEffectProperty({name: AMP_COMPONENT_NAME.VOLUME, property: 'mute', value: this.isMuted});
        this.toggleStandByAmp({value: !this.isMuted});
      }
    },
    toogleSwitchOnAmp() {
      this.initAudioInterface();
      this.isSwitchedOn = !this.isSwitchedOn;
      this.toggleAmp({value: this.isSwitchedOn});
    },
    normalize(value) {
      return audioMaps.getNormalizedSettingValue(value);
    },
    denormalize(value) {
      return audioMaps.setNormalizedSettingValue(value);
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
        src="../../assets/img/cable-input.svg"
      >
    </div>
    <div class="knob-grid" >

      <div
        v-for="component in amp.multiEffectAmp.getKnobComponentsSettings()"
        :key="component.name"
        class="component-grid"
      >
        <chicken-head-knob
          v-for="knobSetting in component.knobSettingList"
          :key="knobSetting.name"
          :name="$t(`AMP.COMPONENT.${component.name.toUpperCase()}.${knobSetting.name.toUpperCase()}`)"
          :init-value="normalize(knobSetting.value)"
          @valueChanged="setAmpComponentEffectProperty({name: component.name, property: knobSetting.name, value: denormalize($event)})"
        />
      </div>
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
  grid-template-columns: 10% 75% 15%;/*Make the grid smaller than the container*/
  grid-gap: 5px;
}
.amp-wrapper {
  width: 100%;
  height: 9rem;
  background-color: rgb(70,70,70);
  box-shadow: inset 0px 1px 20px 0px rgb(0, 0, 0);
  min-width: $app-min-width + 12px;
}
.knob-grid {
    position: relative;
    z-index: $z-index-3;
    width: 100%;
}
.component-grid{
  display: flex;
  flex-direction: row;
  .container {
    margin-left: .5rem;
    margin-right: .5rem;
  }
  // & > container + container {
  //   margin-right: 1.7rem;
  // }
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
