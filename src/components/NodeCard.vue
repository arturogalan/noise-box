<template>
  <div class="node-card" :class="{removing: node.dying}">
    <span class="delete" @click="deleteClick" v-if="!node.dying">×</span>
    <node-icon :type="node.type" :subtype="node.subtype" :dying="node.dying"></node-icon>
    <div>name: {{ node.name }}</div>
    <div class="attack-buttons">
        <button> -- </button>
        <button> -> </button>
    </div>
</div>
</template>

<script>
import NodeIcon from './NodeIcon.vue';


export default {
  name: 'NodeCard',
  props: ['node'],
  data() {
        return {};
    },
    methods: {
        deleteClick() {
            this.$emit('delete');
        }
    },
    components: {
        NodeIcon,
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
