<script>
import {mapGetters, mapActions} from 'vuex';
import appHeaderEngl from './components/app-header-engl.vue';
import appFooter from './components/app-footer.vue';
import palettePedal from './components/palette-pedal.vue';
import pedal from './components/pedal/pedal.vue';
import masterControl from './components/master-control.vue';
import modal from './components/common/modal.vue';
import pedalZoomIn from './components/pedal/pedal-zoom-in';

export default {
  name: 'App',
  components: {
    appHeaderEngl,
    palettePedal,
    pedal,
    masterControl,
    appFooter,
    modal,
    pedalZoomIn,
  },
  data() {
    return {
      audioContext: null,
    };
  },
  computed: {
    ...mapGetters('pedal', [
      'palettePedalsList',
      'pedalList',
      'zoomInPedal',
    ]),
  },
  created() {
    this.initPalettePedals();
    this.createAudioContext();
  },
  methods: {
    ...mapActions('pedal', [
      'initPalettePedals',
      'removePedal',
      'createAudioContext',
      'setPedalProperty',
    ]),
    zoomPedal(pedal) {
      this.setPedalProperty({type: pedal.type, property: 'zoomIn', value: true});
    },
  },

};
</script>
<template>
  <div id="app">
    <modal :show="zoomInPedal ? true : false">
      <pedal-zoom-in/>
    </modal>
    <app-header-engl/>
    <div class="app-body">
      <div class="master-control column">
        <div class="palette-title">{{ this.$t('MAIN.STEP_1') }}</div>
        <master-control/>
      </div>

      <div class="pedal-palette">
        <div class="palette-title">{{ this.$t('MAIN.STEP_2') }}</div>
        <div class="grid-container">
          <palette-pedal
            v-tooltip="{text: $t('TOOLTIP.PEDAL.ADD', { effect: palettePedal.name })}"
            v-for="palettePedal in palettePedalsList"
            :key="palettePedal.name"
            :palette-pedal="palettePedal"
          />
        </div>
      </div>
      <div class="pedal-board">
        <div class="palette-title">{{ this.$t('MAIN.STEP_3') }}</div>


        <div class="noise-board column">
          <div>
            <div
              class="column left"/>
            <div
              class="column middle">
              <div>
                <pedal
                  v-for="pedal in pedalList"
                  :key="pedal.name"
                  :pedal="pedal"
                  class="column"
                  @delete="removePedal(pedal)"
                  @maximize="zoomPedal(pedal)"
                />
              </div>
            </div>
            <div
              class="column right"/>
          </div>
        </div>
      </div>
    </div>
    <app-footer/>
  </div>
</template>
<style lang="scss">
body,p { margin:0; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
@font-face {
  font-family: "FontPbio";
  src: url("./assets/fonts/pbio-bold.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Conthrax";
  src: url("./assets/fonts/conthrax-sb.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Fatsans";
  src: url("./assets/fonts/Fatsans.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "FatsansContur";
  src: url("./assets/fonts/FatsansContur.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
.app-body {
  height: 49rem;
}
.master-control {
  width: 10%;
  background-color:#bbb;
}
.pedal-palette {
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 15%;
  height: 100%;
  float: left;
  background-color:#aaa;
}
.pedal-board {
   height: 100%;
     background-color:#ccc;
}
.noise-board{
  width: 70%;
}
/* Create three unequal columns that floats next to each other */
.column {
    float: left;
    height: 100%;
}
.left {
  width: 2%;
  background-color:#bbb;
}
.middle {
  width: 90%;
}
.right {
  width: 8%;
  background-color:#ddd;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    /* display: grid; */
    clear: both;
    /* grid-template-columns: auto auto; */
}
.grid-container {
  display: grid;
  justify-content: start;
  grid-template-columns: 45% 45%;/*Make the grid smaller than the container*/
  grid-gap: 5px;


  padding-top: .3rem;
}
.palette-title {
  background-color: bisque;
  font-style: oblique;
  font-weight: 900;
}
.tooltip-box {
  font-family: 'Conthrax';
  font-size: .6rem;
  color: black;
  background-color: white;
  border: solid 1px rgb(122, 44, 44);
  z-index: $z-index-tooltip;
}
.tooltip-text {
  padding: 2px;
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 3s linear;
}
.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear;
}

.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: .5s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-out {
  opacity: 1;
  animation-name: fadeOutOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-duration: .25s;
}
@keyframes fadeOutOpacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

// @keyframes visible {
//   0% {
//     opacity: 0;
//   }
//   20% {
//     opacity: .1;
//   }
//   30% {
//     opacity: .2;
//   }
//   40% {
//     opacity: .3;
//   }
//   50% {
//     opacity: .4;
//   }
//   60% {
//     opacity: .5;
//   }
//   70% {
//     opacity: .6;
//   }
//   80% {
//     opacity: .8;
//   }
//   100% {
//     opacity: 1;
//   }
// }

</style>
