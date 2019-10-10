<script>
export default {
  props: {
    initValue: {
      type: Number,
      required: true,
      validator: (initValue)=> {
        return initValue > 0 && initValue <= 100;
      },
    },
    maxValue: {
      type: Number,
      required: false,
      default: 100,
    },
    fillcolor: {
      type: String,
      required: false,
      default: 'red',
      // '#17d'
    },
    barcolor: {
      type: String,
      required: false,
      default: 'black',
      // '#17d'
    },
    bgcolor: {
      type: String,
      required: false,
      default: '#d2d3d4',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: ()=> 'normal',
    },
    knobsNumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      radius: 13,
      strokeWidth: 3,
      svgRotate: 90,
      currentValue: this.initValue,
      isShowing: false,
      selectorValue: 0,
      isVisible: true,
    };
  },
  computed: {
    circumference() {
      //94.2 = 2 * PI * RADIOUS (r="15")
      return this.radius * 2 * Math.PI;
    },
    strokeDasharray() {
      let value = (this.circumference / this.maxValue) * this.currentValue;
      return value + ' ' + (this.circumference - value);
    },
    labelStyle() {
      //TO-DO: if decimal adjust transformY
      let transformY;
      let currentValueDigits = this.numDigits(this.currentValue);
      if (currentValueDigits >= 3) {
        transformY = 0.75;
      } else if (currentValueDigits === 2) {
        transformY = 0.5;
      } else {
        transformY = 0.25;
      }
      return {
        'transform': `translateX(-${transformY}em) translateY(0.4em)`,
        'font-size': '0.9em',
        'fill': 'white',
      };
    },
    svgStyle() {
      return {
        transform: `rotate(-${this.svgRotate}deg)`,
      };
    },
    svgAbove() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transition: 'all 1s ease',
        transform: `rotate(${this.selectorValue - this.svgRotate - 2}deg)`,
      };
    },
  },
  mounted() {
    const initialDegress = (this.currentValue / this.maxValue) * 360;
    setTimeout(()=> this.selectorValue = initialDegress, 250);
  },
  methods: {
    computeValue(e) {
      // The percentaje where user clicks
      const rect = this.$refs.ring.getBoundingClientRect();
      const centerX = rect.width / 2 + rect.left;
      const centerY = rect.height / 2 + rect.top;
      const clickX = e.clientX;
      const clickY = e.clientY;
      let result = Math.atan2(centerY - clickY, centerX - clickX);

      // Calculation of current value
      let percentage = ((result + Math.PI) / (Math.PI + Math.PI)) * this.maxValue;
      // delta: the percentaje that represents the rotate: 90 degrees of rotate represents the 25% of the circumference
      let deltaPercentaje = (this.svgRotate / 360) * this.maxValue;
      let adjustPercentage = percentage + deltaPercentaje;
      // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
      adjustPercentage =
        adjustPercentage > this.maxValue
          ? adjustPercentage - this.maxValue
          : adjustPercentage;
      //TO-DO if decimal: this.currentValue = adjustPercentage; and round to 1 digit
      this.currentValue = Math.ceil(adjustPercentage);

      // Calculation of inner selector position
      let deltaDegrees = (this.svgRotate / 360) * 360;
      let degress = ((result + Math.PI) / (Math.PI + Math.PI)) * 360;
      let adjustDegrees = degress + deltaDegrees;
      adjustDegrees = adjustDegrees > 360 ? adjustDegrees - 360 : adjustDegrees;
      this.selectorValue = adjustDegrees;
      this.$emit('valueChanged', this.currentValue);
      // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
    },
    numDigits(x) {
      return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
    },
  },
  template: '#vue-knob-nb',
};
</script>
<template>
  <div class="container">
    <svg
      id="rotationSVG"
      :style="svgAbove"
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      preserveAspectRatio
      @click="computeValue"
    >
      <circle
        :r="radius-5"
        class="stroke-hole"
        cx="16"
        cy="16"/>
      <circle
        class="stroke-mark"
        cx="16"
        cy="16"
        r="5"/>
    </svg>
    <svg
      :style="svgStyle"
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      preserveAspectRatio
      @click="computeValue">
      <circle
        ref="ring"
        :r="radius+30"
        :stroke="bgcolor"
        :stroke-width="strokeWidth"
        class="ring"
        cx="16"
        cy="16"
        fill="transparent"
        @click="computeValue"
      />
      <circle
        ref="segment"
        :r="radius"
        :stroke="barcolor"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDasharray"
        class="segment"
        cx="16"
        cy="16"
        fill="transparent"
        stroke-dashoffset="0"
        @click="computeValue"
      />
    </svg>
    <transition name="bounce-tiny">
      <div
        v-show="isVisible"
        :key="currentValue"
        class="value-label">
        <div
          v-if="isVisible"
          :style="{color: barcolor}"
          :class="'value-span--'+size"
          class="value-span">
          {{ currentValue }}
        </div>
      </div>
    </transition>
    <div
      :class="'setting-name--'+size"
      :style="{top: knobsNumber > 3 ? '-20%' : '-8%'}"
      class="setting-name">
      <span>{{ name }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.value-label{
  position: absolute;
  top: 90%;
  height: 50%;
  left: 25%;
  width: 50%;
  display: flex;
  justify-content: center;
  // align-items: center;
}
.value-span{
  font-weight: bold;
  // color: yellow;
  &--normal {
    font-size: .9rem;
  }
  &--zoom-in {
    font-size: 2.7rem;;
  }
}
.container {
  position: relative;
}
.stroke-hole {
  fill: darkgray;
  stroke: darkgrey;
  stroke-width: 5;
  stroke-dasharray: 2, 3;
}
.stroke-mark {
  fill: none;
  stroke: black;
  stroke-width: 7;
  stroke-dasharray: 1, 90;
}

.setting-name {
  text-transform: uppercase;
  font-weight: bold;
  color: aliceblue;
  position: absolute;
  width: 100%;
  // top: -15%;
  z-index: -1;
  &--normal {
    font-size: .45rem;
  }
  &--zoom-in {
    font-size: 1.2rem;
  }
}
/* .svg-above{
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  animation: spin 1s linear 0s 1 normal both;
} */
/* .spin-animation{
  animation: spin 1s linear 0s 1 normal both;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
} */
/* @keyframes spin {
  0% { transform: rotate(0deg); }
  100% {
    transform: rotate(90deg);
    display: inline-block;
  }
} */
</style>
