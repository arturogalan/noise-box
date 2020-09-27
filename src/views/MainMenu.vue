<script>

export default {
  name: 'MainMenu',
  components: {
  },
  mixins: [],
  data () {
    return {
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
  },
  methods: {

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
          Web audio experiments to have fun! Made with Vue.js, Javascript, some SVGs and love
          <a
            href="https://twitter.com/turugalan"
            target="_blank"
          >
            Arturo
          </a>
        </p>
      </div>
    </div>
    <router-link :to="{name: 'guitarAmp'}">
      <div class="diagonal-box bg-two">
        <div class="project-img project-img--right guitar-amp" />
        <span class="project-text project-text--left">
          GUITAR AMPLIFICATOR
          <p>Play with a simulated amp with distorsions, effects and much more! 🎸</p>
        </span>
        <h2>&nbsp;</h2>
      </div>
    </router-link>
    <router-link :to="{name: 'stylophone'}">
      <div class="diagonal-box bg-three">
        <div class="project-img project-img--left stylophone" />
        <span class="project-text project-text--right">
          STYLOPHONE
          <p>Play with this simulation of the 60's synthesizer!</p>
        </span>
        <h2>&nbsp;</h2>
      </div>
    </router-link>
    <div class="footer" />
    <p class="footer-text">
      More crazy audio projects coming soon 😱!
    </p>
  </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&display=swap');
// a:-webkit-any-link {
//   text-decoration: none;
// }
.router-link-active {
  text-decoration: none !important;
}
.title-container {
  text-align: center;
  display: flex;
  align-items: top;
}
.title-name {
  font-size: 9vw;
  font-family: 'Fredoka One', cursive;
  text-align: center;
  white-space: nowrap;
  color: white;
  top: 0;
}
.title-desc {
  position: absolute;
  right: 1vw;
  top: 2vh;
  width: 30vw;
  height: 7vw;
  background: #4B7F52;
  border-radius: 8vh;
  padding: 2.5vh;
  text-align: center;
  display: flex;
  transform: skewy(-3deg);
  border: 0.35vw #FFC857 dashed;

  p {
    padding: 2.2vh;
    font-family: 'Fontdiner Swanky', cursive;
    font-size: 1.1vw;
    border-radius: 5vh;
    box-shadow:
        0 0 0 2px hsl(129, 65%, 15%),
        0 0 0 5px hsl(129, 66%, 31%),
        0 0 0 10px hsl(129, 79%, 54%),
        0 0 0 15px hsl(85, 93%, 73%);

}
  a {
    font-size: 1.3vw;
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
  width: 12vw;
  z-index: 2;
}

.footer {
  background: black;
  height: 50%;
  width: 100%;
  // margin-top: calc(var(--skew-padding) * -1);
  position: absolute;
  z-index: 0;
  bottom: -10vw;
}
.footer-text {
  z-index: 2;
  position: absolute;
  left: 2vw;
  bottom: -6%;
  // bottom: 2vw; // calc(var(--skew-padding) / 5 * -1);
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
  --width: 100vw;
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
}
.project-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 40vw 40vh;
  transform: skewy(var(--angle));
  padding: 0 0;
  width: 40%;
  height: 100%;
  &--right {
    right: 1vw;
    top: calc(var(--skew-padding) / 2.5);
  }
  &--left {
    // left: 1vw;
    top: calc(var(--skew-padding) / 2.5 * -1);
  }
}
.guitar-amp {
  background-image: url('../assets/img/noiseBoxAmp.png');
  position: absolute;
}
.stylophone {
  background-image: url('../assets/img/stylophone.png');
  position: absolute;
}
.project-text {
  width: 50%;
  position: absolute;
  font-size: 4vw;
  font-family: 'Fredoka One', cursive;
  color: white;
  text-align: center;
  &--right{
    right: 5%;
  transform: translateY(-30%);
    }
  &--left{
    left: 5%;
  transform: translateY(-70%);
  }
  p {
    font-size: 2vw;
  }
}
}

.bg-one:before {
  background-image: linear-gradient(45deg, #654ea3, #eaafc8);
  color: white;
}
.bg-two:before {
  background-image: linear-gradient(-135deg, #ff0084, #33001b);
}

.bg-three:before {
  background-image: linear-gradient(-135deg, #007, #003);
}
html {
  font-size: 100%;
  transition: font-size 0.2s linear;
}

</style>
