<template>
    <div class="header">

        <div class="add-node">
        <h3>Add node</h3>
        <select v-model="newNode.type">
            <option v-for="option in newNode.typeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
            </option>
        </select>
        <input v-model="newNode.name" placeholder="name">
        <p><button @click="addNode(newNode)">Add</button></p>
        </div>

        <button class="reset-button" @click="resetNodes">RESET</button>

    </div>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { NODE_TYPE } from '@/store/constants';

export default {
    data() {
        return {
            newNode: {
                type: NODE_TYPE.FILTERS,
                        typeOptions: [
                            {value: NODE_TYPE.INPUT, label: 'Input'},
                            {value: NODE_TYPE.FILTERS, label: 'Effects'},
                            {value: NODE_TYPE.OUTPUT, label: 'Output'},
                        ],
                        name: '',
                    },
                };
        },
    methods: {
        ...mapActions([
                'addNode',
                'resetNodes'
            ]),
        },
    } 
</script>

<style>
.header {
  display: flex;
  margin-bottom: 10px;
}

.header .add-node {
  margin-right: 100px;
  border-right: solid 1px #ccc;
}

.header .reset-button {
  height: 50px;
  width: 50px;
  align-self: center;
  margin-left: 20px;
  cursor: pointer;
}
</style>
