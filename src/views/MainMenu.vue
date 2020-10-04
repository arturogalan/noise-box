<script>
export default {
  name: 'MainMenu',
  components: {
  },
  data () {
    return {
      focus: {
        name: false,
        amp: false,
        stylo: false,
      },
    }
  },
  methods: {
    toggleFocus (name) {
      this.focus[name] = !this.focus[name]
    },
  },
}
</script>
<template>
  <div class="main">
    <div class="title-container">
      <img
        :src="require('../assets/img/header-icon-on.gif')"
        class="logo-icon"
      >
      <div class="title-name">
        NOISE BOX
      </div>
      <div class="title-desc">
        <p>
          Web audio experiments to have fun! Made with Vue.js, Javascript, SVGs, ☕️ and 🧡
          <a
            href="https://twitter.com/turugalan"
            target="_blank"
          >
            <div
              :class="focus['name'] ? 'bounce-animated-big' : 'bounce-deanimated'"
              @mouseenter="toggleFocus('name')"
              @mouseleave="toggleFocus('name')"
            >
              Arturo
            </div>
          </a>
        </p>
      </div>
    </div>
    <router-link
      :to="{name: 'guitarAmp'}"
    >
      <div
        class="diagonal-box bg-two"
        :class="focus['amp'] ? 'bounce-animated' : 'bounce-deanimated'"
        @mouseenter="toggleFocus('amp')"
        @mouseleave="toggleFocus('amp')"
      >
        <img
          :src="require('../assets/img/noiseBoxAmp.png')"
          class="project-img project-img--amp"
        >
        <span class="project-text project-text--left">
          GUITAR AMPLIFICATOR
          <p>Play with a simulated amp with distorsions, effects and much more! 🎸</p>
        </span>
      </div>
    </router-link>
    <router-link :to="{name: 'stylophone'}">
      <div
        class="diagonal-box bg-three"
        :class="focus['stylo'] ? 'bounce-animated' : 'bounce-deanimated'"
        @mouseenter="toggleFocus('stylo')"
        @mouseleave="toggleFocus('stylo')"
      >
        <img
          :src="require('../assets/img/stylophone.png')"
          class="project-img project-img--stylophone"
        >
        <span class="project-text project-text--right">
          STYLOPHONE
          <p>Play with this simulation of the 60's synthesizer! 👽</p>
        </span>
      </div>
    </router-link>
    <div class="main-footer" />
    <p class="main-footer-text">
      More crazy audio projects coming soon 😱!
    </p>
  </div>
</template>
<style lang="scss">
.bounce-animated {
  transform: scale(1.1);
  transition: transform .4s;
  transition-timing-function: ease-in;
}
.bounce-deanimated {
  transform: scale(1);
  transition: transform .4s;
  transition-timing-function: ease-out;
}
.bounce-animated-big {
  transform: scale(1.5);
  transition: transform .4s;
  transition-timing-function: ease-in;
}

@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&display=swap');
.title-container {
  text-align: center;
  display: flex;
  align-items: top;
}
.title-name {
  font-size: calc(4vw + 4vh);
  font-family: 'Fredoka One', cursive;
  text-align: center;
  white-space: nowrap;
  color: white;
  top: 0;
  z-index: 2;
}

.title-desc {
  position: absolute;
  right: 1vw;
  top: 2vh;
  width: 27vw;
  height: 6vw;
  background: #4B7F52;
  border-radius: 8vh;
  padding: 2.5vh;
  text-align: center;
  display: flex;
  transform: skewy(-3deg);
  border: 0.35vw #FFC857 dashed;
  p {
    padding: .5vw;
    font-family: 'Fontdiner Swanky', cursive;
    font-size: 1.1vw;
    border-radius: 5vh;
    box-shadow:
        0 0 0 .2rem hsl(129, 65%, 15%),
        0 0 0 .5rem hsl(129, 66%, 31%),
        0 0 0 .10rem hsl(129, 79%, 54%),
        0 0 0 .8rem hsl(85, 93%, 73%);
}
  a {
    font-size: 1.3vw;
    text-decoration: none;

    /* Unvisited link  */
    &:visited {
      color: rgb(189, 233, 185);
      text-decoration: none;
      border-bottom: none;
    }
    /* Visited link    */
    &:hover {
      color: rgb(189, 233, 185);
    }
    /* Mouse over link */
    &:active {
      color: rgb(189, 233, 185);
    }
    &-external{
      &:after {
        content: '';
      }
    }
  }
}

.main {
  background: #003;
}
.logo-icon {
  width: 10vw;
  height: 12vw;
  z-index: 2;
}

.main-footer {
  background: black;
  height: calc(35vh + 35vw);
  width: 100%;
  position: fixed;
  z-index: 0;
  top: calc(40vh + 20vw);
  bottom: 0;
}

.main-footer-text {
  z-index: 2;
  position: absolute;
  left: 2vw;
  color: white;
  font-size: 2vw;
  font-family: 'Fredoka One', cursive;
}
:root {

  /*Magic Number Alert:

  the 0.09719 is calculated by this formula:
  tan(11°) / 2
  11° is the current skewY value.
  ------------------*/
  --width: 180vh;
  --full-width: 100vw;
  // --magic-number: 0.09719;
  --magic-number: 0.09;
  --skew-padding: calc(var(--width) * var(--magic-number));
  --clip-padding: calc(var(--full-width) * var(--magic-number));
  --angle: 7deg;

.diagonal-box {
  position: relative;
  padding: calc(var(--skew-padding)) 0;
  margin-top: -1px;
  z-index: 1;
  //  display: flex;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform: skewy(var(--angle));
    transform-origin: 50% 0;
    outline: 1px solid transparent;
    backface-visibility: hidden;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform: skewy(var(--angle));
    transform-origin: 50% 0;
    outline: 1px solid transparent;
    backface-visibility: hidden;
    background-image: linear-gradient(-135deg, #ff0084, #33001b);
    z-index: -1;
  }
}

.bg-three:before {
  background-image: linear-gradient(-135deg, #007, #003);
}

.project-img {
    position: absolute;
    opacity: .9;
  &--amp {
    max-width: 70vw;
    height: 100%;
    max-height: 40vw;
    right: 5%;
    top: calc(3vw + 1vh);
    transform: skewy(var(--angle));
    overflow: hidden;
  }
  &--stylophone {
    max-width: 80vw;
    height: 80%;
    left: 20%;
    right: 5%;
    top: 1vw;
    transform: skewy(var(--angle));
  }
}

.project-text {
  max-width: 100%;
  position: absolute;
  font-size: calc(2.5vw + 2.5vh);
  font-family: 'Fredoka One', cursive;
  color: white;
  text-align: center;
  white-space: nowrap;
  &--right{
    right: 10%;
    transform: translateY(-30%);
    }
  &--left{
    left: 5%;
    transform: translateY(-80%);
  }
  p {
    white-space: pre-wrap;
    font-size: 1.3rem;
  }
}
}
</style>
