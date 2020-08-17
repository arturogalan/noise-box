<script>
import pedalKnob from '../../common/pedal-knob.vue'
import { mapActions } from 'vuex'
import audioMaps from '../../../helpers/audioMaps'

export default {
  components: {
    pedalKnob,
  },
  props: {
    pedal: { type: Object, required: true },
    size: { type: String, required: false, default: () => 'normal' },
  },
  data () {
    return {
      myVal: 50,
    }
  },
  methods: {
    ...mapActions('pedal', [
      'setPedalEffectProperty',
    ]),
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
  <div class="pedal-knob-grid">
    <pedal-knob
      v-for="(setting, index) in pedal.settingsList"
      :key="index"
      :name="setting.name"
      :barcolor="setting.color"
      :init-value="normalize(pedal.effect[setting.name])"
      :class="'pedal-one-knob--'+size"
      :size="size"
      :knobs-number="pedal.settingsList.length"
      class="pedal-one-knob"
      fillcolor="none"
      bgcolor="none"
      @valueChanged="setPedalEffectProperty({name: pedal.name, property: setting.name, value: denormalize($event)})"
    />
  </div>
</template>
<style lang="scss">
.pedal-knob-grid {
    position: absolute;
    z-index: $z-index-2;
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.pedal-one-knob {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  cursor: pointer;
  margin-right: .3rem;
  // max size
  &--normal {
    width: 3rem;
  }
  &--zoom-in {
    width: 10rem;
  }
  margin-left: .3rem;
  width: 3rem;
  // display: flex;
  z-index: $z-index-2;
}
</style>
