import Vue from 'vue';
import Vuex from 'vuex';

import { NODE_TYPE, NODE_PROPERTIES } from './constants';

Vue.use(Vuex);

const verbs = {
    CLEAR_NODES: 'CLEAR_NODES',
    CLEAR_PALETTE_NODES: 'CLEAR_PALETTE_NODES',
    ADD_PALETTE_NODE: 'ADD_PALETTE_NODE',
    ADD_NODE: 'ADD_NODE',
    ATTACK_NODE: 'ATTACK_NODE',
    KILL_NODE: 'KILL_NODE',
    REMOVE_NODE: 'REMOVE_NODE',
}

const state = {
    //best practice to store lists as objects because you can access faster than with arrays
    paletteNodes: {},
    nodes: {}
};

const getters = {
    paletteNodesList(state) {
        return Object.values(state.paletteNodes)
    },
    nodesList(state){
        return Object.values(state.nodes)
    }
}

//Actions can be asynchronous
// You can make here ONLY the business-logic
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
    },
    removeNode({state, commit}, node) {
        if (node.dying) return;
        commit(verbs.KILL_NODE, node.name);
        setTimeout(() => {
            if (state.nodes[node.name] === node) { // check if the node is the same
                commit(verbs.REMOVE_NODE, node.name);
            }
        }, 1000);
    },
};

// Synchronous and the only point where we can change the state
// You can make here ONLY the data-logic (language or formatting data....)
//VUe doesn't detect the addition of properties, that's the reason we must do 'Vue.set'
const mutations = {
    [verbs.CLEAR_NODES] (state) {
        state.nodes = {};
    },
    [verbs.CLEAR_PALETTE_NODES] (state) {
        state.paletteNodes = {};
    },
    [verbs.ADD_NODE] (state, node) {
        // state.pokemons[pokemon.name] = pokemon;
        Vue.set(state.nodes, node.name, node);
    },
    [verbs.ADD_PALETTE_NODE] (state, node) {
        // state.pokemons[pokemon.name] = pokemon;
        Vue.set(state.paletteNodes, node.name, node);
    },
    [verbs.KILL_NODE] (state, name) {
        state.nodes[name].dying = true;
    },
    [verbs.REMOVE_NODE] (state, name) {
        Vue.delete(state.nodes, name);
    },
}


const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;