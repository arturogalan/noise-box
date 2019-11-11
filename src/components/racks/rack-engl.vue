<script>
import dropdown from '../common/dropdown';
import vueKnobNb from '../common/vue-knob-nb.vue';
import audioMaps from '../../helpers/audioMaps';
import { mapGetters, mapActions } from 'vuex';
// import {AMP_COMPONENT_NAME} from '../../store/constants';

export default {
  name: 'rack-engl',
  components: {
    dropdown,
    vueKnobNb,
  },
  computed: {
    ...mapGetters('pedal', [
      'ampDistortionsLists',
      'ampDistortionPresets',
      'ampCabinetList',
      'ampCabinetSettings',
      'ampCabinetWet',
      'ampPresetList',
    ]),
  },

  methods: {
    ...mapActions('pedal', [
      'setComponentDistoType',
      'setAmpCabinetType',
      'setAmpCabinetWet',
      'setAmpCabinetSettings',
      'setPreset',
    ]),
    setDistortionType(selectedPreset) {
      this.setComponentDistoType({ name: 'distortionStage1', value: selectedPreset.distortionStage1 });
      this.setComponentDistoType({ name: 'distortionStage2', value: selectedPreset.distortionStage2 });
    },
    setCabinetType(selectedCabinet) {
      this.setAmpCabinetType({ value: selectedCabinet.name });
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
  <div class="rack-wrapper">
    <div class="rack-section">
      <div class="rack-box">
        <div class="rack-label">
          DISTORTION
        </div>
        <dropdown
          :list="ampDistortionPresets"
          name="distoType"
          @selected="setDistortionType"
        />
        <!-- :name="distoList.componentName" -->
      </div>
    </div>
    <div class="rack-section">
      <div class="rack-box">
        <div class="rack-label">
          CABINET
        </div>
        <dropdown
          :list="ampCabinetList"
          name="cabinetType"
          @selected="setCabinetType"
        />
        <div class="knob-grid-wrapper">
          <section class="knob-grid">
            <vue-knob-nb
              v-for="setting in ampCabinetSettings"
              :key="setting.name"
              :init-value="normalize(setting.value)"
              :name="setting.name"
              :knobs-number="ampCabinetSettings.length"
              barcolor="aliceblue"
              size="rack"
              class="one-knob"
              fillcolor="none"
              bgcolor="none"
              @valueChanged="setAmpCabinetSettings({property: setting.name, value: denormalize($event)})"
            />
          </section>
        </div>
      </div>
    </div>
    <div class="rack-section rack-section--right">
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
.rack-wrapper {
  width: 100%;
  height: 6rem;
  background-color: rgb(70,70,70);
  box-shadow: inset 0px 1px 10px 0px rgb(0, 0, 0);
  min-width: $app-min-width + 12px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
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
    right: 0;
    justify-content: flex-end;
  }
}
.rack-label {
  white-space: nowrap;
  margin-right: 1rem;
  font-family: "Dyslexic";
  font-size: 1.2rem;
  color: aliceblue;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.8);
}
.knob-grid-wrapper {
  position: relative;
  width: 6rem;
  height: 2.4rem;
  min-height: 100%;
  margin-left: .4rem;
}
.knob-grid {
  position: absolute;
  transform: translateY(-15%);
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
</style>
