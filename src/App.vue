<template>
  <div id="app">
    
    <app-header></app-header>

    
    <div class="row">
      <div class="node-palette">    
        <div class="palette-title">Add effects!</div>
        <div class="grid-container" style="background-color:#aaa;">
          <palette-card
              v-for="node in paletteNodesList"
              :key="node.name"
              :node="node"
              :title="'Add '+node.name+'!!'"
            >
          </palette-card>
        </div>
      </div>
      <div class="noise-board column">
        <div class="row">
          <div class="column left" style="background-color:#bbb;"></div>
          <div class="column middle" style="background-color:#ccc;">
            <div class="row">
            <node-card
              v-for="node in nodesList"
              :key="node.name"
              :node="node"
              @delete="removeNode(node)"
              class='column'
            >
            </node-card>
            </div>
          </div>
          <div class="column right" style="background-color:#ddd;">
            <master-control>
              
            </master-control>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppHeader from './components/AppHeader.vue'
import PaletteCard from './components/PaletteCard.vue'
import NodeCard from './components/NodeCard.vue'
import MasterControl from './components/MasterControl.vue'

export default {
  name: 'app',
  data () {
    return {};
  },
  computed: {
    ...mapGetters([
      'paletteNodesList',
      'nodesList'
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
    PaletteCard,
    NodeCard,
    MasterControl
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
  /* display: flex; */
  /* flex-wrap: wrap; */
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


.left {
  width: 2%;
}
.middle {
  width: 80%;
}
.right {
  width: 18%;
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
.overlay {
  bottom: 0; 
  background: rgb(0, 0, 0);
  background:rgba(193, 150, 150, 0.5); /* Black see-through */
  color: #f1f1f1; 
  transition: .5s ease;
  color: white;
  text-align: center;
  border-radius: 10px;
}
.palette-title {
  background-color: bisque;
  font-style: oblique;
  font-weight: 900;
}
</style>
