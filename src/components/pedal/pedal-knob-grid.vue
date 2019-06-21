<script>
import vueKnobNb from '../common/vue-knob-nb.vue';
export default {
  components: {
    vueKnobNb,
  },
  props: {
    settingsList: {type: Array, required: true, default: ()=> []},
    size: {type: String, required: false, default: ()=> 'normal'},
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
      :class="'one-knob--'+size"
      :size="size"
      :knobs-number="settingsList.length"
      class="one-knob"
      fillcolor="none"
      bgcolor="none"
    />
  </div>
</template>
<style lang="scss">
.knob-grid {
    position: absolute;
    z-index: $z-index-3;
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.one-knob {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  cursor: pointer;
  margin-right: .3rem;
  // max size
  &--normal {
    width: 3rem;
  }
  &--zoom-in {
    width: 10rem;
  }
}
</style>
