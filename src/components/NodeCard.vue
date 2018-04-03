<template>
  <div class="node-card" :class="{removing: node.dying}">
    <span class="delete" @click="deleteClick" v-if="!node.dying">×</span>
    <knob-grid></knob-grid>
    <div class="node-name" :style="{ color: node.fcolor }">{{ node.name }} </div>
    <img class="pedal-svg" src="../assets/img/pedal.svg" alt="" :style="{ backgroundColor: node.bgcolor }">
</div>
</template>

<script>
import KnobGrid from './KnobGrid.vue'
export default {
  name: 'NodeCard',
  props: ['node'],
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
        KnobGrid
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.node-card {
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 5px;
    padding: 15px 15px 10px 15px;
    border: solid 1px rgb(122, 44, 44);
}

.node-card.removing {
    background-color: red;
}

.node-card  {
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
.node-card .attack-buttons {
    display: flex;
    justify-content: space-between;
}

.node-name {
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
