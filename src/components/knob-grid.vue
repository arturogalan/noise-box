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

<script>
import vueKnobNb from './vue-knob-nb.vue';
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

<style>
.knob-grid {
    position: absolute;
    z-index: 150;
    display: flex;
    margin: 40px 0 0 15px;
}
.one-knob {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  width: 50px;
  cursor: pointer;
}
</style>
