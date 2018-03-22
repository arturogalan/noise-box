<template>
  <div id="app">
    
    <app-header></app-header>
    
    <div class="node-list">
      <node-card
        v-for="node in nodesList"
        :key="node.name"
        :node="node"
        @delete="removeNode(node)"
      ></node-card>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppHeader from './components/AppHeader.vue'
import NodeCard from './components/NodeCard.vue'

export default {
  name: 'app',
  data () {
    return {};
  },
  computed: {
    ...mapGetters([
      'nodesList',
    ]),
  },
  methods: {
    ...mapActions([
      'resetNodes',
      'removeNode',
    ]),
  },
  components: {
    AppHeader,
    NodeCard
  },
  created() {
    this.resetNodes();
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
  margin-top: 60px;
}
</style>
