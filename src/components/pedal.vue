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
    <div
      :style="{ color: pedal.fcolor }"
      class="pedal-name">{{ pedal.name }}</div>
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
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 5px;
  padding: 15px 15px 10px 15px;
  border: solid 1px rgb(122, 44, 44);
}

.pedal-card.removing {
  background-color: red;
}

.pedal-card {
  position: relative;
  top: 0px;
  right: 5px;
  height: 274px;
  width: 180px;
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

.pedal-name {
  font-family: "FontPbio";
  font-size: small;
  position: relative;
  top: 50%;
  z-index: 100;
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
  border-radius: 5px;
}
</style>
