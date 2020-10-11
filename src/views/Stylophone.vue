<script>
import * as Noisefy from 'noisefy'
import dropdown from '../components/common/dropdown'
import slider from '../components/common/slider'

const keyboardToNoteMapper = {
  81: {key: 'A', octave: 1}, // Q - A
  50: {key: 'A#', octave: 1}, // 2 - A#
  87: {key: 'B', octave: 1}, // W - b
  69: {key: 'C', octave: 2}, // E - C
  52: {key: 'C#', octave: 2}, // 4 - C#
  82: {key: 'D', octave: 2}, // R - D
  53: {key: 'D#', octave: 2}, // 5 - D#
  84: {key: 'E', octave: 2}, // T - E
  89: {key: 'F', octave: 2}, // Y - F
  55: {key: 'F#', octave: 2}, // 7 - F#
  85: {key: 'G', octave: 2}, // U - G
  56: {key: 'G#', octave: 2}, // 8 - G#
  73: {key: 'A', octave: 2}, // I - A
  57: {key: 'A#', octave: 2}, // 9 - A#
  79: {key: 'B', octave: 2}, // O - B
  80: {key: 'C', octave: 3}, // P - C
  // we mapped the last four by code cause in spanish 2 keys has the same code
  // 189: 'C#', // - - C#
  // 219: 'D', // [ - D
  // 187: 'D#', //= - D#
  // 221: 'E', // ] - E
}
const keyboardCodeToNoteMapper = {
  Minus: {key: 'C#', octave: 3},
  BracketLeft: {key: 'D', octave: 3},
  Equal: {key: 'D#', octave: 3},
  BracketRight: {key: 'E', octave: 3},
}
const notesMapper = {
  1: { key: 'A', octave: 1},
  1.5: { key: 'A#', octave: 1},
  2: { key: 'B', octave: 1},
  3: { key: 'C', octave: 2},
  3.5: { key: 'C#', octave: 2},
  4: { key: 'D', octave: 2},
  4.5: { key: 'D#', octave: 2},
  5: { key: 'E', octave: 2},
  6: { key: 'F', octave: 2},
  6.5: { key: 'F#', octave: 2},
  7: { key: 'G', octave: 2},
  7.5: { key: 'G#', octave: 2},
  8: { key: 'A', octave: 2},
  8.5: { key: 'A#', octave: 2},
  9: { key: 'B', octave: 2},
  10: { key: 'C', octave: 3},
  10.5: { key: 'C#', octave: 3},
  11: { key: 'D', octave: 3},
  11.5: { key: 'D#', octave: 3},
  12: { key: 'E', octave: 3},
}

