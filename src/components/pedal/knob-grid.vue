<script>
import vueKnobNb from '../common/vue-knob-nb.vue';
export default {
  components: {
    vueKnobNb,
  },
  props: {
    settingsList: {type: Array, required: true, default: ()=> []},
  },
  data() {
    return {
      myVal: 50,
    };
  },
  methods: {},
};
</script>
<template>
  <div class="knob-grid" >
    <vue-knob-nb
      v-for="(setting, index) in settingsList"
      :key="index"
      :name="setting.name"
      :barcolor="setting.color"
      :init-value="setting.value"
      class="one-knob"
      fillcolor="none"
      bgcolor="none"
    />
  </div>
</template>
<style lang="scss">
.knob-grid {
    position: absolute;
    z-index: $z-index-pedal;
    display: flex;
    justify-content: space-around;
    margin: 40px 0px 40px 10px;
    width: 90%;
}
.one-knob {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  width: 36px;
  cursor: pointer;
  margin-right: .3rem;
}
</style>
