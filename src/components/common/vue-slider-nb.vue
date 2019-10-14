<script>
export default {
  name: 'vue-slider-nb',
  components: {},
  props: {
    value: {type: Number, required: true, default: ()=> 0},
    positionVertical: {type: Boolean, required: false, default: false},
  },
  data() {
    return {
      isVisible: true,
      inputValue: this.value,
    };
  },
  computed: {
    valueLeftMargin() {
      return (this.inputValue * 11.5)/100;
    },
  },
  watch: {
    inputValue(newValue) {
      this.$emit('change', newValue);
    },
  },
  methods: {
    trackValue() {
      console.log(this.$refs.slider);
    },
  },
};
</script>
<template>
  <div class="slider-container">
    <div
      :style="{left: `${valueLeftMargin}em`}"
      :class="[inputValue < 10 ? 'range-value-one-digit' : 'range-value-two-digits']"
      class="range-value"
    >
      {{ inputValue }}
    </div>
    <input
      ref="slider"
      v-model="inputValue"
      type="range"
      min="0"
      max="99"
      value="85"
      class="range"
      @click="trackValue">
  </div>
</template>
<style lang="scss" scoped>
.slider-container {
  position: relative;
  display: flex;
}
.range {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  width: 20em;
  height: 0.4em;
  border-radius: 0.3em;
  border: 2px inset grey;
}
.range-value {
  position: absolute;
  top: 0;
  transform: translateY(calc(-50% + 0.3em));
  pointer-events: none;
  font-family: "FontPbio";
  font-size: 1rem;;
}
.range-value-one-digit {
  margin-left: .9em;
}
.range-value-two-digits {
  margin-left: .6em;
}
@mixin thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 2.3rem;
  height: 2.3rem;
  background: #2c3e50;
  // border: 0.2em groove #ffffff;
  border: 2px inset white;
  border-radius: 1.5em;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
@include thumb;
}
.range::-moz-range-thumb {
@include thumb;
}
.range::-ms-thumb {
@include thumb;
}
</style>
