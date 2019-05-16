<script>
import {mapActions} from 'vuex';
import knobGrid from './knob-grid.vue';

export default {
  name: 'Pedal',
  components: {
    knobGrid,
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
    };
  },
  computed: {
    helper() {
      return this.pedal.switchedOn ? 'Switch off pedal' : 'Switch on pedal';
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions('pedal', [
      'togglePedal',
    ]),
    deleteClick() {
      if (!this.pedal.dying) {
        this.$emit('delete');
      }
    },
    switchPedal() {
      this.togglePedal(this.pedal.type);
    },
  },
};
</script>
<template>
  <div
    :class="[pedal.dying && 'fade-out']"
    class="pedal-card">
    <div class="pedal-led--strip">
      <div
        v-tooltip="{text: $t('TOOLTIP.PEDAL.CLOSE')}"
        class="pedal-led pedal-led--close"
        @click="deleteClick">
        <i class="ico-close ico-led"/>
      </div>
      <!-- v-tooltip="{text: $t('TOOLTIP.PEDAL.MINIMIZE')}" -->
      <div
        class="pedal-led pedal-led--minimize pedal-led--minimize--disabled"
        @click="deleteClick">
        <i class="ico-led"/>
      </div>
      <div
        v-tooltip="{text: $t('TOOLTIP.PEDAL.MAXIMIZE')}"
        class="pedal-led pedal-led--maximize"
        @click="$emit('maximize')">
        <i class="ico-maximize ico-led"/>
      </div>
    </div>
    <div class="pedal-wrapper">

      <knob-grid :settings-list="pedal.settingsList"/>
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
        :style="{ backgroundColor: pedal.bgcolor }"
        class="pedal-svg"
        src="../../assets/img/pedal.svg"
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
.pedal-led {
  border-radius: 100%;
  width: 10px;
  height: 10px;
  display: flex;
  &--on{
    background-color: red;
  }
  &--off{
    background-color: darkred;
  }
  &--close{
    cursor: pointer;
    margin-right: .3rem;
    background-color: red;
  }
  &--minimize{
    cursor: pointer;
    margin-right: .3rem;
    background-color: yellow;
    &--disabled{
      cursor: default;
      background-color: #787575;
    }
  }
  &--maximize{
    cursor: pointer;
    background-color: lawngreen;
    &--disabled{
      cursor: default;
      background-color: #787575;
    }
  }
  &--strip {
    padding: 0 .3rem .3rem;
    display:flex;
    flex-direction: row;
    width: -moz-min-content;    /* Firefox */
    width: -webkit-min-content; /* Chrome */
  }
}
.pedal-led--strip:hover {
  .ico-led {
    display: block;
  }
}
.ico-led {
  width: 10px;
  line-height: 10px;
  font-size: 8px;
  margin-left: .5px;
  display: none;
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
  height: 270px;
  width: 180px;
  left: 0;
  top: 0;
  z-index: $z-index-pedal;
  border-radius: 9px;
  border: solid 2px black;
  box-shadow: 4px 6px 6px 4px black
}
</style>
