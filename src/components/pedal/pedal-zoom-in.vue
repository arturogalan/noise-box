<script>
import {mapGetters, mapActions} from 'vuex';
import pedalKnobGrid from './pedal-knob-grid.vue';
import macButtons from '../common/mac-buttons.vue';

export default {
  name: 'PedalZoomIn',
  components: {
    pedalKnobGrid,
    macButtons,
  },
  computed: {
    ...mapGetters('pedal', [
      'zoomInPedal',
    ]),
  },
  methods: {
    ...mapActions('pedal', [
      'setPedalProperty',
    ]),
    zoomPedalOut(pedal) {
      this.setPedalProperty({type: this.zoomInPedal.type, property: 'zoomIn', value: false});
    },
  },
};
</script>
<template>
  <div
    :style="{ borderColor: zoomInPedal.bgcolor }"
    class="knob-container">
    <div
      :style="{ color: zoomInPedal.fcolor, backgroundColor: zoomInPedal.bgcolor}"
      class="pedal-name">
      <mac-buttons
        :button-literals="{
          close: 'TOOLTIP.PEDAL.CLOSE',
        }"
        :maximized="true"
        class="buttons-absolute"
        @close="zoomPedalOut"
        @maximize="$emit('maximize')"/>
      {{ zoomInPedal.name }}
    </div>
    <pedal-knob-grid
      :settings-list="zoomInPedal.settingsList"
      class="knob-grid-container"
      size="zoom-in"/>
  </div>
</template>

<style lang="scss" scoped>
  .knob-container {
    position: relative;
    width: 40%;
    height: 90%;
    left: 30%;
    background-color: $knob-grid-background;
    border: .5rem solid;
    border-radius: 2%;
  }
  .knob-grid-container{
    margin-top: 5%;
  }
  .pedal-name {
    font-family: "Conthrax";
    font-size: 2.2rem;;
    top: 100%;
    text-transform: capitalize;
    opacity: .8;
    margin-bottom: .4rem;
  }
  .buttons-absolute{
    position: absolute;
    top: .2rem;
  }
</style>
