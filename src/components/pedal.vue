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
    };
  },
  mounted() {
    // this.configurePedal(this.pedal.type);
  },
  methods: {
    ...mapActions([
      'configurePedal',
    ]),
    deleteClick() {
      this.$emit('delete');
    },
  },

};
</script>
<template>
  <div
    :class="{removing: pedal.dying}"
    class="pedal-card">
    <span
      v-if="!pedal.dying"
      class="delete"
      @click="deleteClick">×</span>
    <knob-grid :settings-list="pedal.settingsList"/>
    <div class="pedal-name-wrapper">
      <div
        :style="{ color: pedal.fcolor }"
        class="pedal-name">{{ pedal.name }}</div>
    </div>
    <img
      :style="{ backgroundColor: pedal.bgcolor }"
      class="pedal-svg"
      src="../assets/img/pedal.svg"
      alt
    >
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.pedal-card {
  position: relative;
  padding: 0px 15px;
  border: solid 1px rgb(122, 44, 44);
}

.pedal-card.removing {
  background-color: red;
}

.delete {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  font-family: "FontPbio";
}
.pedal-card .attack-buttons {
  display: flex;
  justify-content: space-between;
}
.pedal-name-wrapper {
  position: absolute;
  height: 46.5%;
  width: 50%;
  top: 0;
  right: 0;
}
.pedal-name {
  font-family: "FontPbio";
  font-size: small;
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
}
@font-face {
  font-family: "FontPbio";
  src: url("../assets/fonts/pbio-bold.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

.pedal-svg {
  height: 270px;
  width: 180px;
  left: 0;
  top: 0;
  z-index: 50;
  border-radius: 9px;
  border: solid 2px black;
  box-shadow: 4px 6px 6px 4px black
}
</style>
