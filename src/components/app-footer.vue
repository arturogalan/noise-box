<script>
import { mapGetters, mapActions } from 'vuex'
import slider from './common/slider'
import audioMaps from './../helpers/audioMaps'

// const input = require('../assets/icons/input.svg');
// const output = require('../assets/icons/output.svg');

export default {
  components: {
    slider,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('pedal', [
      'amp',
      'defaultInputDevice',
      'defaultOutputDevice',
      'getAmpInputGain',
      'getAmpOutputGain',
      'audioContextProps',
    ]),
  },
  watch: {
    defaultInputDevice (newValue, oldValue) {
      // If is not the first time and the input is different we must resetAmp
      if (oldValue && newValue !== oldValue) {
        this.$trace('input changed reset amp')
        this.resetAmp()
      }
    },
    defaultOutputDevice (newValue, oldValue) {
      // If is not the first time and the input is different we must resetAmp
      if (oldValue && newValue !== oldValue) {
        this.$trace('output changed reset amp')
        this.resetAmp()
      }
    },
  },
  created () {
  },
  mounted () {
    // console.log(this.amp.multiEffectAmp.getInputGainComponent());
  },
  methods: {
    ...mapActions('pedal', [
      'setAmpInputGain',
      'setAmpOutputGain',
      'resetAmp',
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
  <div>
    <div
      v-if="defaultInputDevice || defaultOutputDevice"
      class="footer"
    >
      <div class="footer-section footer-section--left">
        <div class="footer-label footer-title--input">
          <span class="footer-title">
            {{ $t('AMP.CONTEXT.INPUT') }}
          </span>
          {{ defaultInputDevice }}
        </div>
        <img
          class="footer-label icon-type"
          src="../assets/icons/input.svg"
        >
        <div class="footer-label">
          <slider
            :value="normalize(getAmpInputGain)"
            :value-color="'rgb(146, 215, 146)'"
            :value-fill-color="'hsl(100,16%,30%)'"
            @change="setAmpInputGain(denormalize($event))"
          />
        </div>
      </div>
      <div class="footer-section footer-section--middle">
        <div
          v-tooltip="{text: $t('TOOLTIP.AMP.CONTEXT.LATENCY')}"
          class="footer-label footer-latency"
        >
          ☻
          {{ $t('AMP.CONTEXT.LATENCY') }}:
          {{ $n(audioContextProps.baseLatency, 'decimal') }}
        </div>
      </div>
      <div class="footer-section footer-section--right">
        <div class="footer-label footer-title--output">
          <span class="footer-title">
            {{ $t('AMP.CONTEXT.OUTPUT') }}
          </span>
          {{ defaultOutputDevice }}
        </div>
        <img
          class="footer-label icon-type"
          src="../assets/icons/output.svg"
        >
        <div class="footer-label">
          <slider
            size="big"
            :value="normalize(getAmpOutputGain)"
            :value-color="'rgb(206, 71, 73)'"
            :value-fill-color="'hsl(359,37%,34%)'"
            class="footer-slider"
            @change="setAmpOutputGain(denormalize($event))"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  z-index: $z-index-10; /* Sit on top */
  padding: 0 2rem 0 2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: calc(100% - 70px);
  height: 3em;
  background-color: black;
  color: white;
  text-align: center;
  display: grid;
  justify-content: center;
  grid-template-columns: 40% 20% 40%;/*Make the grid smaller than the container*/
  grid-gap: 5px;
  border: 3px solid rgb(21,18,17);
}
.footer-label {
  white-space: nowrap;
  margin-left: .2rem;
  font-family: "Conthrax";
  font-size: .9rem;
  display: flex;
  flex-flow: column;
}
.footer-latency {
  cursor: pointer;
}
.footer-title {
  font-weight: bold;
  font-size: 1.1rem;
  &--input {
    color: rgb(146, 215, 146);
  }
  &--output {
    color: rgb(206, 71, 73);
  }
}
.footer-section {
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &--left {
    justify-content: flex-start;
  }
  &--middle {
    justify-content: center;
  }
  &--right {
    right: 0;
    justify-content: flex-end;
  }
}
.icon-type{
    max-width: 2.5rem;
}
</style>
