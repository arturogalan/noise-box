<script>
export default {
  name: 'vue-slider-nb',
  components: {},
  props: {
    value: {type: Number, required: true, default: ()=> 0},
    positionVertical: {type: Boolean, required: false, default: false},
    valueColor: {type: String, required: false, default: ''},
  },
  data() {
    return {
      isVisible: true,
      inputValue: this.value,
    };
  },
  computed: {
    valueLeftMargin() {
      return (this.inputValue * 11)/100;
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
      :style="{left: `${valueLeftMargin}em`, color: valueColor}"
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
    <div class="sliderticks">
      <template v-for="index in 5">
        <p
          :key="`${index}-1`"
          class="tick tick--big"/>
        <p
          :key="`${index}-2`"
          class="tick"/>
        <p
          :key="`${index}-3`"
          class="tick"/>
        <p
          :key="`${index}-4`"
          class="tick"/>
        <p
          :key="`${index}-5`"
          class="tick"/>
      </template>
      <p
        class="tick tick--big"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slider-container {
  position: relative;
  display: flex;
}
.range {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  width: 20em;
  height: 0.8em;
  border-radius: 0.3em;
  border: 1px inset #474747;
  background: rgba(21,18,17,1);
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
  width: 3rem;
  height: 1.8rem;
  // background: #2c3e50;

background: rgba(61,58,61,1);
background: -moz-linear-gradient(left, rgba(61,58,61,1) 0%, rgba(0,0,0,1) 12%, rgba(71,71,71,1) 15%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 23%,
 rgba(71,71,71,1) 26%, rgba(0,0,0,1) 29%, rgba(0,0,0,1) 35%, rgba(71,71,71,1) 38%, rgba(44,44,44,1) 41%, rgba(71,71,71,1) 67%, rgba(71,71,71,1) 81%,
  rgba(43,43,43,1) 84%, rgba(0,0,0,1) 89%, rgba(71,71,71,1) 92%, rgba(0,0,0,1) 95%, rgba(19,19,19,1) 100%);
background: -webkit-gradient(left top, right top, color-stop(0%, rgba(61,58,61,1)), color-stop(12%, rgba(0,0,0,1)), color-stop(15%, rgba(71,71,71,1)),
color-stop(18%, rgba(0,0,0,1)), color-stop(23%,
 rgba(0,0,0,1)), color-stop(26%, rgba(71,71,71,1)), color-stop(29%, rgba(0,0,0,1)), color-stop(35%, rgba(0,0,0,1)), color-stop(38%, rgba(71,71,71,1)),
 color-stop(41%, rgba(44,44,44,1)), color-stop(67%, rgba(71,71,71,1)), color-stop(81%,
  rgba(71,71,71,1)), color-stop(84%, rgba(43,43,43,1)), color-stop(89%, rgba(0,0,0,1)), color-stop(92%, rgba(71,71,71,1)), color-stop(95%, rgba(0,0,0,1)),
  color-stop(100%, rgba(19,19,19,1)));
background: -webkit-linear-gradient(left, rgba(61,58,61,1) 0%, rgba(0,0,0,1) 12%, rgba(71,71,71,1) 15%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 23%,
 rgba(71,71,71,1) 26%, rgba(0,0,0,1) 29%, rgba(0,0,0,1) 35%, rgba(71,71,71,1) 38%, rgba(44,44,44,1) 41%, rgba(71,71,71,1) 67%, rgba(71,71,71,1) 81%,
  rgba(43,43,43,1) 84%, rgba(0,0,0,1) 89%, rgba(71,71,71,1) 92%, rgba(0,0,0,1) 95%, rgba(19,19,19,1) 100%);
background: -o-linear-gradient(left, rgba(61,58,61,1) 0%, rgba(0,0,0,1) 12%, rgba(71,71,71,1) 15%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 23%,
 rgba(71,71,71,1) 26%, rgba(0,0,0,1) 29%, rgba(0,0,0,1) 35%, rgba(71,71,71,1) 38%, rgba(44,44,44,1) 41%, rgba(71,71,71,1) 67%, rgba(71,71,71,1) 81%,
  rgba(43,43,43,1) 84%, rgba(0,0,0,1) 89%, rgba(71,71,71,1) 92%, rgba(0,0,0,1) 95%, rgba(19,19,19,1) 100%);
background: -ms-linear-gradient(left, rgba(61,58,61,1) 0%, rgba(0,0,0,1) 12%, rgba(71,71,71,1) 15%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 23%,
 rgba(71,71,71,1) 26%, rgba(0,0,0,1) 29%, rgba(0,0,0,1) 35%, rgba(71,71,71,1) 38%, rgba(44,44,44,1) 41%, rgba(71,71,71,1) 67%, rgba(71,71,71,1) 81%,
  rgba(43,43,43,1) 84%, rgba(0,0,0,1) 89%, rgba(71,71,71,1) 92%, rgba(0,0,0,1) 95%, rgba(19,19,19,1) 100%);
background: linear-gradient(to right, rgba(61,58,61,1) 0%, rgba(0,0,0,1) 12%, rgba(71,71,71,1) 15%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 23%,
 rgba(71,71,71,1) 26%, rgba(0,0,0,1) 29%, rgba(0,0,0,1) 35%, rgba(71,71,71,1) 38%, rgba(44,44,44,1) 41%, rgba(71,71,71,1) 67%, rgba(71,71,71,1) 81%,
  rgba(43,43,43,1) 84%, rgba(0,0,0,1) 89%, rgba(71,71,71,1) 92%, rgba(0,0,0,1) 95%, rgba(19,19,19,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3d3a3d', endColorstr='#131313', GradientType=1 );


  // border: 0.2em groove #ffffff;
  border: 1px solid #474747;
  border-radius: .8em;
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


.sliderticks {
  z-index: -1;
  pointer-events: none;
  position: absolute;
  // transform: translateY(calc(-50% + 0.4em));
  display: flex;
  justify-content: space-between;
  padding: 0 3px;
  width: calc(100% - 5px); //calc(100%-2px);
}

.tick {
  position: relative;
  display: flex;
  // justify-content: center;
  // text-align: center;
  width: 1px;
  background: #D3D3D3;
  height: 20px;
  line-height: 40px;
 // margin: 0 0 20% 0;
 &--big {
   height: 30px;
   transform: translateY(calc(-25%));
 }
}
</style>
