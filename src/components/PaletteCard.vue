<template>
  <div class="palette-card" :class="{removing: node.dying}" @click="addNode(node)">
    <div class="overlay">{{ node.name }}</div>
    <img :src="getAsset(node.icon)" class="icon-type">
</div>
</template>

<script>
import {mapActions} from 'vuex'

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
        ...mapActions([
            'addNode',
        ]),
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.palette-card {
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 5px;
    padding: 5px 5px 5px 5px;
    border: solid 1px #ccc;
    border-radius: 10px;
    cursor: pointer;
    background:dimgray;
}

.palette-card.removing {
    background-color: red;
}

.palette-card .delete {
    position: absolute;
    top: 0px;
    right: 5px;
    cursor: pointer;
}

.palette-card .attack-buttons {
    display: flex;
    justify-content: space-between;
}
.icon-type{
    max-width: 50px;
       display:block;
    margin:auto;
}
.overlay {
  bottom: 0; 
  background: rgb(0, 0, 0);
  background:rgba(193, 150, 150, 0.5); /* Black see-through */
  color: #f1f1f1; 
  transition: .5s ease;
  color: white;
  text-align: center;
  border-radius: 10px;
}
.palette-card.removing {
    background-color: lightcoral;
}
</style>
