<script>
import { mapGetters, mapActions } from 'vuex'
import modal from './components/common/modal.vue'
import pedalZoomIn from './components/pedals/pedal/pedal-zoom-in'
import infoModal from './components/common/info-modal'
import firstTimeModal from './components/common/first-time-modal'

import englTheme from './components/themes/engl-theme.vue'
import pedalsBoard from './components/pedals/grid/pedals-board'
import appFooter from './components/app-footer.vue'
import closeable from './mixins/closeable'

// file:./../noisefy

export default {
  name: 'App',
  components: {
    modal,
    infoModal,
    firstTimeModal,
    pedalZoomIn,
    englTheme,
    pedalsBoard,
    appFooter,
  },
  mixins: [closeable],
  data () {
    return {
      audioContext: null,
    }
  },
  computed: {
    ...mapGetters('pedal', [
      'zoomInPedal',
    ]),
    ...mapGetters('ui', [
      'showInfoModal',
      'showFirstTimeModal',
      'isFirstTime',
    ]),
  },
  created () {
    this.createAudioContext()
    this.createAmp()
  },
  mounted () {
    if (this.isFirstTime) {
      this.toggleModal({ modalName: 'firstTimeModal', status: true })
    }
    document.body.onkeyup = (e) => {
      // Spacebar
      if (e.keyCode === 32) {
        this.toggleAmpChannel()
      }
    }
  },
  methods: {
    ...mapActions('pedal', [
      'createAudioContext',
      'createAmp',
      'setPedalProperty',
      'toggleAmpChannel',
    ]),
    ...mapActions('ui', [
      'toggleModal',
    ]),
  },

}
</script>
<template>
  <div
    id="app"
  >
    <modal
      :show="zoomInPedal !== undefined"
    >
      <pedal-zoom-in />
    </modal>
    <modal
      :show="showInfoModal"
      :click-outside-closes="true"
      modal-name="infoModal"
      size="big"
    >
      <infoModal />
    </modal>
    <modal
      :show="showFirstTimeModal"
      :click-outside-closes="true"
      modal-name="firstTimeModal"
      size="big"
    >
      <firstTimeModal />
    </modal>
    <engl-theme @keyup.space="toggleKeyAction" />
    <pedals-board />
    <app-footer />
  </div>
</template>
<style lang="scss">
body { margin:0; background-color: rgb(70,70,70);}
p { margin:0;}
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
@font-face {
  font-family: "Dyslexic";
  src: url("./assets/fonts/OpenDyslexic-Bold.otf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Pixel";
  src: url("./assets/fonts/pixel.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
</style>
