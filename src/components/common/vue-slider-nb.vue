<script>
export default {
  name: 'vue-slider-nb',
  components: {},
  props: {
    value: {type: Number, required: true, default: ()=> 0},
  },
  data() {
    return {
      isVisible: true,
      inputValue: this.value,
    };
  },
  watch: {
    inputValue(newValue) {
      this.$emit('change', newValue);
    },
  },
};
</script>
<template>
  <div class="slider-container">
    <div class="slider-wrapper">
      <div class="input-container">
        <input
          id="myRange"
          v-model="inputValue"
          type="range"
          min="0"
          max="100"
          class="slider">
      </div>
    </div>
    <transition name="bounce">
      <div
        v-show="isVisible"
        :key="inputValue"
        class="value-container">
        <span
          v-if="isVisible"
          :style="{ color: `hsl(0, 100%, ${inputValue/2}%)`}"
          class="value-text">{{ inputValue }}</span>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
$slide-width: calc(20rem);
$slide-height: 18px;
$slide-selector-border: 5px;
$slide-selector-height: 80px;
$slide-selector-width: 30px;
$span-font-size: 30px;
.slider-container {
  width: $slide-selector-height;
}
.slider-wrapper {
  margin-left: ($slide-selector-height - $slide-height)/2;
}
.input-container {
  // 4.4 = border * 2 ?
  margin-left: ($slide-height / 2) - 4;
}
.value-container {
  margin-top: $slide-width ;
  height: $slide-height;
  width: $slide-selector-height;
  font-size: $span-font-size;
  font-family: "FontPbio";
}

.value-text {
  background-color: #cadfe6;
  border-radius: 25%;
  max-width: 20px;
}
input[type="range"] {
  -webkit-appearance: none;
  width: $slide-width;
  transform: translateY($slide-width) rotate(-90deg);
  transform-origin: 0;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: $slide-height;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #928483;
  border-radius: 6.2px;
  border: 0.7px solid #562425;
}
// Chrome
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
  border: $slide-selector-border solid #000000;
  height: $slide-selector-height;
  width: $slide-selector-width;
  border-radius: 2px;
  background: #cff517;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -$slide-selector-height/2 + $slide-height/2;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #9e9191;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: $slide-height;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #928483;
  border-radius: 6.2px;
  border: 0.7px solid #562425;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
  border: $slide-selector-border solid #000000;
  height: $slide-selector-height;
  width: $slide-selector-width;
  border-radius: 2px;
  background: #cff517;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: $slide-height;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #867776;
  border: 0.7px solid #562425;
  border-radius: 12.4px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-fill-upper {
  background: #928483;
  border: 0.7px solid #562425;
  border-radius: 12.4px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-thumb {
  box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
  border: $slide-selector-border solid #000000;
  height: $slide-selector-height;
  width: $slide-selector-width;
  border-radius: 2px;
  background: #cff517;
  cursor: pointer;
  height: 12.6px;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #928483;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #9e9191;
}

$transition-duration: 0.5s;

// Fade in delay out
.fade-delayed-enter-active,
.fade-delayed-leave-active {
  transition-duration: $transition-duration;
  transition-property: font-size;
}

.fade-delayed-enter-active {
  transition-delay: $transition-duration;
}
.fade-delayed-enter,
.fade-delayed-leave-to {
  font-size: 100px;
}
// .fade-delayed-leave-to {
//   width: 50%;
// }
</style>
