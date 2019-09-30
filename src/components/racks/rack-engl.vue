<script>
import dropdown from '../common/dropdown';
import {mapGetters, mapActions} from 'vuex';
// import {AMP_COMPONENT_NAME} from '../../store/constants';

export default {
  name: 'rack-engl',
  components: {
    dropdown,
  },
  computed: {
    ...mapGetters('pedal', [
      'ampDistortionsLists',
      'ampCabinetList',
    ]),
  },

  methods: {
    ...mapActions('pedal', [
      'setComponentDistoType',
      'setAmpCabinetType',
    ]),
    setDistortionType(distoList, selectedDisto) {
      this.setComponentDistoType({name: distoList.componentName, value: selectedDisto.name});
    },
    setCabinetType(selectedCabinet) {
      this.setAmpCabinetType({value: selectedCabinet.name});
    },
  },
};
</script>
<template>
  <div class="rack-wrapper">
    <dropdown
      v-for="distoList of ampDistortionsLists"
      :key="distoList.componentName"
      :list="distoList.list"
      :name="distoList.componentName"
      @selected="setDistortionType(distoList, $event)"/>

    <dropdown
      :list="ampCabinetList"
      name="cabinetType"
      @selected="setCabinetType"/>
    />
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
