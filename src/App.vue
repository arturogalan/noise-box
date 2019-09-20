<script>
import {mapGetters, mapActions} from 'vuex';
import modal from './components/common/modal.vue';
import pedalZoomIn from './components/pedals/pedal/pedal-zoom-in';
import englTheme from './components/themes/engl-theme.vue';
import pedalsBoard from './components/pedals/grid/pedals-board';
import appFooter from './components/app-footer.vue';

export default {
  name: 'app',
  components: {
    modal,
    pedalZoomIn,
    englTheme,
    pedalsBoard,
    appFooter,
  },
  data() {
    return {
      audioContext: null,
    };
  },
  computed: {
    ...mapGetters('pedal', [
      'zoomInPedal',
    ]),
  },
  created() {
    this.createAudioContext();
    this.createAmp();
  },
  methods: {
    ...mapActions('pedal', [
      'createAudioContext',
      'createAmp',
      'setPedalProperty',
    ]),
  },

};
</script>
<template>
  <div id="app">
    <modal
      :show="zoomInPedal !== undefined">
      <pedal-zoom-in/>
    </modal>
    <engl-theme/>
    <pedals-board/>
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
//Fonts
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
</style>
