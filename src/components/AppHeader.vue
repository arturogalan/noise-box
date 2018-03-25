<template>
    <div id="grad1">
    <div  title="F*king awesome noise box!!!">
        <img src="/static/header-icon.png" class="logo-icon">
        <h1>NOISE BOX</h1>
    </div>
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
#grad1 {
    height: 140px;
    background: #4c11ac; /* For browsers that do not support gradients */
    background: linear-gradient(to right, rgb(90, 72, 196) , rgb(62, 62, 132)); /* Standard syntax (must be last) */
    margin: 0px;
}
h1{
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    font-size: 7em;
    margin: 0px;
}
.logo-icon {
    width: 130px;
    float: left;
    margin-top: 4px;
}
</style>
