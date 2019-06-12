<script>
import ChickenHeadKnob from '../../common/chicken-head-knob.vue';
import {mapActions, mapGetters} from 'vuex';
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
      mainVolumeLevel: 30,
      isAudioInitializated: false,
      isMuted: true,
      isSwitchedOn: false,
      AMP_COMPONENT_TYPE,
    };
  },
  computed: {
    ...mapGetters('pedal', [
      'ampComponentList',
    ]),
  },
  created() {
    this.initAmpComponents();
  },
  methods: {
    ...mapActions('pedal', [
      'switchOnAudioContext',
      'initAmpComponents',
      'initAudioInputAndOutput',
      'setAmpComponentEffectProperty',
      'toggleAmp',
    ]),
    initAudioInterface() {
      if (!this.isAudioInitializated) {
        this.switchOnAudioContext();
        this.initAudioInputAndOutput();
        // this.setAmpComponentEffectProperty({type: AMP_COMPONENT_TYPE.VOLUME, property: 'level', value: this.mainVolumeLevel});
        // this.setAmpComponentEffectProperty({type: AMP_COMPONENT_TYPE.VOLUME, property: 'mute', value: this.isMuted});
        this.isAudioInitializated = true;
      }
    },
    toogleMuteAudio() {
      // Only toggle if power switch is ON
      if (this.isSwitchedOn) {
        this.isMuted = !this.isMuted;
        this.setAmpComponentEffectProperty({type: AMP_COMPONENT_TYPE.VOLUME, property: 'mute', value: this.isMuted});
      }
    },
    toogleSwitchOnAmp() {
      this.initAudioInterface();
      this.isSwitchedOn = !this.isSwitchedOn;
      this.toggleAmp({value: this.isSwitchedOn});
    },
    getKnobTypes(settingsList) {
      return settingsList.filter((setting)=> setting.type === 'knob');
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

      <template
        v-for="component in ampComponentList"
      >

        <chicken-head-knob
          v-for="knobSetting in getKnobTypes(component.settingsList)"
          :key="knobSetting.name"
          :name="knobSetting.name"
          :init-value="knobSetting.value"
          @valueChanged="setAmpComponentEffectProperty({type: component.type, property: knobSetting.name, value: $event})"
        />


      <!-- <chicken-head-knob
        :init-value="mainVolumeLevel"
        name="volume"
        @valueChanged="setAmpComponentEffectProperty({type: AMP_COMPONENT_TYPE.VOLUME, property: 'level', value: $event})"
      /> -->
      </template>
      <!-- <chicken-head-knob
        :name="'trebble'"
        :init-value="25"
      />
      <chicken-head-knob
        :name="'middle'"
        :init-value="50"
      />
      <chicken-head-knob
        :name="'bass'"
        :init-value="70"
      /> -->
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
