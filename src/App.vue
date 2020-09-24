<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Amp',
  components: {
  },
  mixins: [],
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
  },
  methods: {
    ...mapActions('pedal', [
      'createAudioContext',
      'createAmp',
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
    <router-view />
  </div>
</template>
<style lang="scss">
body { margin:0; background-color: rgb(70,70,70);}
p { margin:0;}
html { -webkit-text-size-adjust:none; }
</style>
