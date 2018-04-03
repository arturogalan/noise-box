<template>
    <div class="knob-grid">
        <div class="one-knob">
            <vue-knob v-model="myVal" color="red"/>
        </div>
        <div class="one-knob">
            <vue-knob v-model="myVal" color="blue"/>
        </div>
        <div class="one-knob">
            <vue-knob v-model="myVal" color="yellow"/>
        </div>
    </div>
</template>

<script>
import VueKnob from "vue-knob";
export default {
  props: ["attributesList"],
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
