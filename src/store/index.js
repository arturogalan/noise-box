import Vue from 'vue';
import Vuex from 'vuex';

import { NODE_TYPE, NODE_PROPERTIES } from './constants';

Vue.use(Vuex);

const verbs = {
    CLEAR_NODES: 'CLEAR_NODES',
    ADD_PALETTE_NODE: 'ADD_PALETTE_NODE',
    ADD_NODE: 'ADD_NODE',
    ATTACK_NODE: 'ATTACK_NODE',
    KILL_NODE: 'KILL_NODE',
    REMOVE_NODE: 'REMOVE_NODE',
}

const state = {
    paletteNodes: {},
    nodes: {}
};

const getters = {
    paletteNodesList(state) {
        return Object.values(state.paletteNodes);
    }
}


const actions = {
    addPaletteNode({state, commit}, {type, name}) {
        if (name && !state.nodes[name]) { // add only if not exists
            commit(verbs.ADD_PALETTE_NODE, {
                type,
                name,
                ...NODE_PROPERTIES[type],
            });
        }
    },
    addNode({state, commit}, {type, name}) {
        if (name && !state.nodes[name]) { // add only if not exists
            commit(verbs.ADD_NODE, {
                type,
                name,
                ...NODE_PROPERTIES[type],
                dying: false,
            });
        }
    },
    resetNodes({commit, dispatch}) {
        commit(verbs.CLEAR_NODES);
        [
            {type: NODE_TYPE.VOLUME, name: 'volumen'},
            {type: NODE_TYPE.DISTORSION, name: 'distorsion'},
            {type: NODE_TYPE.DELAY, name: 'delay'},
            {type: NODE_TYPE.FLANGER, name: 'flanger'}
        ].forEach(node => {
            dispatch('addNode', node);
        });
    },
    resetPaletteNodes({commit, dispatch}) {
        commit(verbs.CLEAR_NODES);
        [
            {type: NODE_TYPE.VOLUME, name: 'volumen'},
            {type: NODE_TYPE.DISTORSION, name: 'distorsion'},
            {type: NODE_TYPE.DELAY, name: 'delay'},
            {type: NODE_TYPE.FLANGER, name: 'flanger'}
        ].forEach(node => {
            dispatch('addPaletteNode', node);
        });
    }
};

const mutations = {
    [verbs.CLEAR_NODES] (state) {
        state.pokemons = {};
    },
    [verbs.ADD_NODE] (state, node) {
        // state.pokemons[pokemon.name] = pokemon;
        Vue.set(state.nodes, node.name, node);
    },
    [verbs.ADD_PALETTE_NODE] (state, node) {
        // state.pokemons[pokemon.name] = pokemon;
        Vue.set(state.paletteNodes, node.name, node);
    }
}


const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;