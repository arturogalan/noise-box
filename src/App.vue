<script>
import {mapGetters, mapActions} from 'vuex';
import appHeader from './components/app-header.vue';
import appFooter from './components/app-footer.vue';
import palettePedal from './components/palette-pedal.vue';
import pedal from './components/pedal.vue';
import masterControl from './components/master-control.vue';


export default {
  name: 'App',
  components: {
    appHeader,
    palettePedal,
    pedal,
    masterControl,
    appFooter,
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
    ]),
  },

};
</script>
<template>
  <div id="app">

    <app-header/>
    <div>
      <div class="master-control column">
        <div class="palette-title">Main</div>
        <master-control/>
      </div>

      <div class="pedal-palette">
        <div class="palette-title">Add effects!</div>
        <div class="grid-container">
          <palette-pedal
            v-for="palettePedal in palettePedalsList"
            :key="palettePedal.name"
            :palette-pedal="palettePedal"
            :title="'Add '+palettePedal.name+'!!'"
          />
        </div>
      </div>
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
              />
            </div>
          </div>
          <div
            class="column right"/>
        </div>
      </div>
    </div>
    <app-footer/>
  </div>
</template>
<style>
body,p { margin:0; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
.master-control {
  width: 10%;
  background-color:#bbb;
}
.pedal-palette {
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 20%;
  float: left;
}
.noise-board{
  width: 70%;
}
/* Create three unequal columns that floats next to each other */
.column {
    float: left;
    height: 37rem; /* Should be removed. Only for demonstration */
}
.left {
  width: 2%;
  background-color:#bbb;
}
.middle {
  width: 90%;
  background-color:#ccc;
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
  grid-gap: 10px;
  background-color:#aaa;
}
.overlay {
  bottom: 0;
  background: rgb(0, 0, 0);
  background:rgba(193, 150, 150, 0.5); /* Black see-through */
  color: #f1f1f1;
  transition: .5s ease;
  color: white;
  text-align: center;
  border-radius: 10px;
}
.palette-title {
  background-color: bisque;
  font-style: oblique;
  font-weight: 900;
}
</style>
