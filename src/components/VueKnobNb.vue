<template>
<div class="container">
  <svg id="rotationSVG" width="100%" height="100%" viewBox="0 0 42 42" v-bind:style="svgAbove" preserveAspectRatio >
    <circle
      class="stroke-hole"
      cx="21"
      cy="21"
      :r="9"
      >
    </circle>
    <circle
      class="stroke-mark"
      cx="21"
      cy="21"
      r="5"
      >
    </circle>
  </svg>
<svg width="100%" height="100%" viewBox="0 0 42 42"  v-bind:style="svgStyle" preserveAspectRatio >

  <circle 
    ref="ring"
    class="ring"
    cx="21"
    cy="21"
    :r="radius"
    fill="transparent"
    :stroke="bgcolor"
    :stroke-width="strokeWidth"
    @click="computeValue">
  </circle>
  <circle
    ref="segment"
    class="segment"
    cx="21"
    cy="21"
    :r="radius"
    fill="transparent"
    :stroke="barcolor"
    :stroke-width="strokeWidth"
    :stroke-dasharray="strokeDasharray"
    stroke-dashoffset="0"
    @click="computeValue">
  </circle>
  <g transform = "rotate(90 21 21)">
    <text ref="textVal" y="50%" x="50%" :style="labelStyle" @click="computeValue">
      {{currentValue}}
    </text>
  </g>
  
</svg>

    <div class="setting-name">

    <span>{{name}}</span>
    </div>
</div>



</template>
<script>
export default {
  template:'#vue-knob-nb',
  props:{
    initValue:{
      type:Number,
      required:true,
      validator: (initValue) => {
         return initValue > 0 && initValue <=100
      }
    },
    maxValue:{
      type:Number,
      required:false,
      default: 100
    },
    fillcolor:{
      type:String,
      required:false,
      default: 'red'
      // '#17d'
    },
    barcolor:{
      type:String,
      required:false,
      default: 'black'
      // '#17d'
    },
    bgcolor:{
      type:String,
      required:false,
      default:'#d2d3d4'
    },
    name:{
      type: String,
      required: false
    }
  },
  data() {
    return {
      radius: 15,
      strokeWidth: 3,
      svgRotate: 90,
      currentValue: this.initValue,
      isShowing: false,
      testValue: 0
    };
  },
  computed:{
    circumference(){ 
      //94.2 = 2 * PI * RADIOUS (r="15")
      return this.radius * 2 * Math.PI
    },
    strokeDasharray(){
      let value = (this.circumference/this.maxValue) * this.currentValue;
      return value + ' ' + (this.circumference-value);
    },
    labelStyle(){
      //TO-DO: if decimal adjust transformY
      let transformY;
      let currentValueDigits = this.numDigits(this.currentValue)
      if(currentValueDigits >= 3){
        transformY = 0.75;
      }else if(currentValueDigits === 2){
        transformY = 0.5;
      }else{
        transformY = 0.25;
      }
      return {
        transform: `translateX(-${transformY}em) translateY(0.4em)`,
        'font-size':'0.9em',
        'fill': 'white'
      }
    },
    svgStyle(){
        return {
          transform: `rotate(-${this.svgRotate}deg)`
        }
    },
    svgAbove(){
        return {
          position: 'absolute',
          top: 0,
          left:0,
          width: '100%',
          height: '100%',
          transition: 'all 1s ease',
          transform: `rotate(${this.testValue-this.svgRotate-2}deg)`
        }
    }

  },
  methods: {
    computeValue (e) {
        // The percentaje where user clicks
        const rect = this.$refs.ring.getBoundingClientRect(), 
            centerX = rect.width / 2 + rect.left,
            centerY = rect.height / 2 + rect.top ,
            clickX = e.clientX,
            clickY = e.clientY;
        let result = Math.atan2(centerY - clickY, centerX - clickX);
        let percentage = (result + Math.PI)/(Math.PI + Math.PI) * this.maxValue;
        // delta: the percentaje that represents the rotate: 90 degrees of rotate represents the 25% of the circumference
        let deltaPercentaje = (this.svgRotate / 360) * this.maxValue;
        let adjustPercentage = (percentage + deltaPercentaje) 
        // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
        adjustPercentage = (adjustPercentage > this.maxValue) ? adjustPercentage - this.maxValue : adjustPercentage; 
        //TO-DO if decimal: this.currentValue = adjustPercentage; and round to 1 digit
        this.currentValue = Math.ceil(adjustPercentage);

        let deltaDegrees = (this.svgRotate / 360) * 360;
        let degress = (result + Math.PI)/(Math.PI + Math.PI) * 360;
        let adjustDegrees = (degress + deltaDegrees) 
        // console.log(this.maxValue * Math.trunc(adjustPercentage/this.maxValue))
        adjustDegrees = (adjustDegrees > 360) ? adjustDegrees - 360 : adjustDegrees; 
        console.log('result: ', result)
        this.testValue = adjustDegrees;
    },
    numDigits(x) {
      return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
    }
  },
  mounted(){

    let initialDegress = this.currentValue/this.maxValue * 360;
    console.log('initialDegress: '+ initialDegress)

    var self = this;
    setTimeout(function(){
        self.testValue = initialDegress;
    }, 250);
  }
};
</script>
<style>
.container{
  position: relative;
  z-index: 100;
}
.stroke-hole{
  fill: darkgray;
  stroke: darkgrey;
  stroke-width: 5;
  stroke-dasharray: 2, 2;
}
.stroke-mark{
  fill: none;
  stroke: black;
  stroke-width: 7;
  stroke-dasharray: 1, 90;
}

.setting-name {
  color: aliceblue;
  position: absolute;
  width: 100%;
  top: 80%;
  z-index: -1;
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