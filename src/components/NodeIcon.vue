<template>
<div class="node-icon" :class="className">
    <!-- input -->
    <template>
        <div>
            Tipo: {{type}} Subtipo: {{subtype.label}}
            <img :src="getAsset(subtype.icon)" class="icon-type">
        </div>
    </template>
</div>
</template>

<script>

import { NODE_TYPE } from '@/store/constants';

export default {
	props: ['type', 'subtype', 'dying'],
    data() {
        return {
			NODE_TYPE,
		};
	},
	computed: {
		className() {
			return this.type === NODE_TYPE.INPUT ? 'input-node'
				: this.type === NODE_TYPE.FILTER ? 'filter-node'
				: this.type === NODE_TYPE.OUTPUT ? 'output-node'
				: '';
        }
    },
    methods: {
        getAsset: function(assetName) {
	        return require("../"+assetName);
        }
    }
}
</script>

<style>

body {
	background-color: #f5f5f5;
}
.icon-type {
    width: 45px;
}

.node-icon{
	/* width: 715px;
	height: 500px;
	margin: 0 auto; */
	position: relative;
	font-size: 11px;
	height: 100px;
    width: 100px;
}


</style>