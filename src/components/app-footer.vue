<script>
import {mapGetters, mapActions} from 'vuex';
import vueSliderNb from './common/vue-slider-nb';
// const input = require('../assets/icons/input.svg');
// const output = require('../assets/icons/output.svg');

export default {
  components: {
    vueSliderNb,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('pedal', [
      'amp',
      'defaultInputDevice',
      'defaultOutputDevice',
    ]),
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapActions('pedal', [
      'setAmpComponentEffectProperty',
    ]),
  },
};
</script>

<!-- amp.multiEffectAmp.getInputComponent().settingList[0].value -->
<template>
  <div>
    <div
      v-if="defaultInputDevice || defaultInputDevice"
      class="footer">
      <div class="footer-section">
        <img
          class="footer-label icon-type"
          src="../assets/icons/input.svg">
        <div class="footer-label footer-title--input">
          <span class="footer-title">Input: </span>
          {{ defaultInputDevice }}
        </div>
        <div class="footer-label">
          <vue-slider-nb
            :value="10"
            :value-color="'rgb(146, 215, 146)'"
            class="footer-slider"/>
        </div>
      </div>
      <div class="footer-section">
        <img
          class="footer-label icon-type"
          src="../assets/icons/output.svg">
        <div class="footer-label footer-title--output">
          <span class="footer-title">Output: </span>
          {{ defaultOutputDevice }}
        </div>
        <div class="footer-label">
          <vue-slider-nb
            :value="10"
            :value-color="'rgb(206, 71, 73)'"
            class="footer-slider"/>
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
  width: 100%;
  height: 3em;
  background-color: black;
  color: white;
  text-align: center;
  display: grid;
  justify-content: center;
  grid-template-columns: 50% 50%;/*Make the grid smaller than the container*/
  grid-gap: 5px;
}
.footer-label {
  white-space: nowrap;
  margin-left: .2rem;
  font-family: "Conthrax";
  font-size: .7rem;
}
.footer-title {
  font-weight: bold;
  font-size: .9rem;
  &--input {
    color: rgb(146, 215, 146);
  }
  &--output {
    color: rgb(206, 71, 73);
  }
}
.footer-section {
  max-width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-slider {
  margin-left: 1rem;
}
// img {
//   vertical-align: middle;
//   display: table-cell;
//   margin-right: 1rem;
// }
// span {
//   vertical-align: middle;
//   display: table-cell;
// }

.icon-type{
    max-width: 2rem;
}
</style>
