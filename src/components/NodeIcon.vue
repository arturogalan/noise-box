<template>
<div class="node-icon" :class="className">
    <!-- input -->
    <template v-if="type === NODE_TYPE.INPUT">
        <div>
            Nodo de tipo entrada
            Subtipo {{subtype.label}}
            {{subtype.icon}}
            <img src="../assets/logo.png">
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
// pokemons from https://codepen.io/steftastan/pen/XbMVGw all credits to Stef Tastan https://codepen.io/steftastan/

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
		},
	},
}
</script>

<style>

body {
	background-color: #f5f5f5;
}

</style>