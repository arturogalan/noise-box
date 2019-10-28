<script>
import {mapActions} from 'vuex';
import pedalKnobGrid from './pedal-knob-grid.vue';
import macButtons from '../../common/mac-buttons.vue';

export default {
  name: 'pedal',
  components: {
    pedalKnobGrid,
    macButtons,
  },
  props: {
    pedal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      myVal: 50,
      ledStatus: {
        close: false,
        minimize: false,
        maximize: false,
      },
      strokeColor: '',
    };
  },
  computed: {
    helper() {
      return this.pedal.switchedOn ? 'Switch off pedal' : 'Switch on pedal';
    },
    strokeBorder() {
      return this.strokeColor ? `2px solid ${this.strokeColor}` : '';
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions('pedal', [
      'togglePedal',
      'connectAll',
    ]),
    deleteClick() {
      if (!this.pedal.dying) {
        this.$emit('delete');
      }
    },
    switchPedal() {
      this.togglePedal(this.pedal.type);
    },
    setStroke(isHover) {
      this.strokeColor = isHover ? '#3f7f00' : '';
    },
  },
};
</script>
<template>
  <div
    :class="[pedal.dying && 'fade-out']"
    class="pedal-card"
    @mouseover="setStroke(true)"
    @mouseleave="setStroke(false)">
    <mac-buttons
      :button-literals="{
        close: 'TOOLTIP.PEDAL.REMOVE',
        maximize: 'TOOLTIP.PEDAL.MAXIMIZE',
      }"
      @close="deleteClick"
      @maximize="$emit('maximize')"/>
    <div class="pedal-wrapper">
      <div
        :style="{
          height: pedal.settingsList.length < 3 ? '45%': '51%',
          marginTop: pedal.settingsList.length === 1 ? '3px': '0'
        }"
        class="knob-grid-wrapper">
        <div class="knob-grid-container">
          <pedal-knob-grid :pedal="pedal"/>
        </div>
      </div>
      <div class="pedal-name-wrapper">
        <div class="check-wrapper">
          <div class="check">Check
          </div>
          <div
            :class="[pedal.switchedOn ? 'pedal-led--on' : 'pedal-led--off']"
            class="pedal-led"/>
        </div>
        <div
          :style="{ color: pedal.fcolor }"
          class="pedal-name">{{ pedal.name }}</div>
      </div>
      <div
        v-tooltip="{text: $t(`TOOLTIP.PEDAL.SWITCH_${pedal.switchedOn ? 'OFF' : 'ON'}`)}"
        ref="push-wrapper"
        class="push-wrapper"
        @click="switchPedal()"/>
      <img
        :style="{ backgroundColor: pedal.bgcolor, border: strokeBorder}"
        class="pedal-svg"
        src="../../../assets/img/pedal.svg"
        alt
      >
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pedal-card {
  position: relative;
  padding: 5px 5px 0px 5px;
  /* border: solid 1px rgb(122, 44, 44); */
}

.pedal-card.removing {
  background-color: red;
}
.pedal-led {
  border-radius: 100%;
  width: 10px;
  height: 10px;
  display: flex;
  &--on{
    background-color: rgb(255, 0, 0);
    // border: solid 2px rgba(26, 21, 20, 0.527);
    box-shadow: inset -1px 0px 2px 1px rgba(26, 21, 20, 0.527);
    // box-shadow: inset 0px -2px 20px 0px #111010
  }
  &--off{
    box-shadow: inset -1px 0px 2px 1px rgba(26, 21, 20, 0.527);
    background-color: darkred;
  }
}
.delete {
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  font-family: "FontPbio";
  font-size: 2rem;
  transform: translateY(-25%);
}
.pedal-wrapper {
  position: relative;
}
.pedal-card .attack-buttons {
  display: flex;
  justify-content: space-between;
}
.knob-grid-wrapper {
  position: absolute;
  width: 100%;
  // height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.knob-grid-container {
  position: relative;
  width: 86%;
  height: 40%;
}
.pedal-name-wrapper {
  position: absolute;
  height: 45.5%;
  width: 50%;
  top: 0;
  right: 0;
}
.check-wrapper {
  position: absolute;
  top: 10%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.check {
  text-transform: uppercase;
  font-size: .5rem;
  color: aliceblue;
}
.push-wrapper {
  position: absolute;
  bottom: 0;
  width: 80%;
  left: 10%;
  height: 40%;
  cursor: pointer;
}


.pedal-name {
  font-family: "Conthrax";
  font-size: 1.2rem;;
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
  text-transform: capitalize;
}


.pedal-svg {
  height: 16rem;
  width: 11rem;
  left: 0;
  top: 0;
  z-index: $z-index-3;
  border-radius: 9px;
  border: solid 2px black;
  box-shadow: 4px 6px 6px 4px black
}
</style>
