<script>
export default {
  name: 'chicken-head-knob',
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
    // fillcolor: {
    //   type: String,
    //   required: false,
    //   default: 'red',
    //   // '#17d'
    // },
    // barcolor: {
    //   type: String,
    //   required: false,
    //   default: 'grey',
    //   // '#17d'
    // },
    // bgcolor: {
    //   type: String,
    //   required: false,
    //   default: '#d2d3d4',
    // },
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
  },
  data() {
    return {
      radius: 10,
      strokeWidth: 5,
      svgRotate: 270,
      currentValue: this.initValue,
      isShowing: false,
      selectorValue: 0,
      isVisible: true,
      strokeColor: 'black',
      valueColor: 'grey',
    };
  },
  computed: {
    // currentValue(){
    //   return this.initValue;
    // },
    circumference() {
      return this.radius * 2 * Math.PI;
    },
    strokeDasharray() {
      const value = (this.circumference / this.maxValue) * this.currentValue;
      return value + ' ' + (this.circumference - value);
    },
    labelStyle() {
      // TO-DO: if decimal adjust transformY
      let transformY;
      const currentValueDigits = this.numDigits(this.currentValue);
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
    setTimeout(()=> (this.selectorValue = initialDegress - (this.svgRotate - 90)), 250);
  },
  watch: {
    initValue(newValue, oldValue) {
      if (newValue !== oldValue) {
      this.currentValue = newValue;
      const initialDegress = (this.currentValue / this.maxValue) * 360;
      setTimeout(()=> (this.selectorValue = initialDegress - (this.svgRotate - 90)), 250);
      console.log(newValue)
      }
    }
  },
  methods: {
    computeValue(e) {
      // The percentaje where user clicks
      const rect = this.$refs.chicken.getBoundingClientRect();
      const centerX = rect.width / 2 + rect.left;
      const centerY = rect.height / 2 + rect.top;
      const clickX = e.clientX;
      const clickY = e.clientY;
      const result = Math.atan2(centerY - clickY, centerX - clickX);

      // Calculation of current value
      const percentage = ((result + Math.PI) / (Math.PI + Math.PI)) * this.maxValue;
      // delta: the percentaje that represents the rotate: 90 degrees of rotate represents the 25% of the circumference
      const deltaPercentaje = (this.svgRotate / 360) * this.maxValue;
      let adjustPercentage = percentage + deltaPercentaje;
      // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
      adjustPercentage =
        adjustPercentage > this.maxValue
          ? adjustPercentage - this.maxValue
          : adjustPercentage;
      // TO-DO if decimal: this.currentValue = adjustPercentage; and round to 1 digit
      this.currentValue = Math.ceil(adjustPercentage);
      // Calculation of inner selector position
      const deltaDegrees = (this.svgRotate / 360) * 360;
      const degress = ((result + Math.PI) / (Math.PI + Math.PI)) * 360;
      let adjustDegrees = degress + deltaDegrees;
      adjustDegrees = adjustDegrees > 360 ? adjustDegrees - 360 : adjustDegrees;
      // this.selectorValue = adjustDegrees - (this.svgRotate - 90);
      this.$emit('valueChanged', this.currentValue);
    },
    numDigits(x) {
      return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
    },
    setStroke(isHover) {
      this.strokeColor = isHover ? '#3f7f00' : 'black';
      this.valueColor = isHover ? '#3f7f00' : 'grey';
    },
  },
};
</script>
<template>
  <div class="container">
    <div
      class="pointer-wrapper"
      @click="computeValue"
      @mouseover="setStroke(true)"
      @mouseleave="setStroke(false)"
    />
    <div
      ref="chicken"
      :style="svgAbove"
      class="chicken-head"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <!-- Created with SVG-edit - https://github.com/SVG-Edit/svgedit-->
        <defs>
          <linearGradient
            id="svg_10"
            y2="0"
            y1="0.31357"
            x2="1"
            x1="0.6011"
          >
            <stop
              stop-color="#000000"
              offset="0"
            />
            <stop
              stop-color="#ffffff"
              offset="1"
            />
          </linearGradient>
          <linearGradient
            id="svg_5"
            y2="0.71591"
            y1="0"
            x2="0.61672"
            x1="0"
            spreadMethod="pad"
          >
            <stop
              stop-color="#000000"
              offset="0.06985"
            />
            <stop
              stop-opacity="0.99219"
              stop-color="#0f0f0f"
              offset="0.54641"
            />
            <stop
              stop-opacity="0.99219"
              stop-color="#544f4f"
              offset="0.80032"
            />
            <stop
              stop-opacity="0.99219"
              stop-color="#ffffff"
              offset="0.98782"
            />
          </linearGradient>
        </defs>
        <g class="layer">
          <title>Layer 1</title>
          <g
            id="svg_8"
            stroke="null"
          >
            <circle
              id="svg_2"
              :stroke="strokeColor"
              stroke-width="2"
              stroke-linejoin="null"
              stroke-linecap="null"
              stroke-dasharray="null"
              r="30%"
              fill="url(#svg_5)"
              cy="50%"
              cx="51%"
            />
            <path
              id="svg_1"
              :stroke="strokeColor"
              xmlns="http://www.w3.org/2000/svg"
              d="M19.610950469970703,106.15030662841797 C25.240630469970704,106.80492662841797 30.477540469970705,107.45953662841796 36.5000004699707,
              108.11414662841797 L53.389050469970705,106.15030662841797 L53.389050469970705,58.01526662841797 Q53.389050469970705,33.947746628417974 36.5000004699707,
              11.885856628417969 Q19.610950469970703,35.95337662841797 19.610950469970703,58.01526662841797 L19.610950469970703,104.15030662841797 L19.610950469970703,
              106.15030662841797 z"
              fill="url(#svg_10)"
              stroke-width="2"
              fill-opacity="1"
              stroke-opacity="1"
            />
            <path
              id="svg_4"
              xmlns="http://www.w3.org/2000/svg"
              d="M31.24724,26.12285 L42.14658,26.12285 L39.59358,21.48068 L36.54963,16.83851 L33.65296,21.48068 L31.24725,26.12285 L31.24724,26.12285 z"
              fill="#ffffff"
              stroke-width="0"
              stroke="black"
              fill-opacity="1"
              stroke-opacity="1"
            />
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
        class="stroke-hole"
      />
    </svg>


    <transition name="bounce-tiny">
      <div
        v-show="isVisible"
        :key="currentValue"
        class="value-label"
      >
        <div
          v-if="isVisible"
          :style="{ color: `hsl(0, 100%, ${100 - (currentValue/2)}%)`}"
          :class="'value-span--'+size"
          class="value-span"
        >
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
  width: 4.6rem;
  height: 7.5rem;
  z-index: $z-index-2;
}
.setting-name {
  text-transform: uppercase;
  font-weight: bold;
  color: aliceblue;
  position: absolute;
  width: 100%;
  top: -15%;
  z-index: -1;
  font-size: .6rem;
  font-family: "FontPbio";
}
.value-label{
  z-index: $z-index-2;
  position: absolute;
  top: 35%;
  font-size: 1rem;
  font-family: "FontPbio";
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
  width: 110%;
  height: 110%;
  position: absolute;
  z-index: $z-index-3;
  cursor: pointer;
}
</style>
