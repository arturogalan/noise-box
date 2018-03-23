<template>
<div class="node-icon" :class="className">
    <!-- input -->
    <template v-if="type === NODE_TYPE.INPUT">
        <div>
            Tipo: {{type}} Subtipo: {{subtype.label}}
            <img :src="getAsset(subtype.icon)">
        </div>

    </template>

    <template v-else-if="type === NODE_TYPE.FILTER">
        <div>
            Nodo de tipo efecto
        </div>
    </template>

     <template v-else-if="type === NODE_TYPE.OUTPUT">
        <div>
            Nodo de tipo output
        </div>
    </template>

	<template v-else>
		<div>Nodo not defined</div>
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

</style>