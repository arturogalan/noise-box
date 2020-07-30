<script>
import metalGrid from './../common/metal-grid.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    metalGrid,
  },
  data() {
    return {
      isVisible: true,
      isHover: false,
    };
  },
  computed: {
    ...mapGetters('pedal', [
      'amp',
    ]),
    showOnIcon() {
      return !this.isHover && this.amp.switchedOn && this.amp.standBy;
    },
    showStandByIcon() {
      return !this.isHover && !this.amp.standBy && this.amp.switchedOn;
    },
    showOffIcon() {
      return !this.isHover && !this.amp.switchedOn;
    },
    showHoverIcon() {
      return this.isHover;
    },
  },
  created() {
  },
  methods: {
    ...mapActions('ui', [
      'toggleModal',
    ]),
    setHover(status) {
      console.log('eee');
    },
    openInfo() {
      this.toggleModal({ modalName: 'infoModal', status: true });
    },
  },

};
</script>

<template>
  <div>
    <div class="header-background n-index-7" />
    <div class="valves-behind valve-left n-index-5">
      <div
        v-for="index in 2"
        :key="index"
      >
        <transition
          name="fade-valve"
        >
          <div :key="amp.switchedOn">
            <img
              v-if="amp.switchedOn"
              :src="require('../../assets/img/valve-on.svg')"
              class="valves"
            >
            <img
              v-else
              :src="require('../../assets/img/valve-off.svg')"
              class="valves"
            >
          </div>
        </transition>
      </div>
    </div>
    <div class="valves-behind valve-right n-index-5">
      <div
        v-for="index in 2"
        :key="index"
      >
        <transition
          name="fade-valve"
        >
          <div :key="amp.switchedOn">
            <img
              v-if="amp.switchedOn"
              :src="require('../../assets/img/valve-on.svg')"
              class="valves"
            >
            <img
              v-else
              :src="require('../../assets/img/valve-off.svg')"
              class="valves"
            >
          </div>
        </transition>
      </div>
    </div>
    <div class="grid-wrapper n-index-1">
      <metal-grid
        v-for="i in 240"
        :key="i"
      />
    </div>
    <div
      class="title"

    >
      <section
        @click="openInfo"
        v-tooltip="{text: 'F*king awesome noise box!!!'}"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      >
        <img
          v-if="showHoverIcon"
          :src="require('../../assets/img/header-icon-animated.gif')"
          class="logo-icon"
        >
        <img
          v-if="showOnIcon"
          :src="require('../../assets/img/header-icon-animated.gif')"
          class="logo-icon"
          @mouseover="setHover(true)"
          @mouseleave="isHover = false"
        >
        <img
          v-if="showStandByIcon"
          :src="require('../../assets/img/header-icon-on.gif')"
          class="logo-icon"
          @mouseover="setHover(true)"
          @mouseleave="isHover = false"
        >
        <img
          v-if="showOffIcon"
          :src="require('../../assets/img/header-icon-off.gif')"
          class="logo-icon"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
        >
      </section>
      <h1>
        <span
          class="metal"
        >NOISE BOX</span>
      </h1>
    </div>
    <div
      class="contact-section"
      @click="openInfo"
    >
      <img
        class="footer-label icon-type-1"
        src="../../assets/icons/marioquestion.png"
        alt=""
      >
      <div class="contact-text">
        <span class="develop">Developed by:</span>
        <span
          class="contact"
        >
          Arturo Galán&nbsp;&nbsp;</span>
      </div>
      <!-- <img
        class="footer-label icon-type-1"
        src="../../assets/icons/github.png"
        alt="">
      <img
        class="footer-label icon-type-2"
        src="../../assets/icons/twitter.png"
        alt=""> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>

$logo-height: 130;

.grid-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: $app-min-width;
}
.header-background {
  background-color: black;
  position: absolute;
  width: 100%;
  height: 10rem;
  min-width: $app-min-width;
}
.valves-behind {
  position: absolute;
  display: flex;
  justify-content: space-between;
}
.valve-left {
  left: #{$logo-height + px}
}
.valve-right {
right: 2rem;
}
.valves {
height: 13rem;
}
.title{
  border: 1rem solid rgb(21,18,17);
  box-shadow: inset 0px 1px 10px 0px rgb(0, 0, 0);
  min-width: $app-min-width - 20px;
}
.grad1 {
  height: 140px;
  background: #4c11ac; /* For browsers that do not support gradients */
  background: linear-gradient(
    to right,
    rgb(90, 72, 196),
    rgb(62, 62, 132)
  ); /* Standard syntax (must be last) */
  margin: 0px;
}
/* .header-grid {
  height: 140px;
  background-size: 15px 15px;
  background-color: black;
  background-image: linear-gradient(to right,rgb(42,39,38) 3px, transparent 1px), linear-gradient(to bottom,rgb(42,39,38) 3px, transparent 1px);
} */
h1 {
  font-size: 7em;
  margin: 0px;
  font-family: "FontPbio";
  white-space: nowrap;
  cursor: default;
  min-width: 70%;
}

.metal {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f4f4f4+1,595959+12,d8d8d8+25,474747+37,2c2c2c+44,e2e2e2+56,111111+60,898989+76,1c1c1c+91,131313+100 */
  background: rgb(244,244,244); /* Old browsers */
  background: -moz-linear-gradient(-45deg, rgba(244,244,244,1) 1%, rgba(89,89,89,1) 12%, rgba(216,216,216,1) 25%, rgba(71,71,71,1) 37%,
  rgba(44,44,44,1) 44%, rgba(226,226,226,1) 56%, rgba(17,17,17,1) 60%, rgba(137,137,137,1) 76%, rgba(28,28,28,1) 91%, rgba(19,19,19,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg, rgba(244,244,244,1) 1%,rgba(89,89,89,1) 12%,rgba(216,216,216,1) 25%,rgba(71,71,71,1) 37%,
  rgba(44,44,44,1) 44%,rgba(226,226,226,1) 56%,rgba(17,17,17,1) 60%,rgba(137,137,137,1) 76%,rgba(28,28,28,1) 91%,rgba(19,19,19,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg, rgba(244,244,244,1) 1%,rgba(89,89,89,1) 12%,rgba(216,216,216,1) 25%,rgba(71,71,71,1) 37%,
  rgba(44,44,44,1) 44%,rgba(226,226,226,1) 56%,rgba(17,17,17,1) 60%,rgba(137,137,137,1) 76%,rgba(28,28,28,1) 91%,rgba(19,19,19,1) 100%);
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f4f4f4', endColorstr='#131313',GradientType=1 );
  /* IE6-9 fallback on horizontal gradient */-webkit-background-clip: text;
  color:transparent;
  -webkit-filter: drop-shadow(2px 1px lightgrey);
  filter: drop-shadow(2px 1px lightgrey);
}

.logo-icon {
  width: $logo-height + px;
  float: left;
  margin-top: 4px;
  position: absolute;
  left: 0;
  cursor: pointer;
}

.contact-section {
  float: right;
  // margin-top: 4px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transform: translateY(-15%);
}
.contact-text {
  vertical-align: bottom;
}
.icon-type-1{
  max-width: .8rem;
  margin-right: .5rem;
  // margin-bottom: .2rem;
}
.icon-type-2{
  max-width: 1.3rem;
}
.develop {
  font-family: "pixel";
  color: darkgrey;
  font-size: .8rem;
}
.contact {
  font-family: "pixel";
  text-decoration: none;
  color: lightseagreen;
  font-size: .9rem;
}
</style>
