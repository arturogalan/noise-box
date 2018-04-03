<template>
    <div class="knob-grid" >
        <vue-knob
            class="one-knob"
            v-for="(setting, index) in settingsList"
            :key="index"
            :name="setting.name"
            v-model="setting.initialValue"
            :color="setting.color"
        >
        </vue-knob>
    </div>
</template>

<script>
import VueKnob from "vue-knob";
export default {
  props: ["settingsList"],
  data() {
    return {
      myVal: 50
    };
  },
  methods: {},
  components: {
    VueKnob
  }
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 40px;
}
</style>
