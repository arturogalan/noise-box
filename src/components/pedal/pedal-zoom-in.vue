<script>
import {mapGetters} from 'vuex';
import knobGrid from './knob-grid.vue';

export default {
  name: 'PedalZoomIn',
  components: {
    knobGrid,
  },
  computed: {
    ...mapGetters('pedal', [
      'zoomInPedal',
    ]),
  },
};
</script>
<template>
  <knob-grid :settings-list="zoomInPedal.settingsList"/>
</template>

<style lang="sass" scoped>

</style>
