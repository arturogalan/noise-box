<script>
import {mapGetters, mapActions} from 'vuex';
import pedalsPalette from '../../pedals/grid/pedals-palette.vue';
import pedal from '../../pedals/pedal/pedal.vue';

export default {
  name: 'pedals-board',
  components: {
    pedalsPalette,
    pedal,
  },
  computed: {
    ...mapGetters('pedal', [
      'palettePedalsList',
      'pedalList',
    ]),
  },
  created() {
    this.initPedals();
  },
  methods: {
    ...mapActions('pedal', [
      'initPedals',
      'removePedal',
      'setPedalProperty',
    ]),
    zoomPedal(pedal) {
      this.setPedalProperty({name: pedal.name, property: 'zoomIn', value: true});
    },
  },
};
</script>

<template>
  <article>
    <div class="pedal-palette"/>
    <div class="pedal-board">

      <div class="noise-board column">
        <div>
          <div
            class="column left"/>
          <div
            class="column middle ">
            <div>
              <pedal
                v-for="pedal in pedalList"
                :key="pedal.name"
                :pedal="pedal"
                class="column"
                @delete="removePedal(pedal)"
                @maximize="zoomPedal(pedal)"
              />
            </div>
          </div>
          <div
            class="column right"/>
        </div>
      </div>
    </div>
  </article>
</template>
<style lang="scss" scoped>
.pedal-palette {
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 15%;
  height: 100%;
  float: left;
  background-color:#aaa;
}
.pedal-board {
   height: 100%;
  background-color:#ccc;
}

.noise-board{
  width: 80%;
  background-color: rgb(70,70,70);
}
/* Create three unequal columns that floats next to each other */
.column {
    float: left;
    height: 100%;
}
.left {
  width: 2%;
  background-color:#bbb;
}
.middle {
  width: 95%;
}
.right {
  width: 5%;
  background-color:#ddd;
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
  grid-gap: 5px;


  padding-top: .3rem;
}
.palette-title {
  background-color: bisque;
  font-style: oblique;
  font-weight: 900;
}
</style>