export default {
  name: 'Stylophone',
  components: {
    dropdown,
    slider,
  },
  data () {
    return {
      upKeys: [1.5, 3.5, 4.5, 6.5, 7.5, 8.5, 10.5, 11.5],
      downKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      playingNote: undefined,
      playingOctave: 2,
      playingWaveForm: 'sawtooth',
      isClicking: false,
      synth: {},
    }
  },
  computed: {
    isMobile () {
      return navigator.userAgent.match(/iPad/i) != null
    },
    octaveList () {
      return [1, 2, 3, 4].map(el => {
        return {
          id: el,
          selected: this.playingOctave === el,
          name: el,
        }
      })
    },
    waveFormList () {
      return ['sine',
        'square',
        'sawtooth',
        'triangle'].map(el => {
        return {
          id: el,
          selected: this.playingWaveForm === el,
          name: el,
        }
      })
    },
  },
  watch: {
    playingNote (newValue, oldValue) {
      if (newValue && newValue !== oldValue && this.isClicking) {
        const {key, octave} = notesMapper[newValue]
        if (key) this.synth.playSingleNote({key, octave: octave + this.playingOctave })
      }
    },
  },
  mounted () {
    const audioContext = Noisefy.createAudioContext()
    this.synth = new Noisefy.Synth(audioContext)
    window.addEventListener('keydown', this.playKeyPress, false)
    window.addEventListener('keyup', this.stopKeyPress, false)
    window.addEventListener('mousedown', this.clickTrue, false)
    window.addEventListener('mouseup', this.clickFalse, false)
  },
  destroyed () {
    window.removeEventListener('keydown', this.playKeyPress, false)
    window.removeEventListener('keyup', this.stopKeyPress, false)
    window.removeEventListener('mousedown', this.clickTrue, false)
    window.removeEventListener('mouseup', this.clickFalse, false)
  },
  methods: {
    logMouse () {
      console.log('enter')
    },
    playKeyPress (evt) {
      if (!evt.ctrlKey && !evt.metaKey) {
        const {key, octave} = (keyboardToNoteMapper[evt.keyCode] || keyboardCodeToNoteMapper[evt.code] || {})
        if (key) this.synth.playNote({key, octave: octave + this.playingOctave })
      }
    },
    stopKeyPress (evt) {
      const {key, octave} = (keyboardToNoteMapper[evt.keyCode] || keyboardCodeToNoteMapper[evt.code] || {})
      if (key) this.synth.stopNote({key, octave: octave + this.playingOctave })
    },
    manageTouchNote (event) {
      var touch = event.touches[0]
      const element = document.elementFromPoint(touch.pageX, touch.pageY)
      this.playNote(element.id)
    },
    playNote (note) {
      if (this.isClicking) {
        this.playingNote = note
      }
    },
    stopNote () {
      this.playingNote = undefined
      this.synth.stopSingleNote()
    },
    clickOn (event, note) {
      if (event.which === 1) {
        this.clickTrue()
        this.playNote(note)
      }
    },
    clickOff () {
      this.clickFalse()
      this.stopNote()
    },
    clickTrue () {
      this.isClicking = true
    },
    clickFalse () {
      this.isClicking = false
    },
    setOctave (oct) {
      this.synth.stopAllNotes()
      this.playingOctave = oct.id
    },
    setVolume (val) {
      this.synth.volume = val
    },
    setWaveForm (wave) {
      this.synth.stopAllNotes()
      this.synth.waveForm = wave.id
      this.playingWaveForm = wave.id
    },
  },
}
</script>
<template>
  <section>
    <router-link :to="{name: 'main'}">
      <div
        class="title-container"
        @keypress="playKeyPress($event)"
      >
        <img
          :src="require('../assets/img/header-icon-on.gif')"
          class="logo-icon"
        >
        <div class="title-name">
          NOISE BOX
        </div>
      </div>
    </router-link>
    <div class="parent">
      <div :class="isMobile ? 'box--mobile' : 'box'">
        <div class="grid">
          <div
            class="name"
          >
            <span>Stylophone</span><span class="subtext">TM</span>
          </div>
        </div>
        <div
          class="pen-wrapper"
        >
          <div class="square" />
          <div class="pen--square">
            <div class="pen--holder-circle" />
            <div class="pen--holder">
              <div class="pen--tip-wrapper">
                <div class="pen--tip" />
              </div>
              <div class="pen--body">
                <div class="pen--body--triangle-up" />
                <div class="pen--body--triangle-down" />
              </div>
            </div>
          </div>
        </div>
        <div class="touch-pad">
          <div class="switches">
            <div class="switch--sticker">
              <div class="switch--buttons">
                <div class="button-gap button-gap--left">
                  <div class="button button--on" />
                  <div class="button--name button--name--box">
                    <div>P</div>
                    <div>O</div>
                    <div>W</div>
                    <div>E</div>
                    <div>R</div>
                  </div>
                </div>
              </div>
              <div class="button-gap button-gap--right">
                <div class="button button--off" />
                <div class="button--name button--name--box button--name--vibrato">
                  <div>V</div>
                  <div>I</div>
                  <div>B</div>
                  <div>R</div>
                  <div>A</div>
                  <div>T</div>
                  <div>O</div>
                </div>
              </div>
            </div>
          </div>
          <div class="pad-wrapper">
            <div class="pad-box">
              <div class="pad-corner" />
              <div
                class="pad-bottom-keys"
                @mouseleave="stopNote"
              >
                <div
                  v-for="downKeyNumber in 12"
                  :id="`${downKeyNumber}`"
                  :key="downKeyNumber"
                  class="key-bottom"
                  @mousedown="clickOn($event, downKeyNumber)"
                  @mouseup="clickOff"
                  @mousemove="playNote(downKeyNumber)"
                  @mouseenter="playNote(downKeyNumber)"
                  @touchstart.prevent="clickOn($event, downKeyNumber)"
                  @touchend.prevent="clickOff(downKeyNumber)"
                  @touchmove.prevent="manageTouchNote($event)"
                >
                  <div
                    class="key-bottom--name"
                  >
                    {{ downKeyNumber }}
                  </div>
                </div>
                <div
                  v-for="(upKeyNumber, index) in upKeys"
                  :id="`${upKeyNumber}`"
                  :key="upKeyNumber"
                  class="key-up"
                  :class="`key-up--${index + 1}`"
                  @mousedown="clickOn($event, upKeyNumber)"
                  @mouseup="clickOff(upKeyNumber)"
                  @mousemove="playNote(upKeyNumber)"
                  @touchstart.prevent="clickOn($event, upKeyNumber)"
                  @touchend.prevent="clickOff(upKeyNumber)"
                  @touchmove.prevent="manageTouchNote($event)"
                >
                  <div class="key-up--name">
                    {{ upKeyNumber }}
                  </div>
                  <div class="key-up--footer-polygon--bg" />
                  <div class="key-up--footer-polygon--black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-section">
        <div
          class="dropdown-label"
        >
          {{ $t('TOOLTIP.STYLO.OCTAVE.NAME') }}
        </div>
        <dropdown
          :list="octaveList"
          size="small"
          direction="up"
          name="octaveType"
          tooltip-key="TOOLTIP.STYLO.OCTAVE.DESC"
          @selected="setOctave"
        />
      </div>
      <div class="footer-section">
        <div
          class="dropdown-label"
        >
          {{ $t('TOOLTIP.STYLO.WAVEFORM.NAME') }}
        </div>
        <dropdown
          :list="waveFormList"
          size="small"
          direction="up"
          name="waveFormType"
          tooltip-key="TOOLTIP.STYLO.WAVEFORM.DESC"
          @selected="setWaveForm"
        />
      </div>
      <div class="footer-section footer-section--right">
        <div class="footer-label footer-title--output">
          <span class="footer-title">
            {{ $t('MAIN_CONTROL.VOLUME').toUpperCase() }}
          </span>
        </div>
        <slider
          size="medium"
          :value="synth.volume"
          :value-color="'rgb(206, 71, 73)'"
          :value-fill-color="'hsl(359,37%,34%)'"
          class="footer-slider"
          @change="setVolume"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
