<script>
import ChickenHeadKnob from '../common/chicken-head-knob.vue'
import audioMaps from '../../helpers/audioMaps'
import { mapActions, mapGetters } from 'vuex'
import SwitchOn from './../common/switch-on.vue'
import Led from './../common/led.vue'

import { AMP_COMPONENT_TYPE } from '../../store/constants'

export default {
  name: 'AmpEngl',
  components: {
    ChickenHeadKnob,
    SwitchOn,
    Led,
  },
  data () {
    return {
      mainVolumeLevel: 30,
      isAudioInitializated: false,
      isMuted: true,
      isSwitchedOn: false,
      AMP_COMPONENT_TYPE,
    }
  },
  computed: {
    ...mapGetters('pedal', [
      'amp',
      'isCleanChannelActive',
      'isDistoChannelActive',
      'getChannelKnobTypeComponents',
    ]),
  },
  created () {
  },
  methods: {
    ...mapActions('pedal', [
      'switchOnAudioContext',
      'initAudioInputAndOutput',
      'setActiveChannelEffectProperty',
      'toggleAmp',
      'toggleStandByAmp',
      'toggleAmpChannel',
    ]),
    initAudioInterface () {
      if (!this.isAudioInitializated) {
        this.switchOnAudioContext()
        this.initAudioInputAndOutput()
        this.isAudioInitializated = true
      }
    },
    toogleMuteAudio () {
      this.toggleStandByAmp()
    },
    toogleSwitchOnAmp () {
      this.toggleAmp()
    },
    normalize (value) {
      return audioMaps.getNormalizedSettingValue(value)
    },
    denormalize (value) {
      return audioMaps.setNormalizedSettingValue(value)
    },
    setKnobValue (component, knobSetting, value) {
      // when setting disto intensity also set the asymetric disto intensity to the same value in SIMPLE mode
      if (component.name === 'distortionStage2') {
        this.setActiveChannelEffectProperty({ name: 'distortionStage1', property: knobSetting.name, value: this.denormalize(value) })
      }
      this.setActiveChannelEffectProperty({ name: component.name, property: knobSetting.name, value: this.denormalize(value) })
    },
  },
}
</script>
<template>
  <div class="amp-wrapper grid-container">
    <div class="input-cable-wrapper">
      <img
        class="input-cable"
        src="../../assets/img/cable-input.svg"
      >
    </div>
    <div class="channel-wrapper">
      <div class="row">
        <div class="col">
          <div class="channel-name">
            {{ $t('AMP.CHANNEL.CLEAN') }}
          </div>
          <led
            :on="isCleanChannelActive"
            color="green"
            size="big"
          />
        </div>
        <div class="col">
          <div class="channel-name">
            {{ $t('AMP.CHANNEL.DISTO') }}
          </div>
          <led
            :on="isDistoChannelActive"
            color="red"
            size="big"
          />
        </div>
      </div>

      <button
        v-tooltip="{text: $t(`TOOLTIP.AMP.CHANNEL.${isCleanChannelActive ? 'CLEAN' : 'DISTO'}`)}"
        v-focus-stroke="{size: '2'}"
        class="channel-btn"
        :class="`channel-btn--${isDistoChannelActive ? 'on' : 'off'}`"
        @click="toggleAmpChannel"
      >
        {{ $t('TOOLTIP.AMP.CHANNEL.TEXT') }}
      <!-- {{ ampActiveChannel }} -->
      </button>
    </div>
    <div class="knob-grid">
      <div
        v-for="component in getChannelKnobTypeComponents"
        :key="component.name"
        class="component-grid"
      >
        <chicken-head-knob
          v-for="knobSetting in component.settingList"
          :key="knobSetting.name"
          :name="$t(`AMP.COMPONENT.${component.name.toUpperCase()}.${knobSetting.name.toUpperCase()}`)"
          :init-value="normalize(knobSetting.value)"
          @valueChanged="setKnobValue(component, knobSetting, $event)"
        />
      </div>
    </div>
    <div class="power-section">
      <switch-on
        :name="$t('AMP.BUTTONS.STANDBY')"
        :tooltip-key="`TOOLTIP.AMP.BUTTONS.STANDBY_${amp.switchedOn ? 'ON' : 'OFF'}`"
        color="black"
        @click="toogleMuteAudio()"
      />
      <switch-on
        :name="$t('AMP.BUTTONS.POWER')"
        tooltip-key="TOOLTIP.AMP.BUTTONS.POWER"
        @click="toogleSwitchOnAmp()"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  justify-content: center;
  grid-template-columns: 6% 8% 72% 14%;/*Make the grid smaller than the container*/
  grid-gap: 10px;
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
.channel-wrapper {
  width: 7rem;
  align-self: center;
  height: 50%;
}
.channel-btn {
  &:focus {outline:0;}
  font-family: "FontPbio";
  font-size: .7rem;
  color: black;
  cursor: pointer;
  border-radius: .3rem;
  &--on {
    box-shadow: 0px 2px 5px 3px rgb(0, 0, 0);
  }
  &--off {
    box-shadow: 0px 1px 5px 0px rgb(0, 0, 0);
  }
}
.row {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  height: 60%;
}
.col {
  display: flex;
  flex-flow: column;
  align-items: center;
  column-gap: 1rem;
}
.channel-name {
  text-transform: uppercase;
  font-weight: bold;
  color: aliceblue;
  width: 100%;
  font-size: .5rem;
  font-family: "FontPbio";
  margin-bottom: .3rem;
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
