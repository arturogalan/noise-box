<script>
import { mapActions } from 'vuex'
import macButtons from './mac-buttons.vue'

export default {
  name: 'FirstTimeModal',
  components: {
    macButtons,
  },
  computed: {
    },
  mounted () {
    this.setSiteVisited();
  },
  methods: {
    ...mapActions('ui', [
      'toggleModal',
      'setSiteVisited',
    ]),
    closeModal () {
      this.toggleModal({ modalName: 'firstTimeModal', status: false })
    },
  },
}
</script>
<template>
  <div
    @click.stop
    :style="{ borderColor: 'brown' }"
    class="info-container"
  >
    <div
      :style="{ color: 'black', backgroundColor: 'darkred'}"
      class="info-name"
    >
      <mac-buttons
        :button-literals="{
          close: 'TOOLTIP.PEDAL.CLOSE',
        }"
        :maximized="true"
        class="buttons-absolute"
        @close="closeModal"
        @maximize="$emit('maximize')"
      />
      <div class="info-name--title">
        <img
        class="icon-type-1"
        src="../../assets/img/header-icon-animated.gif"
        >
      Noise Box
      </div>
    </div>
    <div class="info-wrapper">
      <div
        class="contact-section"
      >
          <p
            class="contact"
          >
            Javascript Guitar Amp emulator&nbsp;&nbsp;</p>
      </div>
      <div class="info-text">
        Hi and welcome to NoiseBox, a 🎸guitar🎸 amp emulator to enjoy playing your guitar and getting real amp sounds!!!
        <br/>
        <br/>
        <p class="warning-text">
          ⚠️ Warning! ⚠️
        </p>
        <br>
        This page uses <strong>WebAudio interface</strong> to produce sounds.
        <br>
          The input and output will be that ones that you have configured in your computer (can be the microphone, speakers or any other sound target) so...
        <ul>
          <li class="pt">
          Take care with the <span class="white-text"><u>volume if you are using headphones!</u></span>
           </li>
          <li class="pt">
          Take care with the <span class="white-text"><u>sound coupling</u></span> if you use the same source for the input and the output!
 </li>
        </ul>
      </div>
      <div class="contact-section--center">
        <section class="contact-section">
          <img
            class="icon-clickable icon-type-2"
            src="../../assets/icons/github.png"
            alt=""
            href=""
          >
          <div class="info-text no-padding">
            <a
              class="personal-links-color"

              href="https://github.com/arturogalan"
              target="_blank"
            >github.com/arturogalan</a>
          </div>
        </section>
        <section class="contact-section">
          <img
            class="icon-clickable icon-type-3"
            src="../../assets/icons/twitter.png"
            alt=""
          >
          <div class="info-text no-padding">
            <a
              class="personal-links-color"
              href="https://twitter.com/turugalan"
              target="_blank"
            >twitter.com/turugalan</a>
          </div>
        </section>
      </div>
      
      <div class="license-text">
        <strong class="license-text--title">MIT license</strong><br>
        Copyright © 2019 Arturo Galán <br>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”),
        to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
        and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br>
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>
        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        IN THE SOFTWARE.<br>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .info-container {
    position: relative;
    width: 70%;
    height: 90%;
    left: 15%;
    background-color: $knob-grid-background;
    border: .5rem solid;
    border-radius: 2%;
  }
  .info-wrapper {
    position: relative;
    z-index: $z-index-2;
    width: 100%;
    height: 90%;
    overflow-y: auto;
  }
/* width */
::-webkit-scrollbar {
  width: .5rem;;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: darkred;
  margin-right: .5rem;
  border-radius: 10px;
  border: dashed 2px black;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: indianred;
  margin-right: .5rem;

}
  .info-name {
    font-family: "Conthrax";
    font-size: 2.2rem;;
    top: 100%;
    text-transform: capitalize;
    opacity: .8;
    margin-bottom: .4rem;
    &--title{
      justify-content: center;
      display: flex;
    }
  }
  .buttons-absolute{
    position: absolute;
    top: .2rem;
  }
.contact-section {
  margin-top: .2rem;
  margin-bottom: .8rem;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: .7rem;
  &--center {
    justify-content: center;
    display: grid;
    grid-template-columns: 35% 35%;
    grid-gap: 10%;

  }
}
.contact-text {
  vertical-align: bottom;
  text-align: center;
  align-items: center;
}
.icon-clickable {
  cursor: pointer;
}
.icon-type-1{
  width: 2.5rem;
  height: 3rem;
  padding-right: .5rem;
  margin-top: .1rem;
}
.icon-type-2{
  max-width: 5rem;
  margin-right: .5rem;
}
.icon-type-3{
  max-width: 4rem;
}
.develop {
  font-family: "pixel";
  color: darkgrey;
  font-size: 1.5rem;
}
.info-text{
  max-width: 100%;
  font-family: "pixel";
  color: darkgrey;
  font-size: 1.2rem;
  text-align: justify;
  padding: 0.3rem 2rem;
  line-height: 1.4rem;
  &--center {
    text-align: center;
  }
}
.white-text {
  color: white;
}
.license-text {
  font-family: "pixel";
  line-height: .9rem;

  // position: absolute;
  // bottom: 0;
  padding: 0.3rem 2rem;
  color: lightblue;
  font-size: .7rem;
  text-align: left;
  // transform: translateY(-80%);
  &--title {
  font-size: .7rem;
  }
}
.developers-color {
  color: white;
  text-decoration: none;
}
.warning-text {
  color: rgb(244, 237, 60);
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
}
.personal-links-color {
  color: rgb(71,183,132);
  font-weight: bold;
}
.vue-color {
  color: rgb(71,183,132);
  text-decoration: none;
}
.netlify-color {
  color: white;
  text-decoration: none;
}
.font-link-color {
  color: lightslategray;
}
.pt {
  padding-top: .5rem;
}
.no-padding {
  padding: 0;
}
.contact {
  font-family: "pixel";
  text-decoration: none;
  color: lightseagreen;
  font-size: 1.8rem;
}
</style>
