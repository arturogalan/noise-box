<script>
import dropdown from '../common/dropdown';
import {mapGetters, mapActions} from 'vuex';
import {AMP_COMPONENT_NAME} from '../../store/constants';

export default {
  name: 'rack-engl',
  components: {
    dropdown,
  },
  computed: {
    ...mapGetters('pedal', [
      // 'ampDistortionType',
      'distortionTypes',
    ]),
  },

  methods: {
    ...mapActions('pedal', [
      'setAmpComponentEffectProperty',
    ]),
    setDistortionType(selectedDisto) {
      this.setAmpComponentEffectProperty({name: AMP_COMPONENT_NAME.DISTORTION, property: 'distortionType', value: selectedDisto.name});
    },
  },
};
</script>
<template>
  <div class="rack-wrapper">
    <dropdown
      :list="distortionTypes"
      @selected="setDistortionType"/>
  </div>
</template>
<style lang="scss" scoped>
.rack-wrapper {
  width: 100%;
  height: 4rem;
  background-color: rgb(70,70,70);
  box-shadow: inset 0px 1px 20px 0px rgb(0, 0, 0);
  min-width: $app-min-width + 12px;
  display: flex;
  align-items: center;
}
</style>
