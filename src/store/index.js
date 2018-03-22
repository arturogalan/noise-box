import Vue from 'vue';
import Vuex from 'vuex';

import { NODE_TYPE, NODE_SUBTYPE } from './constants';

Vue.use(Vuex);

const verbs = {
    CLEAR_NODES: 'CLEAR_NODES',
    ADD_NODE: 'ADD_NODE',
    ATTACK_NODE: 'ATTACK_NODE',
    KILL_NODE: 'KILL_NODE',
    REMOVE_NODE: 'REMOVE_NODE',
}

const state = {
    nodes: {},
};

const getters = {
    nodesList(state) {
        return Object.values(state.nodes);
    }
}


const actions = {
    addNode({state, commit}, {type, subtype, name}) {
        if (name && !state.nodes[name]) { // add only if not exists
            commit(verbs.ADD_NODE, {
                type,
                subtype,
                name,
                ...NODE_SUBTYPE[type],
                dying: false,
            });
        }
    },
    resetNodes({commit, dispatch}) {
        commit(verbs.CLEAR_NODES);
        [
            {type: NODE_TYPE.INPUT, subtype: NODE_SUBTYPE[NODE_TYPE.INPUT].MEDIA_STREAM, name: 'entrada'},
            {type: NODE_TYPE.FILTER, subtype: NODE_SUBTYPE[NODE_TYPE.FILTER].DELAY_NODE, name: 'efecto'},
            {type: NODE_TYPE.OUTPUT, subtype: NODE_SUBTYPE[NODE_TYPE.OUTPUT].AUDIO_DESTINATION_NODE, name: 'salida'}
        ].forEach(node => {
            dispatch('addNode', node);
        });
    },
};

const mutations = {
    [verbs.CLEAR_NODES] (state) {
        state.pokemons = {};
    },
    [verbs.ADD_NODE] (state, node) {
        // state.pokemons[pokemon.name] = pokemon;
        Vue.set(state.nodes, node.name, node);
    }
}


const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;