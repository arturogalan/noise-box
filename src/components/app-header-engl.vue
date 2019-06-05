<script>
import metalGrid from './common/metal-grid.vue';
import engl from './amp/engl/engl.vue';

export default {
  components: {
    metalGrid,
    engl,
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
        v-for="i in 200"
        :key="i"/>
    </div>
    <div
      v-tooltip="{text: 'F*king awesome noise box!!!'}"
      class="title"
    >
      <img
        src="/static/header-icon.png"
        class="logo-icon">
      <div/>

      <h1 class="h1-shadow"><span>NOISE BOX</span></h1>
      <h1><span class="metal">NOISE BOX</span></h1>
    </div>
    <engl/>
  </div>
</template>

<style lang="scss">

$logo-height: 130;

.grid-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.title{
  border: 1rem solid rgb(21,18,17);
  box-shadow: inset 0px 1px 10px 0px rgb(0, 0, 0);
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
  font-size: 7em;
  margin: 0px;
  font-family: "FontPbio";
  white-space: nowrap;
  cursor: default;
}
.h1-shadow {
  position: absolute;
  left: calc(50% + #{$logo-height / 2 + px});
  transform: translateX(-50%);
  font-size: 7em;
  margin: 0px;
  font-family: "FontPbio";
  white-space: nowrap;
    text-shadow: 2px 0 0 white;
    z-index: -1;
}
.metal {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f4f4f4+1,595959+12,d8d8d8+25,474747+37,2c2c2c+44,e2e2e2+56,111111+60,898989+76,1c1c1c+91,131313+100 */
background: rgb(244,244,244); /* Old browsers */
background: -moz-linear-gradient(-45deg, rgba(244,244,244,1) 1%, rgba(89,89,89,1) 12%, rgba(216,216,216,1) 25%, rgba(71,71,71,1) 37%,
rgba(44,44,44,1) 44%, rgba(226,226,226,1) 56%, rgba(17,17,17,1) 60%, rgba(137,137,137,1) 76%, rgba(28,28,28,1) 91%, rgba(19,19,19,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(-45deg, rgba(244,244,244,1) 1%,rgba(89,89,89,1) 12%,rgba(216,216,216,1) 25%,rgba(71,71,71,1) 37%,
rgba(44,44,44,1) 44%,rgba(226,226,226,1) 56%,rgba(17,17,17,1) 60%,rgba(137,137,137,1) 76%,rgba(28,28,28,1) 91%,rgba(19,19,19,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(135deg, rgba(244,244,244,1) 1%,rgba(89,89,89,1) 12%,rgba(216,216,216,1) 25%,rgba(71,71,71,1) 37%,
rgba(44,44,44,1) 44%,rgba(226,226,226,1) 56%,rgba(17,17,17,1) 60%,rgba(137,137,137,1) 76%,rgba(28,28,28,1) 91%,rgba(19,19,19,1) 100%);
/* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f4f4f4', endColorstr='#131313',GradientType=1 );
/* IE6-9 fallback on horizontal gradient */-webkit-background-clip: text;
  color:transparent;
}
.logo-icon {
  width: $logo-height + px;
  float: left;
  margin-top: 4px;
}


</style>
