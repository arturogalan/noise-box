<script>
export default {
  props: {
    initValue: {
      type: Number,
      required: true,
      validator: (initValue) => {
        return initValue > 0 && initValue <= 100
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
      default: () => 'normal',
    },
    knobsNumber: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      radius: 13,
      strokeWidth: 3,
      svgRotate: 90,
      currentValue: this.initValue,
      isShowing: false,
      selectorValue: 0,
      isVisible: true,
    }
  },
  computed: {
    isSafari () {
      var ua = navigator.userAgent.toLowerCase()
      return ua.indexOf('chrome') === -1 && ua.indexOf('safari') !== -1
    },
    circumference () {
      // 94.2 = 2 * PI * RADIOUS (r="15")
      return this.radius * 2 * Math.PI
    },
    strokeDasharray () {
      const value = (this.circumference / this.maxValue) * this.currentValue
      return value + ' ' + (this.circumference - value)
    },
    labelStyle () {
      // TO-DO: if decimal adjust transformY
      let transformY
      const currentValueDigits = this.numDigits(this.currentValue)
      if (currentValueDigits >= 3) {
        transformY = 0.75
      } else if (currentValueDigits === 2) {
        transformY = 0.5
      } else {
        transformY = 0.25
      }
      return {
        transform: `translateX(-${transformY}em) translateY(0.4em)`,
        'font-size': '0.9em',
        fill: 'white',
      }
    },
    svgAbove () {
      return {
        position: 'absolute',
        transition: 'all 1s ease',
        transform: `rotate(${this.selectorValue}deg)`,
      }
    },
    svgStyle () {
      return {
        transform: `rotate(-${this.svgRotate}deg)`,
      }
    },
  },
  watch: {
    initValue (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentValue = newValue
        const initialDegress = (this.currentValue / this.maxValue) * 360
        // setTimeout(() => (this.selectorValue = initialDegress), 250)
        setTimeout(() => (this.selectorValue = initialDegress - (this.svgRotate)), 250)
      }
    },
  },
  mounted () {
    const initialDegress = (this.currentValue / this.maxValue) * 360
    // setTimeout(() => (this.selectorValue = initialDegress), 250)
    setTimeout(() => (this.selectorValue = initialDegress - (this.svgRotate)), 250)
  },
  methods: {
    computeValue (e) {
      // The percentaje where user clicks
      const rect = this.$refs.ring.getBoundingClientRect()
      const centerX = rect.width / 2 + rect.left
      const centerY = rect.height / 2 + rect.top
      const clickX = e.clientX
      const clickY = e.clientY
      const result = Math.atan2(centerY - clickY, centerX - clickX)

      // Calculation of current value
      const percentage = ((result + Math.PI) / (Math.PI + Math.PI)) * this.maxValue
      // delta: the percentaje that represents the rotate: 90 degrees of rotate represents the 25% of the circumference
      const deltaPercentaje = (this.svgRotate / 360) * this.maxValue
      let adjustPercentage = percentage + deltaPercentaje
      // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
      adjustPercentage =
        adjustPercentage > this.maxValue
          ? adjustPercentage - this.maxValue
          : adjustPercentage
      // TO-DO if decimal: this.currentValue = adjustPercentage; and round to 1 digit
      this.currentValue = Math.ceil(adjustPercentage)

      // Calculation of inner selector position
      // const deltaDegrees = (this.svgRotate / 360) * 360
      // const degress = ((result + Math.PI) / (Math.PI + Math.PI)) * 360
      // let adjustDegrees = degress + deltaDegrees
      // adjustDegrees = adjustDegrees > 360 ? adjustDegrees - 360 : adjustDegrees
      // this.selectorValue = adjustDegrees
      this.$emit('valueChanged', this.currentValue)
      // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
    },
    numDigits (x) {
      return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1
    },
  },
}
</script>
<template>
  <section class="container">
    <div
      :class="`pedal-setting-name--${size}${isSafari ? '-safari' : ''}`"
      class="pedal-setting-name"
    >
      <span>{{ name }}</span>
    </div>
    <div class="svg-container">
      <svg
        id="rotationSVG"
        :style="svgAbove"
        viewBox="0 0 32 32"
        preserveAspectRatio
      >
        <circle
          :r="radius-5"
          class="stroke-hole"
          cx="16"
          cy="16"
        />
        <circle
          class="stroke-mark"
          cx="16"
          cy="16"
          r="5"
        />
      </svg>
      <svg
        :style="svgStyle"
        viewBox="0 0 32 32"
        preserveAspectRatio
        @click="computeValue"
      >
        <circle
          ref="ring"
          :r="radius+30"
          :stroke="bgcolor"
          :stroke-width="strokeWidth"
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
    </div>

    <transition name="bounce-tiny">
      <div
        v-show="isVisible"
        :key="currentValue"
        class="value-label"
      >
        <div
          v-if="isVisible"
          :style="{color: barcolor}"
          :class="'value-span--'+size"
          class="value-span"
        >
          {{ currentValue }}
        </div>
      </div>
    </transition>
    <!-- :style="{top: knobsNumber > 3 ? '-20%' : '-8%'}" -->
  </section>
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

.pedal-setting-name {
  text-transform: uppercase;
  font-weight: bold;
  color: aliceblue;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  transform: translateY(-50%);
  &--normal {
    font-size: .46rem;
  }
  &--normal-safari {
    font-size: 6px;
  }

  &--zoom-in {
    font-size: 1.2rem;
  }
}

.svg-container {
  height: 100%;
  width: 100%;
  position: relative;
  margin-top: .2rem;
}
</style>
