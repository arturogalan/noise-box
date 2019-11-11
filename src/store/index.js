import Vue from "vue";
import Vuex from "vuex";
import pedalModule from "./modules/entities-pedal";
import uiModule from "./modules/entities-ui";

// import {
//   pedalModule,
// } from './modules/';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    pedal: pedalModule,
    ui: uiModule,
  },
});

export default store;
