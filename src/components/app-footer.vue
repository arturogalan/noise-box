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

<template>
  <div>
    <div
      v-if="defaultInputDevice || defaultInputDevice"
      class="footer">
      <div class="footer-section">
        <img
          class="footer-items icon-type"
          src="../assets/icons/input.svg">
        <div>
          Input:{{ defaultInputDevice.label }}
        </div>
        <div>
          <vue-slider-nb :value="10"/>
          <!-- amp.multiEffectAmp.getInputComponent().settingList[0].value -->
        </div>
      </div>
      <div class="footer-section">
        <div>
          <img
            src="../assets/icons/output.svg"
            class="icon-type">
        </div>
        <div>
          Output:{{ defaultOutputDevice.label }}
        </div>
        <div>
          <vue-slider-nb :value="10"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
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

// .footer-section {
//   display: grid;
//   justify-content: center;
//   grid-template-columns: 50% 50%;/*Make the grid smaller than the container*/
//   grid-gap: 5px;
// }


.footer-section {
  max-width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