@font-face {
  font-family: "Dyslexic";
  src: url("../assets/fonts/OpenDyslexic-Bold.otf") format("truetype");
  font-weight: 400;
  font-style: normal;
}@font-face {
  font-family: "FontPbio";
  src: url("../assets/fonts/pbio-bold.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

.title-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 2vh;
  width: 100%;
  z-index: 3;
  display: flex;
  align-items: top;
}
.logo-icon {
  width: 7vw;
  height: 9vw;
}
.title-name {
  font-size: 6vw;
  font-family: 'Fredoka One', cursive;
  text-align: center;
  white-space: nowrap;
  color: white;
  top: 0;
}

.parent {
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-135deg, #007, #003);
}

.box {
  --box-width: calc(60vw + 40vh);
  --box-height: calc(var(--box-width) / 2);
  position: absolute;
  width: var(--box-width);
  height: var(--box-height);
  min-width: 720px;
  min-height: 360px;
  background-color: #191f24;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 8px 4px 4px #343536;
}
.box--mobile {
  --box-width: 98vw;
  --box-height: calc(var(--box-width) / 2);
  position: absolute;
  width: var(--box-width);
  height: var(--box-height);
  min-width: 720px;
  min-height: 360px;
  background-color: #191f24;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 8px 4px 4px #343536;
}
.grid {
  position: relative;
  height: 50%;
  width: 96%;
  background-color: #F8F8F8;
  margin: .4rem 0;
  border-radius: .2rem;
  background-image:  linear-gradient(to right, transparent 90%, #F4F4F4 20%),
  linear-gradient(to bottom, transparent 50%, #0c0d13 30%);
  background-position: 11px 3px;
  background-size: 30px 11px;
  box-shadow: inset 0 0 10px #000000;
  pointer-events: none;
}
.name {
  position: absolute;
  right: 2%;
  top: 10%;
  width: 25vw;
  height: 25%;
  border-radius: .5rem;
  box-shadow: 2px 1px 1px 1px #343536;
  background-color: #0c0d13;
  color: white;
  text-align: center;
  font-family: 'Great vibes', cursive;
  font-size: 3.8vw;
  letter-spacing: .3vw;
  text-shadow: 2px 0 #343536, 0 1px darkgrey, 3px 0 black, 0 -1px grey;
}
.subtext {
  font-size: .7rem;
  font-family: 'Arial';
  font-weight: bold;
  top: 40%;
  margin-left: .4rem;
  position: absolute;
  letter-spacing: normal;
}
.pen-wrapper {
  height: 10%;
  width: 98%;
  background-color: black;
  border-radius: .2rem;
  margin-bottom: .2rem;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 18% 81%;
  grid-gap: 0;
  z-index: 3;
  pointer-events: none;
}
.square {
  background-color: #343536;
  width: 97%;
  height: 90%;
  border-radius: .3rem;
}
.pen--square {
  background-color: #343536;
  width: 100%;
  height: 90%;
  border-radius: .3rem;
  display: flex;
  justify-content: flex-end;
  z-index: 2;

}
.pen--holder-circle {
  background-color: black;
  border-bottom-left-radius: 100%;
  border-top-left-radius: 100%;
  width: 6%;
  height: 100%;
  margin-right: -2rem;
}
.pen--holder {
  background-color: black;
  width: 82%;
  height: 100%;
  display: flex;
  position: relative;
}

.pen--tip-wrapper {
  position: relative;
  width: 10%;
  height: 50%;
  margin-left: -.5rem;
}
.pen--tip {
  position: absolute;
  top: 55%;
  right: 0;
  height: calc(.1vw);
  border-top: .6vw solid transparent;
  border-bottom: .6vw solid transparent;
  border-right: 3vw solid white;
}
.pen--body {
  position: relative;
  background-color: #343536;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #000000;
}

.pen--body--triangle-up {
  content: "";
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border-top: calc(var(--box-width) / 90) solid black;
  border-right: calc(var(--box-width) / 5) solid transparent;
  z-index: 2;
}
.pen--body--triangle-down {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: calc(var(--box-width) / 60) solid black;
  border-right: calc(var(--box-width) / 5) solid transparent;
  z-index: 2;
}
.pen--body::before {
  top: 100%;
  border-bottom: 40px solid transparent;
}

.touch-pad {
  height: 35%;
  width: 98%;
  background-color: white;
  border-radius: .8rem;
  display: grid;
  justify-content: center;
  grid-template-columns: 20% 80%;
  grid-gap: 5px;
}
.switches {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.switch--sticker {
  position: relative;
  height: 50%;
  width: 35%;
  background-color: white;
  border-width: 2.5vw .3rem;
  border-style: solid;
}
.switch--sticker::before {
  content: 'OFF';
  position: absolute;
  color: white;
  top: -25%;
  left: 40%;
  font-size: .7vw;
}
.switch--sticker::after {
  content: 'ON';
  position: absolute;
  color: white;
  bottom: -25%;
  left: 40%;
  font-size: .7vw;
}
.button-gap {
  position: absolute;
  width: 40%;
  height: 50%;
  background-color: black;
  border-radius: .1rem;
  &--left {
    left: 0;
    top: 50%;
    transform: translateY(calc(-50%)) translateX(calc(-50%));
  }
  &--right {
    right: 0;
    top: 50%;
    transform: translateY(calc(-50%)) translateX(calc(50%));
  }
}
.button {
  position: absolute;
  width: 80%;
  height: 50%;
  background-color: black;
  border-radius: .1rem;
  &--on {
    left: -.2rem;
    bottom: .2rem;
    box-shadow: 0px 1px 1px 1px darkgrey;
  }
  &--off {
    left: -.1rem;
    top: .4rem;
    box-shadow: 0px 1px 1px 1px darkgrey;
  }
}
.rotate-text {
  font-size: 9px;
  font-weight: bold;
  writing-mode: vertical-rl;
  height: 50%;
  text-orientation: upright;
}
.button--name {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  &--box {
  transform: translateX(calc(200%));
  div {
  font-size: .5vw;
  font-weight: bold;
  }
  }
  &--vibrato {
  transform: translateX(calc(200%)) translateY(-15%);
  }
}
button--name
.switch--buttons {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pad-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.pad-box {
  position: relative;
  overflow: hidden;
  background-color: #bfb9bf;
  width: 90%;
  height: 80%;
  height: 80%;
  -moz-box-shadow:    inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow:         inset 0 0 10px #000000;
}
.pad-corner {
  position: relative;
  width: 100%;
  pointer-events: none;
}
.pad-corner:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  border-bottom: solid 1px white;
  width: 3.7rem;
  height: 1.8rem;
  transform: rotate(-45deg) translateY(15%) translateX(-53%);
  background-color: white;
  z-index: 2;
  -moz-box-shadow: inset 0 10px 10px -10px #000000;
  -webkit-box-shadow: inset 0 10px 10px -10px #000000;
  box-shadow: 0 20px 20px -12px #000000;
}
.pad-corner:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: solid 1px white;
  width: 3.3rem;
  height: 1.8rem;
  transform: rotate(45deg) translateX(17%) translateY(-60%);
  background-color: white;
  z-index: 2;
  -moz-box-shadow: 0px 20px 24px -10px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 20px 24px -10px rgba(0,0,0,0.75);
  box-shadow: 0px 20px 24px -10px rgba(0,0,0,0.75);
}
.key-bottom--name {
  position: absolute;
  left: 25%;
  width: 50%;
  bottom: calc(-11%);
  font-size: .7vw;
  font-weight: bold;
  letter-spacing: .05rem;
  user-select: none;
  pointer-events: none;
}

.pad-bottom-keys {
  display: flex;
  width: 100;
  height: 100%;
  flex-direction: row;
  user-select: none;
}
.key-bottom{
  border-right: solid 1px black;
  height: 100%;
  width: 20%;
  position: relative;
  user-select: none;
}
.key-up {
  --key-width: 4.16%;
  position: absolute;
  border-right: solid 1px black;
  border-left: solid 1px black;
  border-bottom: solid 1px #bfb9bf;
  height: 45%;
  width: 8.2%;
  background-color: #bfb9bf;
  -moz-box-shadow: inset 0 10px 10px -10px #000000;
  -webkit-box-shadow: inset 0 10px 10px -10px #000000;
  box-shadow: inset 0 10px 10px -10px #000000;
  user-select: none;
  &--1 {
    left: calc(var(--key-width));
  }
  &--2 {
    left:  calc(var(--key-width) * 5);
  }
  &--3 {
    left:  calc(var(--key-width) * 7);
  }
  &--4 {
    left:  calc(var(--key-width) * 11);
  }
  &--5 {
    left:  calc(var(--key-width) * 13);
  }
  &--6 {
    left:  calc(var(--key-width) * 15);
  }
  &--7 {
    left:  calc(var(--key-width) * 19);
  }
  &--8 {
    left:  calc(var(--key-width) * 21);
  }
}

.key-up--name {
  position: absolute;
  left: 25%;
  width: 50%;
  top: calc(-25%);
  font-size: .7vw;
  font-weight: bold;
  letter-spacing: .05rem;
  user-select: none;
  pointer-events: none;
}
.key-up--footer-polygon--black {
  position: absolute;
  width: 104%;
  height: .8rem;
  left: -1px;
  bottom: 0;
  overflow: hidden;
  background: black;
  // border: solid 3px #bfb9bf;
  clip-path: polygon(0 0, 100% 0, 89% 100%, 10% 100%);
  transform: translateY(90%);
  border-right: solid black -1px;
  user-select: none;
}
.key-up--footer-polygon--bg {
  position: absolute;
  width: 101%;
  height: .8rem;
  left: .3px;
  bottom: 1px;
  overflow: hidden;
  transform: translateY(90%);
  -webkit-clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  background: #bfb9bf;
  position: absolute;
  z-index: 4;
  user-select: none;
}

.footer {
  z-index: $z-index-10; /* Sit on top */
  padding: 0 2rem 0 2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: calc(100% - 70px);
  height: 5em;
  background-color: black;
  color: white;
  text-align: center;
  display: grid;
  justify-content: center;
  grid-template-columns: 35% 35% 30%;/*Make the grid smaller than the container*/
  // grid-gap: 3vw;
  border: 3px solid rgb(21,18,17);
}
.footer-section {
  // max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &--left {
    justify-content: flex-start;
  }
  &--middle {
    justify-content: center;
  }
  &--right {
    right: 0;
    justify-content: flex-end;
  }
}
.dropdown-label {
  white-space: nowrap;
  margin-right: 1rem;
  font-family: "Dyslexic";
  font-size: calc(1vw + 1vh);
  color: aliceblue;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
}
.footer-label {
  white-space: nowrap;
  margin: 0 1rem;
  font-family: "Dyslexic";
  font-size: calc(1vw + .5vh);
  display: flex;
  flex-flow: column;
}
.footer-latency {
  cursor: pointer;
}
.footer-title {
  font-weight: bold;
  // font-size: 1.1rem;
  &--input {
    color: rgb(146, 215, 146);
  }
  &--output {
    color: rgb(206, 71, 73);
  }
}
</style>
