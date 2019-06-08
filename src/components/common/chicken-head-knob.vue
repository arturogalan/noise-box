<script>
export default {
  name: 'ChickenHeadKnob',
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
      default: 'grey',
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
      radius: 10,
      strokeWidth: 5,
      svgRotate: 90,
      currentValue: this.initValue,
      isShowing: false,
      selectorValue: 0,
      isVisible: true,
      chickenImg: '../../assets/img/chicken-head.svg',
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
        transition: 'all 1s ease',
        transform: `rotate(${this.selectorValue}deg)`,
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
      const rect = this.$refs.chicken.getBoundingClientRect();
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
      // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
    },
    numDigits(x) {
      return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
    },
  },
};
</script>
<template>
  <div class="container">
    <div
      class="pointer-wrapper"
      @click="computeValue"/>
    <div
      ref="chicken"
      :style="svgAbove"
      class="chicken-head"
    >

      <svg
        view-box="0 0 100% 100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
        <!-- Created with SVG-edit - https://github.com/SVG-Edit/svgedit-->
        <defs>
          <linearGradient
            id="svg_10"
            y2="0"
            y1="0.31357"
            x2="1"
            x1="0.6011">
            <stop
              stop-color="#000000"
              offset="0"/>
            <stop
              stop-color="#ffffff"
              offset="1"/>
          </linearGradient>
          <linearGradient
            id="svg_5"
            y2="0.71591"
            y1="0"
            x2="0.61672"
            x1="0"
            spreadMethod="pad">
            <stop
              stop-color="#000000"
              offset="0.06985"/>
            <stop
              stop-opacity="0.99219"
              stop-color="#0f0f0f"
              offset="0.54641"/>
            <stop
              stop-opacity="0.99219"
              stop-color="#544f4f"
              offset="0.80032"/>
            <stop
              stop-opacity="0.99219"
              stop-color="#ffffff"
              offset="0.98782"/>
          </linearGradient>
        </defs>
        <g class="layer">
          <title>Layer 1</title>
          <g
            id="svg_3"
            stroke="null">
            <circle
              id="svg_2"
              stroke="black"
              stroke-width="0"
              stroke-linejoin="null"
              stroke-linecap="null"
              stroke-dasharray="null"
              r="36.43024"
              fill="url(#svg_5)"
              cy="61.05812"
              cx="36.5"/>
            <path
              id="svg_1"
              stroke="black"
              stroke-width="3"
              fill="url(#svg_10)"
              d="m15.59388,118.1853c6.9687,0.81032 13.45122,1.62063 20.90612,2.43094l20.90612,-2.43094l0,-59.58399q0,-29.792 -20.90612,
              -57.10132q-20.90612,29.79199 -20.90612,57.10132l0,59.58399z"
              xmlns="http://www.w3.org/2000/svg"/>
            <path
              id="svg_4"
              stroke="black"
              stroke-width="0"
              fill="#ffffff"
              d="m29.75413,15.26842l13.49175,0l-3.16023,-5.74631l-3.76796,-5.74631l-3.58565,5.74631l-2.97791,5.74631z"
              xmlns="http://www.w3.org/2000/svg"/>
          </g>
        </g>
      </svg>
    </div>


    <svg
      class="ring-mesaure"
      preserveAspectRatio
    >
      <circle
        r="40%"
        cx="50%"
        cy="50%"
        class="stroke-hole"/>
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
      class="setting-name"
    >
      <span>{{ name }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ring-mesaure {
  position: absolute;
  width: 100%;
  height: 100%;
}
.chicken-head{
  width: 4rem;
  z-index: $z-index-tooltip;
}
.setting-name {
  text-transform: uppercase;
  font-weight: bold;
  color: aliceblue;
  position: absolute;
  width: 100%;
  top: -20%;
  z-index: -1;
  font-size: .8rem;
}
.value-label{
  z-index: $z-index-pedal;
  position: absolute;
  top: 35%;
  font-size: 1.5rem;
}
.value-span{
  font-weight: bold;
  // color: yellow;
  &--normal {
    font-size: 1.3rem;
  }
  &--zoom-in {
    font-size: 2.7rem;;
  }
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  align-items: center;
  margin-top: 1.5rem;
}
.stroke-hole {
  fill: transparent;
  stroke: white;
  stroke-width: 5;
  stroke-dasharray: 2, 33;
}

.pointer-wrapper {
  width: 200%;
  height: 200%;
  position: absolute;
  z-index: $z-index-pedal;
}
</style>
