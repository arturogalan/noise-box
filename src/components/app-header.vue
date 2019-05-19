<script>
import metalGrid from './common/metal-grid.vue';
export default {
  components: {
    metalGrid,
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },

};
</script>

<template>
  <div>
    <div class="grid-wrapper">
      <metal-grid
        v-for="i in 225"
        :key="i"/>
    </div>
    <div
      v-tooltip="{text: 'F*king awesome noise box!!!'}"
      class="index-2">
      <img
        src="/static/header-icon.png"
        class="logo-icon">
      <div/>
      <h1>NOISE BOX</h1>
    </div>
  </div>
</template>

<style>
.grid-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.grad1 {
  height: 140px;
  background: #4c11ac; /* For browsers that do not support gradients */
  background: linear-gradient(
    to right,
    rgb(90, 72, 196),
    rgb(62, 62, 132)
  ); /* Standard syntax (must be last) */
  margin: 0px;
}
/* .header-grid {
  height: 140px;
  background-size: 15px 15px;
  background-color: black;
  background-image: linear-gradient(to right,rgb(42,39,38) 3px, transparent 1px), linear-gradient(to bottom,rgb(42,39,38) 3px, transparent 1px);
} */
h1 {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 7em;
  margin: 0px;
  font-family: "FontPbio";
  white-space: nowrap;
  cursor: default;
}
.logo-icon {
  width: 130px;
  float: left;
  margin-top: 4px;
}
</style>
