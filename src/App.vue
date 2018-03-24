<template>
  <div id="app">
    
    <app-header></app-header>

    
    <div class="row">
      <div class="grid-container node-palette" style="background-color:#aaa;">
         <palette-card
        v-for="node in paletteNodesList"
        :key="node.name"
        :node="node"
        @delete="removeNode(node)"
      ></palette-card>
      </div>
      <div class="noise-board column">
        <div class="row">
          <div class="column left" style="background-color:#bbb;"></div>
          <div class="column middle" style="background-color:#ccc;"></div>
          <div class="column right" style="background-color:#ddd;"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppHeader from './components/AppHeader.vue'
import PaletteCard from './components/PaletteCard.vue'

export default {
  name: 'app',
  data () {
    return {};
  },
  computed: {
    ...mapGetters([
      'paletteNodesList',
    ]),
  },
  methods: {
    ...mapActions([
      'resetPaletteNodes',
      'removeNode',
    ]),
  },
  components: {
    AppHeader,
    PaletteCard
  },
  created() {
    this.resetPaletteNodes();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.node-palette {
  display: flex;
  flex-wrap: wrap;
  width: 20%;
  float: left;
}
.noise-board{
  width: 80%;
}
/* Create three unequal columns that floats next to each other */
.column {
    float: left;
    height: 600px; /* Should be removed. Only for demonstration */
}


.left, .right {
  width: 15%;
}
.middle {
  width: 70%;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    /* display: grid; */
    clear: both;
    /* grid-template-columns: auto auto; */
}
.grid-container {
  display: grid;
  justify-content: start;
  grid-template-columns: 45% 45%;/*Make the grid smaller than the container*/
  grid-gap: 10px;
  background-color: #2196F3;
}
</style>
