<template>
  <div class="node-card" :class="{removing: node.dying}">
    <span class="delete" @click="deleteClick" v-if="!node.dying">×</span>
    <div class="node-name">{{ node.name }}</div>
    <!-- <img :src="getAsset(node.icon)" class="icon-type"> -->
    <img class="pedal-svg" src="../assets/img/pedal.svg" alt="">
</div>
</template>

<script>

export default {
  name: 'NodeCard',
  props: ['node'],
  data() {
        return {};
    },
    methods: {
        deleteClick() {
            this.$emit('delete');
        },
        getAsset: function(assetName) {
	        return require("../"+assetName);
        },
    },
    components: {
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
    height: 270px;
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
    position: absolute;
    left: 10%;
    top: 40%;
    z-index: 50;
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
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
     background-color: blue;
     border-radius: 5px;
}
</style>
