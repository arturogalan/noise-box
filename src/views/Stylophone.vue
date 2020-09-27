<script>
export default {
  name: 'Stylophone',
  data () {
    return {
      playingNote: undefined,
    }
  },
  methods: {
    playNote (note) {
      debugger
      console.log('playing' + note)
    },
  },
}
</script>
<template>
  <section>
    <router-link :to="{name: 'main'}">
      <div class="title-container">
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
      <div class="box">
        <div class="grid">
          <div
            class="name"
          >
            <span>Stylophone</span><span class="subtext">TM</span>
          </div>
        </div>
        <div class="pen-wrapper">
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
                </div>
                <div class="rotate-text">
                  &nbsp;POWER
                </div>
              </div>
              <div class="button-gap button-gap--right">
                <div class="button button--off" />
                <div class="button--name rotate-text">
                  VIBRATO
                </div>
              </div>
            </div>
          </div>
          <div class="pad-wrapper">
            <div class="pad-box">
              <div class="pad-corner" />
              <div class="pad-down-keys">
                <div
                  class="key"
                  @click="playNote('1')"
                >
                  <div
                    class="key-bottom--name"
                  >
                    1
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    2
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    3
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    4
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    5
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    6
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    7
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    8
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    9
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    10
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    11
                  </div>
                </div>
                <div class="key">
                  <div class="key-bottom--name">
                    12
                  </div>
                </div>
              </div>
              <div class="pad-up-keys">
                <div class="key-up">
                  <div class="key-up--name">
                    1.5
                  </div><div class="key-up--footer" />
                </div>
                <div class="space-key" />
                <div class="key-up">
                  <div class="key-up--name">
                    3.5
                  </div><div class="key-up--footer" />
                </div>
                <div class="key-up no-left">
                  <div class="key-up--name">
                    4.5
                  </div><div class="key-up--footer" />
                </div>
                <div class="space-key" />
                <div class="key-up">
                  <div class="key-up--name">
                    6.5
                  </div><div class="key-up--footer" />
                </div>
                <div class="key-up no-left">
                  <div class="key-up--name">
                    7.5
                  </div><div class="key-up--footer" />
                </div>
                <div class="key-up no-left">
                  <div class="key-up--name">
                    8.5
                  </div><div class="key-up--footer" />
                </div>
                <div class="space-key" />
                <div class="key-up">
                  <div class="key-up--name">
                    10.5
                  </div><div class="key-up--footer" />
                </div>
                <div class="key-up no-left">
                  <div class="key-up--name">
                    11.5
                  </div><div class="key-up--footer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

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
  // --box-width: 1000px;
  // --box-height: 500px;
  --box-width: 80vw;
  --box-height: calc(var(--box-width) / 2);
  position: absolute;
  width: var(--box-width);
  height: var(--box-height);
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
}
.name {
  position: absolute;
  right: 2%;
  top: 10%;
  width: 20rem;
  height: 3.5rem;
  border-radius: .5rem;
  box-shadow: 2px 1px 1px 1px #343536;
  background-color: #0c0d13;
  color: white;
  text-align: center;
  font-family: 'Great vibes', cursive;
  font-size: 3rem;
  letter-spacing: .15rem;
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
}
.pen--holder-circle {
  background-color: black;
  border-radius: 100%;
  width: 6%;
  height: 100%;
  margin-right: -1.2rem;
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
  top: 50%;
  width: calc(var(--box-width) / 59);
  height: 5px;
  border-top: .5rem solid transparent;
  border-bottom: .5rem solid transparent;
  border-right: 3rem solid white;
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
  border-bottom: calc(var(--box-width) / 70) solid black;
  border-right: calc(var(--box-width) / 5) solid transparent;
  z-index: 2;
}
.pen--body::before {
  top: 100%;
  border-bottom: 40px solid transparent;
}

// .pen--body::before {
//   // --box-width
//   content: '';
//   position: absolute;
//   width: 0;
//   height: .5rem;
//   left: -3rem;
//   border-top: calc(var(--box-width) / 59) solid black;
//   border-bottom: calc(var(--box-width) / 59) solid black;
//   border-right: calc(var(--box-width) / 5) solid transparent;
//   // border-top: .9rem solid black;
//   // border-bottom: .9rem solid black;
//   // border-right: 10rem solid transparent;
// }
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
}
.switch--sticker {
  position: relative;
  height: 50%;
  width: 40%;
  background-color: white;
  border-width: 1.5rem .3rem;
  border-style: solid;
}
.switch--sticker::before {
  content: 'OFF';
  position: absolute;
  color: white;
  top: 0;
  left: 50%;
  transform: translateY(calc(-150%)) translateX(calc(-50%));
  font-size: 10px;
}
.switch--sticker::after {
  content: 'ON';
  position: absolute;
  color: white;
  bottom: 0;
  left: 50%;
  transform: translateY(calc(150%)) translateX(calc(-50%));
  font-size: 10px;
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
  height: 10%;
  text-orientation: upright;
}
.button--name {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(calc(100% + .4rem)) translateY(-1rem);
}
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
}
.pad-corner:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  border-bottom: solid 1px white;
  width: 3.7rem;
  height: 1.8rem;
  transform: rotate(-45deg) translateY(calc(5%)) translateX(-54%);
  background-color: white;
  z-index: 2;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
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
  // transform: rotate(45deg) translateY(calc(200%)) translateX(-60%);
  transform: rotate(45deg) translateX(17%) translateY(-60%);
  background-color: white;
  z-index: 2;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  -moz-box-shadow: 0px 20px 24px -10px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 20px 24px -10px rgba(0,0,0,0.75);
  box-shadow: 0px 20px 24px -10px rgba(0,0,0,0.75);
}
.pad-down-keys {
  display: flex;
  width: 100;
  height: 100%;
  flex-direction: row;
}
.key{
  border-right: solid 1px black;
  height: 100%;
  width: 20%;
  position: relative;
}
.key-bottom--name {
  position: absolute;
  left: 25%;
  width: 50%;
  bottom: calc(-11%);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: .05rem;
}
.pad-up-keys {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  position: absolute;
  top: 0;
  padding: 0 4.16%;
}
.key-up {
  position: relative;
  border-right: solid 1px black;
  border-left: solid 1px black;
  height: 45%;
  width: 8.2%;
  background-color: #bfb9bf;
  -moz-box-shadow: inset 0 10px 10px -10px #000000;
  -webkit-box-shadow: inset 0 10px 10px -10px #000000;
  box-shadow: inset 0 10px 10px -10px #000000;
}
.key-up--name {
  position: absolute;
  left: 25%;
  width: 50%;
  top: calc(-25%);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: .05rem;
}
.key-up--footer {
  position: absolute;
  left: calc(50% + .5px);
  bottom: 0;
  border-bottom: solid 1px black;
  width: calc(66% + 3px);
  height: .5rem;
  transform: translateX(calc(-50%)) translateY(calc(100% - 1px));
  background-color: #bfb9bf;
}
.key-up--footer::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  border-left: solid 1px black;
  width: .5rem;
  height: .6rem;
  transform: rotate(-45deg) translateY(calc(-50%)) translateX(-25%);
  background-color: #bfb9bf;
}
.key-up--footer::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  border-right: solid 1px black;
  width: .5rem;
  height: .6rem;
  transform: rotate(45deg) translateY(calc(-50%)) translateX(calc(25%));
  background-color: #bfb9bf;
}

.no-left {
  border-left: 0;
}

.space-key {
  height: 50%;
  width: 0%;
  margin-left: 4%;
  margin-right: 4%;
}
</style>
