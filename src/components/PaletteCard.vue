<template>
  <div class="palette-card" :class="{removing: node.dying}">
    <div>{{ node.name }}
        <img :src="getAsset(node.type.icon)" class="icon-type">
    </div>
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
        }
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
    max-width: 75px;
}
</style>
