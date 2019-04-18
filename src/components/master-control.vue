<template>
  <div class="centered-parent">
    <span class="slider-title">Volume</span>
    <div class="centered-child">
      <vue-slider-nb/>
    </div>
    <span class="slider-title">Input</span>
  </div>

</template>

<script>
import vueSliderNb from './vue-slider-nb.vue';
export default {
  name: 'MasterControl',
  components: {
    vueSliderNb,
  },
  data() {
    return {

    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slider-title {
  font-family: "FontPbio";
  font-size: 16px;
  margin: 0.5em 0 0 0;
  display: inline-block;
}
.centered-parent{
  text-align: center;
}
.centered-child{
  display: inline-block;
}
// unused: This is if we want to put more than one slider in the right side
.slide-container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  margin-left: 15%;
}
.slider-value-container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
</style>
