<template>
  <div class="pedal-card" :class="{removing: pedal.dying}">
    <span class="delete" @click="deleteClick" v-if="!pedal.dying">×</span>
    <knob-grid :settingsList="pedal.settingsList"></knob-grid>
    <div class="pedal-name" :style="{ color: pedal.fcolor }">{{ pedal.name }} </div>
    <img class="pedal-svg" src="../assets/img/pedal.svg" alt="" :style="{ backgroundColor: pedal.bgcolor }">
</div>
</template>

<script>
import knobGrid from './knob-grid.vue'
export default {
  name: 'Pedal',
  props: ['pedal'],
  data() {
        return {
             myVal:50
        };
    },
    methods: {
        deleteClick() {
            this.$emit('delete');
        }
    },
    components: {
        knobGrid
    }
}
</script>

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

.pedal-card  {
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
    font-family: 'FontPbio';
}
.pedal-card .attack-buttons {
    display: flex;
    justify-content: space-between;
}

.pedal-name {
    font-family: 'FontPbio';
    font-size: small;
    position: relative;
    top: 50%;
    z-index: 100;
}
  @font-face {
    font-family: "FontPbio";
    src: url('../assets/fonts/pbio-bold.ttf') format("truetype");
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
