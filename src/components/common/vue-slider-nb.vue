<script>
const debounce = (func, delay)=> {
  let debounceTimer;
  return function() {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=> func.apply(context, args), delay);
  };
};

export default {
  name: 'vue-slider-nb',
  components: {},
  props: {
    value: { type: Number, required: true, default: ()=> 0 },
    positionVertical: { type: Boolean, required: false, default: false },
    valueColor: { type: String, required: false, default: '' },
    valueFillColor: { type: String, required: false, default: '' },
    size:  { type: String, required: false, default: 'big' },
  },
  data() {
    return {
      isVisible: true,
      inputValue: this.value,
      valueKey: '',
    };
  },
  computed: {
    valueLeftMargin() {
      return {
        'medium': ()=> (this.inputValue * 5.8) / 100,
        'big': ()=> (this.inputValue * 14) / 100,
      }[this.size]()
      // return (this.inputValue * 14) / 100;
    },
    fillColorLeftMargin() {
      return 102 - this.inputValue;
    },
  },
  watch: {
    inputValue(newValue) {
      this.emitChangeDebounced(newValue);
    },
  },
  methods: {
    trackValue() {
      // Change the value key to trigger animation
      this.valueKey = 'bounce-tiny';
      this.$nextTick(()=> (this.valueKey = ''));
    },
    emitChangeDebounced: debounce(function(newValue) {
      this.$emit('change', newValue);
    }, 250),
  },
};
</script>
<template>
  <div class="slider-container">
    <div
      class="range-background"
    />
    <div
      :style="{right: `${fillColorLeftMargin}%`, backgroundColor: valueFillColor}"
      class="range-value-background"
    />
    <transition name="bounce-tiny">
      <div
        :key="valueKey"
        :style="{left: `${valueLeftMargin}rem`, color: valueColor}"
        :class="[inputValue < 10 ? 'range-value-one-digit' : 'range-value-two-digits']"
        class="range-value"
      >
        {{ inputValue }}
      </div>
    </transition>
    <input
      ref="slider"
      v-model="inputValue"
      type="range"
      min="1"
      max="99"
      value="85"
      class="range"
      :class="`range--${size}`"
      @click="trackValue"
    >
    <div class="sliderticks">
      <template v-for="index in 5">
        <p
          :key="`${index}-1`"
          class="tick tick--big"
        />
        <p
          :key="`${index}-2`"
          class="tick tick--small"
        />
        <p
          :key="`${index}-3`"
          class="tick tick--small"
        />
        <p
          :key="`${index}-4`"
          class="tick tick--small"
        />
        <p
          :key="`${index}-5`"
          class="tick tick--small"
        />
      </template>
      <p
        class="tick tick--big"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slider-container {
  position: relative;
  display: flex;
  float: left;
}
.sliderticks {
  z-index: $z-index-0;
  pointer-events: none;
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: calc(100% + 2px);
}

.tick {
  position: relative;
  display: flex;
  width: 1px;
  background: #D3D3D3;
 &--small {
  height: 1.2rem;
  top: -.1rem;
 }
 &--big {
   height: 30px;
   transform: translateY(calc(-25%));
 }
}
.range-background {
  z-index: $z-index-1;
  position: absolute;
  pointer-events: none;
  left: .2rem;
  right: 0;
  top: calc(50% - .25rem);
  height: .6rem;;
  border-radius: 0.3em;
  border: 1px inset #474747;
  background: rgba(21,18,17,1);
}

.range-value-background {
  z-index: $z-index-2;
  position: absolute;
  pointer-events: none;
  left: .2rem;
  right: 0;
  top: calc(50% - .1rem);
  height: .4rem;
  border-radius: .1rem;
}
.range {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  height: 0.8em;
  background-color: transparent;
  z-index: $z-index-3;
  &--big {
    width: 20em;
  }
  &--medium {
    width: 10em;
  }
}
.range-value {
  z-index: $z-index-4;
  position: absolute;
  height: 1.2rem;
  bottom: calc(50% - .6rem);
  pointer-events: none;
  font-family: "FontPbio";
  font-size: 1rem;;
}
.range-value-one-digit {
  margin-left: 1.5rem;
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


</style>
