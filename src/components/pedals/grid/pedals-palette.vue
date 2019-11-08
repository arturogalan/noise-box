<script>
import { mapActions } from 'vuex';

export default {
  name: 'pedals-palette',
  props: { palettePedal: { type: Object, required: true } },
  data() {
    return {};
  },
  methods: {
    getAsset: function(assetName) {
      return require('../../../' + assetName);
    },
    ...mapActions('pedal', [
      'addPedal',
    ]),
  },
};
</script>
<template>
  <div
    class="palette-card"
    @click="addPedal(palettePedal)"
  >
    <div class="overlay">
      {{ palettePedal.name }}
    </div>
    <img
      :src="getAsset(palettePedal.icon)"
      class="icon-type"
    >
  </div>
</template>
<style lang="scss" scoped>
.palette-card {
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: 10px;
    cursor: pointer;
    /* background:dimgray; */
}

.palette-card.removing {
    background-color: red;
}

.palette-card .delete {
    position: absolute;
    top: 0px;
    right: 5px;
    cursor: pointer;
}

.palette-card .attack-buttons {
    display: flex;
    justify-content: space-between;
}
.icon-type{
    max-width: 5rem;
    display:block;
    margin:auto;
}
.overlay {
  /* background:rgba(193, 150, 150, 0.5); */
  border-radius: 10px;
  font-family: "FatsansContur";
  color: #aaffaa;
  text-transform: capitalize;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.palette-card.removing {
    background-color: lightcoral;
   color: #3b3f44
}
</style>
