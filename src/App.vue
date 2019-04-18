<template>
  <div id="app">

    <app-header/>


    <div class="row">
      <div class="pedal-palette">
        <div class="palette-title">Add effects!</div>
        <div
          class="grid-container"
          style="background-color:#aaa;">
          <palette-pedal
            v-for="palettePedal in palettePedalsList"
            :key="palettePedal.name"
            :palette-pedal="palettePedal"
            :title="'Add '+palettePedal.name+'!!'"
          />
        </div>
      </div>
      <div class="noise-board column">
        <div class="row">
          <div
            class="column left"
            style="background-color:#bbb;"/>
          <div
            class="column middle"
            style="background-color:#ccc;">
            <div class="row">
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
            class="column right"
            style="background-color:#ddd;">
            <div class="palette-title">Main controls</div>
            <master-control/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import appHeader from './components/app-header.vue';
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
  },
  methods: {
    ...mapActions('pedal', [
      'initPalettePedals',
      'removePedal',
    ]),
  },

};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.pedal-palette {
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 20%;
  float: left;
}
.noise-board{
  width: 80%;
}
/* Create three unequal columns that floats next to each other */
.column {
    float: left;
    height: 600px; /* Should be removed. Only for demonstration */
}


.left {
  width: 2%;
}
.middle {
  width: 90%;
}
.right {
  width: 8%;
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
  background-color: #2196F3;
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
