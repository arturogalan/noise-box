<template>
<div>
  <p>Custom range slider:</p>
<div class="slide-container">
  <input type="range" min="1" max="100" v-model="spanValue" class="slider" id="myRange">
  <input type="range" min="1" max="100" value="50" class="thin-slider" id="myRange2">
  <!-- <input type="range" min="1" max="100" value="50" class="slider" orient="vertical" id="myRange">
  <input type="range" min="1" max="100" value="50" class="slider" orient="vertical" id="myRange">
  <input type="range" min="1" max="100" value="50" class="slider" orient="vertical" id="myRange"> -->

</div>
<div class="slider-value-container"> 
<transition name="bounce">
  <div :key="spanValue" v-show="isVisible">
    <span class="slide-value-text" >{{spanValue}}</span>
  </div>
</transition>
<transition name="bounce">
  <div :key="spanValue" v-show="isVisible">
    <span class="slide-value-text" >{{spanValue}}</span>
  </div>
</transition>
</div>
<br>
</div>

</template>
<script>
export default {
  name:'vue-slider-nb',
  props: [],
  data() {
    return {
      spanValue: 0,
      isVisible: true
    };
  },
  methods: {
    addValue() {
      this.spanValue += 1;
    },
    changeVisible() {
      this.isVisible = !this.isVisible;
    }
  },
  components: {
  }
}
</script>

<style <style lang="scss" scoped>


$slide-width: 300px;
$slide-height: 12.6px;

.slide-container {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-left: 15%;
}
.slider-value-container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  margin-top: $slide-width - $slide-height;
  margin-left: $slide-height / 2;
}
.slide-value-text {
  background-color: #cadfe6;
  border-radius: 25%;
  max-width: 20px;
}
input[type=range] {
  -webkit-appearance: none;
  width: $slide-width;
  margin: 13.2px 0;
  transform: translateY($slide-width) rotate(-90deg);
  transform-origin: 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 12.6px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #928483;
  border-radius: 6.2px;
  border: 0.7px solid #562425;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
  border: 2.2px solid #000000;
  height: 39px;
  width: 19px;
  border-radius: 2px;
  background: #cff517;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -13.9px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #9e9191;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 12.6px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #928483;
  border-radius: 6.2px;
  border: 0.7px solid #562425;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
  border: 2.2px solid #000000;
  height: 39px;
  width: 19px;
  border-radius: 2px;
  background: #cff517;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 12.6px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #867776;
  border: 0.7px solid #562425;
  border-radius: 12.4px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #928483;
  border: 0.7px solid #562425;
  border-radius: 12.4px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
  border: 2.2px solid #000000;
  height: 39px;
  width: 19px;
  border-radius: 2px;
  background: #cff517;
  cursor: pointer;
  height: 12.6px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #928483;
}
input[type=range]:focus::-ms-fill-upper {
  background: #9e9191;
}





@keyframes pulse_animation {
    0% { transform: scale(1); }
    20% { transform: scale(1.2); }
    30% { transform: scale(1.7); }
    40% { transform: scale(2); }
    50% { transform: scale(2.4); }
    60% { transform: scale(2); }
    70% { transform: scale(1.7); }
    80% { transform: scale(1.2); }
    100% { transform: scale(1); }
}


.pulse {
    animation-name: pulse_animation;
    animation-duration: 5000ms;
    transform-origin:70% 70%;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}


.bounce-enter-active {
  animation: pulse_animation .5s;
}
.bounce-leave-active {
  animation: pulse_animation .5s reverse;
}



$transition-duration: .5s;

// Fade in delay out
.fade-delayed-enter-active, .fade-delayed-leave-active {
  transition-duration: $transition-duration;
  transition-property: font-size;
}

.fade-delayed-enter-active {
  transition-delay: $transition-duration;
}
.fade-delayed-enter, .fade-delayed-leave-to {
  font-size: 100px;
}
// .fade-delayed-leave-to {
//   width: 50%;
// }

</style>
