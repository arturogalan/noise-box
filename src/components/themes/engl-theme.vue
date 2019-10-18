<script>
import appHeaderEngl from './../headers/header-engl.vue';
import ampEngl from './../amps/amp-engl.vue';
import rackEngl from './../racks/rack-engl.vue';

export default {
  name: 'engl-theme',
  components: {
    appHeaderEngl,
    ampEngl,
    rackEngl,
  },
};
</script>
<template>
  <section>
    <app-header-engl/>
    <amp-engl/>
    <rack-engl/>
  </section>
</template>
