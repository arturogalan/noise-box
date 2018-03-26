<template>
  <div class="node-card" :class="{removing: node.dying}">
    <span class="delete" @click="deleteClick" v-if="!node.dying">×</span>
    <div>name: {{ node.name }}</div>
    <img :src="getAsset(node.icon)" class="icon-type">
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
    border: solid 1px #ccc;
}

.node-card.removing {
    background-color: red;
}

.node-card .delete {
    position: absolute;
    top: 0px;
    right: 5px;
    cursor: pointer;
}

.node-card .attack-buttons {
    display: flex;
    justify-content: space-between;
}
</style>
