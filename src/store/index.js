import Vue from 'vue';
import Vuex from 'vuex';
import pedalModule from './modules/entities-pedal'
// import {
//   pedalModule,
// } from './modules/';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    pedalModule: pedalModule,
  }
});

export default store;