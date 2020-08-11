<script>
import dropdown from '../common/dropdown'
import vueSliderNb from '../common/vue-slider-nb.vue'

import audioMaps from '../../helpers/audioMaps'
import { mapGetters, mapActions } from 'vuex'
// import {AMP_COMPONENT_NAME} from '../../store/constants';

export default {
  name: 'RackEngl',
  components: {
    dropdown,
    vueSliderNb,
  },
  computed: {
    ...mapGetters('pedal', [
      'ampCleanPresets',
      'ampDistortionPresets',
      'ampCabinetList',
      'ampCabinetSettings',
      'ampPresetList',
      'getCabinetProperty',
      'isCleanChannelActive',
      'isDistoChannelActive',
    ]),
  },

  methods: {
    ...mapActions('pedal', [
      'setChannelDistoType',
      'setAmpCabinetType',
      'setAmpCabinetSettings',
      'setPreset',
    ]),
    setCleanType (selectedPreset) {
      this.setChannelDistoType({ channel: 1, name: 'distortionStage1', value: selectedPreset.distortionStage1 })
      this.setChannelDistoType({ channel: 1, name: 'distortionStage2', value: selectedPreset.distortionStage2 })
    },
    setDistortionType (selectedPreset) {
      this.setChannelDistoType({ channel: 2, name: 'distortionStage1', value: selectedPreset.distortionStage1 })
      this.setChannelDistoType({ channel: 2, name: 'distortionStage2', value: selectedPreset.distortionStage2 })
    },
    setCabinetType (selectedCabinet) {
      this.setAmpCabinetType({ value: selectedCabinet.id })
    },
    normalize (value) {
      return audioMaps.getNormalizedSettingValue(value)
    },
    denormalize (value) {
      return audioMaps.setNormalizedSettingValue(value)
    },
  },
}
</script>
<template>
  <div class="rack-wrapper">
    <div class="rack-section rack-section--left">
      <div class="rack-box">
        <div
          class="rack-label"
          :style="isCleanChannelActive && {textShadow: '-2px 0 black, 0 2px darkgreen, 2px 0 green, 0 3px green'}"
        >
          {{ $t('AMP.CHANNEL.CLEAN') }}
        </div>
        <dropdown
          :list="ampCleanPresets"
          name="cleanType"
          tooltip-key="TOOLTIP.AMP.CHANNEL.CLEAN_PRESETS"
          @selected="setCleanType"
        />
        <!-- :name="distoList.componentName" -->
      </div>
    </div>
    <div class="rack-section">
      <div class="rack-box">
        <div
          class="rack-label"
          :style="isDistoChannelActive && {textShadow: '-2px 0 black, 0 2px red, 2px 0 red, 0 3px red'}"
        >
          {{ $t('AMP.CHANNEL.DISTORTION') }}
        </div>
        <dropdown
          :list="ampDistortionPresets"
          name="distoType"
          tooltip-key="TOOLTIP.AMP.CHANNEL.DISTO_PRESETS"
          @selected="setDistortionType"
        />
        <!-- :name="distoList.componentName" -->
      </div>
    </div>
    <div class="rack-section rack-section--right">
      <div class="rack-box">
        <div class="rack-label">
          CABINET
        </div>
        <dropdown
          :list="ampCabinetList"
          name="cabinetType"
          tooltip-key="TOOLTIP.AMP.CHANNEL.CABINET_PRESETS"
          @selected="setCabinetType"
        />
        <div class="knob-grid-wrapper">
          <section class="knob-grid">
            <section
              v-for="setting in ampCabinetSettings"
              :key="setting.name"
            >
              <div class="setting-name">
                {{ $t(`AMP.COMPONENT.CABINET.${setting.name.toUpperCase()}`) }}
              </div>
              <vue-slider-nb
                size="medium"
                :value="normalize(getCabinetProperty(setting.name))"
                :value-color="'hsl(20,53%,55%)'"
                :value-fill-color="'hsl(20,23%,55%)'"
                @change="setAmpCabinetSettings({property: setting.name, value: denormalize($event)})"
              />
            </section>
          </section>
        </div>
      </div>
    </div>
    <!-- <div class="rack-section rack-section--right">
      <div class="rack-box">
        <div class="rack-label">
          PRESET
        </div>
        <dropdown
          :list="ampPresetList"
          name="presetType"
          placeholder="Select a preset"
          @selected="setPreset"
        />
      </div>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.rack-wrapper {
  padding-left: 3%;
  width: 97%;
  height: 6rem;
  background-color: rgb(70,70,70);
  box-shadow: inset 0px 1px 10px 0px rgb(0, 0, 0);
  min-width: $app-min-width + 12px;
  display: grid;
  grid-template-columns: 30% 30% 40%;
  // grid-gap: 2px;
  // justify-content: center;
  // text-align: center;
}
.rack-box {
  border-radius: .3rem;
  box-shadow: 0px 1px 5px 0px rgb(0, 0, 0);
  display: flex;
  align-items: center;
  padding: 1rem 1rem 1rem 1rem;
}
.rack-section {
  // max-width: 100%;
  max-height: 60%;
  display: flex;
  // justify-content: flex-start;
  align-items: center;
  margin: 1rem 0rem 0rem 0rem;
  padding: 0rem .2rem;
  &--right {
    // right: 0;
    justify-content: center;
  }
}
.rack-label {
  white-space: nowrap;
  margin-right: 1rem;
  font-family: "Dyslexic";
  font-size: 1.2rem;
  color: aliceblue;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
}
.knob-grid-wrapper {
  position: relative;
  width: 10rem;
  height: 2.4rem;
  min-height: 100%;
  margin-left: .4rem;
  display: flex;
  align-items: center;
}
.knob-grid {
  position: absolute;
  transform: translateY(25%);
  z-index: $z-index-2;
}
.one-knob {
  cursor: pointer;
  margin-right: .3rem;
  margin-left: .3rem;
  top: 0;
  width: 3rem;
  // display: flex;
  z-index: $z-index-2;
}
.setting-name {
  text-transform: uppercase;
  font-weight: bold;
  color: aliceblue;
  position: absolute;
  width: 100%;
  top: -180%;
  z-index: -1;
  font-size: .6rem;
  font-family: "FontPbio";
}
</style>
