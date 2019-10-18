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
    <div class="rack-section">
      <div class="rack-box">
        <div class="rack-label">
          DISTORTION
        </div>
        <dropdown
          v-for="distoList of ampDistortionsLists"
          :key="distoList.componentName"
          :list="distoList.list"
          :name="distoList.componentName"
          @selected="setDistortionType(distoList, $event)"/>
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
          @selected="setCabinetType"/>
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
  grid-template-columns: 50% 50%;
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
</style>
